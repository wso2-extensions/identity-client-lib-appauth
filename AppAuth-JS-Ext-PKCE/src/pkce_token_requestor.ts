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

import {AUTHORIZATION_RESPONSE_HANDLE_KEY, AuthorizationRequest, AuthorizationRequestHandler, AuthorizationServiceConfiguration, BaseTokenRequestHandler, JQueryRequestor, LocalStorageBackend, RedirectRequestHandler, StorageBackend, TokenRequest, TokenRequestHandler} from '@openid/appauth';

import {CodeVerifier} from './pkce_code_verifier';

/**
 * Handler class for PKCE related request handling.
 */
export class PKCETokenRequestHandler {
  verifier: CodeVerifier;
  authorizationHandler: AuthorizationRequestHandler;
  tokenHandler: TokenRequestHandler;
  configuration: AuthorizationServiceConfiguration;
  storageBackend: StorageBackend;

  constructor(
      authorizationHandler: AuthorizationRequestHandler,
      configuration: AuthorizationServiceConfiguration,
      storageBackend: StorageBackend = new LocalStorageBackend()) {
    this.verifier = new CodeVerifier();
    this.authorizationHandler = new RedirectRequestHandler();
    this.tokenHandler = new BaseTokenRequestHandler(new JQueryRequestor());
    this.configuration = configuration;
    this.storageBackend = storageBackend;
  }

  /**
   * Perform PKCE authrization request
   *
   * @param configuration request configs
   * @param request auth request
   */
  performPKCEAuthorizationCodeRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationRequest) {
    request.setExtrasField('code_verifier', this.verifier.verifier);
    this.authorizationHandler.performAuthorizationRequest(configuration, request);
  }

  /**
   * Perform PKCE authrization token request
   *
   * @param configuration request configs
   * @param request token request
   */
  performPKCEAuthorizationTokenRequest(
      configuration: AuthorizationServiceConfiguration,
      request: TokenRequest) {
    this.storageBackend.getItem(AUTHORIZATION_RESPONSE_HANDLE_KEY).then(result => {
      var authResponse = JSON.parse(result!);

      request.setExtrasField('code_challenge', this.verifier.challenge);
      request.setExtrasField('code_challenge_method', this.verifier.method);

      this.tokenHandler.performTokenRequest(this.configuration, request)
          .then(tokenResponse => {
            this.storageBackend.removeItem(AUTHORIZATION_RESPONSE_HANDLE_KEY).then(() => {
              this.storageBackend.setItem(
                  AUTHORIZATION_RESPONSE_HANDLE_KEY, JSON.stringify(tokenResponse.toJson()));
            });
          })
          .catch((err) => {
            console.log('error ' + err.message);
          });
    });
  }
}
