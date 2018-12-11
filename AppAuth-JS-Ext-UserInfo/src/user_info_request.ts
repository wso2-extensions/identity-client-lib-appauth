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

import {StringMap} from '@openid/appauth';

/**
 * Represents the User Info Request as JSON.
 */
export interface UserInfoRequestJson {
  access_token?: string;
  extras?: StringMap;
}


/**
 * Represents an User Info request.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 */
export class UserInfoRequest {
  constructor(public accessToken?: string, public extras?: StringMap) {}

  /**
   * Serializes a UserInfoRequest to a JavaScript object.
   */
  toJson(): UserInfoRequestJson {
    return {access_token: this.accessToken, extras: this.extras};
  }

  toStringMap(): StringMap {
    let map: StringMap = {};

    // copy over extras
    if (this.extras) {
      for (let extra in this.extras) {
        if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
          // check before inserting to requestMap
          map[extra] = this.extras[extra];
        }
      }
    }

    return map;
  }

  static fromJson(input: UserInfoRequestJson): UserInfoRequest {
    return new UserInfoRequest(input.access_token, input.extras);
  }

  setExtrasField(key: string, value: string) {
    if (this.extras) {
      this.extras[key] = value;
    }
  }
}