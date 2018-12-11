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

/**
 * Represents the UserInfoResponse as a JSON Object.
 */
export interface UserInfoResponseJson {
  sub: string;
  name: string; /* http://openid.net/specs/openid-connect-core-1_0.html#UserInfo */
  given_name: string;
  family_name: string;
  preferred_username: string;
  email: string;
  picture: string;
}

/**
 * Represents the possible error codes from the userInfo endpoint.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoError
 */
export type UserInfoErrorType = 'invalid_token';

/**
 * Represents the UserInfoError as a JSON Object.
 */
export interface UserInfoErrorJson {
  error: UserInfoErrorType;
  error_description?: string;
}

/**
 * Represents the UserInfo Response type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse
 *
 * TODO: UserInfo response vlidation as of
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponseValidation
 */
export class UserInfoResponse {
  constructor(
      public sub: string,
      public name: string,
      public given_name: string,
      public family_name: string,
      public preferred_username: string,
      public email: string,
      public picture: string) {}

  toJson(): UserInfoResponseJson {
    return {
      sub: this.sub,
      name: this.name,
      given_name: this.given_name,
      family_name: this.family_name,
      preferred_username: this.preferred_username,
      email: this.email,
      picture: this.picture
    };
  }

  static fromJson(input: UserInfoResponseJson): UserInfoResponse {
    return new UserInfoResponse(
        input.sub,
        input.name,
        input.given_name,
        input.family_name,
        input.preferred_username,
        input.email,
        input.picture)
  }
}

/**
 * Represents the UserInfo Error type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoError
 */
export class UserInfoError {
  constructor(public readonly error: UserInfoErrorType, public readonly errorDescription?: string) {
  }

  toJson(): UserInfoErrorJson {
    return {
      error: this.error, error_description: this.errorDescription
    }
  }

  static fromJson(input: UserInfoErrorJson) {
    return new UserInfoError(input.error, input.error_description);
  }
}
