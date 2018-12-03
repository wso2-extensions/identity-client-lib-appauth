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

import {AuthorizationServiceConfiguration, LocalStorageBackend, StorageBackend, App, FLOW_TYPE_PKCE} from '@openid/appauth';
import {UserInfoRequestHandler,
    BaseUserInfoRequestHandler} from '../user_info_request_handler';

/**
 * The wrapper appication.
 */
export class AppUserInfo {

  /* client configuration */

  private userStore: StorageBackend;
  private userInfoRequestHandler: UserInfoRequestHandler;

  private configuration: AuthorizationServiceConfiguration;

  constructor(app: App, userInfoEndpoint?: string) {

    this.userStore = new LocalStorageBackend();
    this.configuration = app.getConfiguration();
    if(userInfoEndpoint) {
      this.configuration.userInfoEndpoint = userInfoEndpoint;
    }

    this.userInfoRequestHandler = new BaseUserInfoRequestHandler(this.userStore);
  }

  makeUserInfoRequest() {
    if(this.configuration.oauthFlowType == FLOW_TYPE_PKCE) {
      return this.userInfoRequestHandler.performUserInfoRequest(this.configuration)
      .then(userInfoResponse => {
        return userInfoResponse.toJson();
      });
    } else {
      console.log("To get user info, access token must be sent. Thus PKCE flow should be used");
    }
  }
}

// export AppUserInfo
(window as any)['AppUserInfo'] = AppUserInfo;
