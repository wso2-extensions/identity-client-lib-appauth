/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {AuthorizationRequest, AuthorizationNotifier, AuthorizationServiceConfiguration, log,
  RedirectRequestHandler, GRANT_TYPE_AUTHORIZATION_CODE, TokenRequest, 
  FLOW_TYPE_PKCE, AuthorizationRequestHandler,
  LocalStorageBackend, StorageBackend, cryptoGenerateRandom, App, AppAuthError} from '@openid/appauth';
import { PKCETokenRequestHandler } from '../pkce_token_requestor';

/**
 * The wrapper appication.
 */
export class AppPKCE {

  /* client configuration */

  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private scope: string;

  private notifier: AuthorizationNotifier;
  private authorizationHandler: AuthorizationRequestHandler;

  private userStore: StorageBackend;
  private pkceTokenRequestHandler: PKCETokenRequestHandler;

  private configuration: AuthorizationServiceConfiguration;

  private app: App;

  constructor(app: App, clientId: string, clientSecret: string, redirectUri: string, 
    scope: string = 'openId', tokenUrl?: string) {

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scope = scope;
    this.redirectUri = redirectUri;

    this.userStore = new LocalStorageBackend();

    this.configuration = app.getConfiguration();
    this.app = app;
    if (tokenUrl) {
      this.configuration.tokenEndpoint = tokenUrl;
    }

    this.notifier = new AuthorizationNotifier();
    this.authorizationHandler = new RedirectRequestHandler();

    this.pkceTokenRequestHandler = new PKCETokenRequestHandler(this.authorizationHandler, 
      this.configuration, this.userStore);
  }

  init(authorizationListenerCallback?: Function) {
    // set notifier to deliver responses
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    // set a listener to listen for authorization responses
    this.notifier.setAuthorizationListener((request, response, error) => {
      log('Authorization request complete ', request, response, error);
      if (response) {
        this.showMessage(`Authorization Code ${response.code}`);

        if (this.configuration.toJson().oauth_flow_type == FLOW_TYPE_PKCE && response.code) {
          let tokenRequestExtras = {
            client_secret: (this.clientSecret == null ? '' : this.clientSecret),
            state: response.state
          };
          let request = new TokenRequest(
              this.clientId,
              this.redirectUri,
              GRANT_TYPE_AUTHORIZATION_CODE,
              response.code,
              undefined,
              tokenRequestExtras);
          this.pkceTokenRequestHandler.performPKCEAuthorizationTokenRequest(
              this.configuration, request);
        }
      }
      if (authorizationListenerCallback) {
        authorizationListenerCallback(request, response, error);
      }
    });
  }

  makeAuthorizationRequest(state?: string) {

    // generater state
    if (!state) {
      state = App.generateState();
    }

    // create a request
    var request;
    if (this.configuration.toJson().oauth_flow_type == FLOW_TYPE_PKCE) {
      let authRequestExtras = {prompt: 'consent', access_type: 'online'};
      request = new AuthorizationRequest(
          this.clientId,
          this.redirectUri,
          this.scope,
          AuthorizationRequest.RESPONSE_TYPE_CODE,
          state, /* state */
          authRequestExtras);
      this.pkceTokenRequestHandler.performPKCEAuthorizationCodeRequest(this.configuration, request);
    }
  }

  checkForAuthorizationResponse(): Promise<void> {

    var isAuthRequestComplete = false;

    switch (this.configuration.toJson().oauth_flow_type) {
      case FLOW_TYPE_PKCE:
        var params = this.parseQueryString(location, false);
        isAuthRequestComplete = params.hasOwnProperty('code');
        break;
    }

    if (isAuthRequestComplete) {
      return this.authorizationHandler.completeAuthorizationRequestIfPossible();

    } else {
      return Promise.reject<void>(
        new AppAuthError("No end session completion."));
    }
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

// export AppPKCE
(window as any)['AppPKCE'] = AppPKCE;
