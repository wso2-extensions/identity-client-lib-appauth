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

export interface StringMap {
  [key: string]: string;
}

/**
 * Represents a window.location like object.
 */
export interface LocationLike {
  hash: string;
  host: string;
  origin: string;
  hostname: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  assign(url: string): void;
}

/**
 * Represents constants for Oauth/OIDC flow types supported.
 */
export const FLOW_TYPE_IMPLICIT = 'IMPLICIT';
export const FLOW_TYPE_PKCE = 'PKCE';

// exporting for browser JS apps
(window as any)['FLOW_TYPE_IMPLICIT'] = FLOW_TYPE_IMPLICIT;
(window as any)['FLOW_TYPE_PKCE'] = FLOW_TYPE_PKCE;

/**
 * Represents constants for browser storage types supported.
 */
export const LOCAL_STORAGE = 'LOCAL_STORAGE';
export const SESSION_STORAGE = 'SESSION_STORAGE';

// exporting for browser JS apps
(window as any)['LOCAL_STORAGE'] = LOCAL_STORAGE;
(window as any)['SESSION_STORAGE'] = SESSION_STORAGE;

/**
 * Represents session/localstorage key for saving the authorization response for the current
 * request.
 */
export const AUTHORIZATION_RESPONSE_HANDLE_KEY = 'appauth_current_authorization_response';
