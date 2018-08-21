/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Represents the test web app that uses the AppAuthJS library.

import {AuthorizationServiceConfiguration, FLOW_TYPE_IMPLICIT, FLOW_TYPE_PKCE, AUTHORIZATION_RESPONSE_HANDLE_KEY,
  LocalStorageBackend, StorageBackend, cryptoGenerateRandom, App, AppAuthError} from '@openid/appauth';
import { EndSessionRedirectRequestHandler } from '../end_session_redirect_based_handler';
import { EndSessionRequestHandler, EndSessionNotifier } from '../end_session_request_handler';
import { EndSessionRequest } from '../end_session_request';

/**
 * The wrapper appication.
 */
export class AppLogout {

  /* client configuration */
  private clientId: string;

  private postLogoutRedirectUri: string;

  private userStore: StorageBackend;

  private endSessionNotifier: EndSessionNotifier;
  private endSessionHandler: EndSessionRequestHandler;

  private configuration: AuthorizationServiceConfiguration;

  constructor(app: App, postLogoutRedirectUri: string, clientId: string) {

    this.clientId = clientId;

    this.userStore = new LocalStorageBackend();

    this.configuration = app.getConfiguration();
    this.postLogoutRedirectUri = postLogoutRedirectUri;
    this.configuration.endSessionEndpoint = postLogoutRedirectUri;

    this.endSessionNotifier = new EndSessionNotifier();
    // uses a redirect flow
    this.endSessionHandler = new EndSessionRedirectRequestHandler();
  }

  init(endSessionListenerCallback?: Function) {

    // set notifier to deliver responses
    this.endSessionHandler.setEndSessionNotifier(this.endSessionNotifier);
    // set a listener to listen for authorization responses
    this.endSessionNotifier.setEndSessionListener((request, response, error) => {
      console.log('End session request complete ', request, response, error);
      if(endSessionListenerCallback) {
        endSessionListenerCallback(request, response, error);
      }
    });
  }

  checkForAuthorizationResponse(): Promise<void> {

    var isAuthRequestComplete = false;

    switch (this.configuration.toJson().oauth_flow_type) {
      case FLOW_TYPE_IMPLICIT:
        var params = this.parseQueryString(location, true);
        isAuthRequestComplete = params.hasOwnProperty('id_token');
        break;
      case FLOW_TYPE_PKCE:
        var params = this.parseQueryString(location, false);
        isAuthRequestComplete = params.hasOwnProperty('code');
        break;
      default:
        var params = this.parseQueryString(location, true);
        isAuthRequestComplete = params.hasOwnProperty('id_token');
    }

    var logoutCompletionPromise: Promise<void>;
    if (!isAuthRequestComplete) {
      logoutCompletionPromise = this.endSessionHandler.completeEndSessionRequestIfPossible();

    } else {
      logoutCompletionPromise = Promise.reject<void>(
        new AppAuthError("Not end session completion."));
    }
    return logoutCompletionPromise;
  }

  makeLogoutRequest(state?: string) {
    // generater state
    if(!state) {
      state = AppLogout.generateState();
    }

    this.userStore.getItem(AUTHORIZATION_RESPONSE_HANDLE_KEY).then(result => {
      if (result != null) {
        this.idTokenHandler(result, state);
      } else {
        console.log('Authorization response is not found in local or session storage');
      }
    });
  }

  idTokenHandler(result: string, state?: string): void {
    var authResponse = JSON.parse(result);
    var idTokenHint = authResponse.id_token;

    let request = new EndSessionRequest(
        idTokenHint, this.postLogoutRedirectUri, state /* state */, {client_id: this.clientId});

    // make the authorization request
    this.endSessionHandler.performEndSessionRequest(this.configuration, request);
  }

  showMessage(message: string) {
    console.log(message);
  }

  static generateState() {
    var stateLen = 8;
    return cryptoGenerateRandom(stateLen);
  }

  parseQueryString(location: Location, splitByHash: boolean): Object {
    var urlParams;
    if (splitByHash) {
      urlParams = location.hash;
    } else {
      urlParams = location.search;
    }

    let result: {[key: string]: string} = {};
    // if anything starts with ?, # or & remove it
    urlParams = urlParams.trim().replace(/^(\?|#|&)/, '');
    let params = urlParams.split('&');
    for (let i = 0; i < params.length; i += 1) {
      let param = params[i];  // looks something like a=b
      let parts = param.split('=');
      if (parts.length >= 2) {
        let key = decodeURIComponent(parts.shift()!);
        let value = parts.length > 0 ? parts.join('=') : null;
        if (value) {
          result[key] = decodeURIComponent(value);
        }
      }
    }
    return result;
  }
}

// export AppLogout
(window as any)['AppLogout'] = AppLogout;
