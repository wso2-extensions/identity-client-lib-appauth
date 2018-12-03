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

import {cryptoGenerateRandom} from '@openid/appauth';
import {sha256} from 'js-sha256';

/**
 * class for PKCE code challenge and code verifier generation.
 */
export class CodeVerifier {
  challenge: string;
  method: string;
  verifier: string;

  /**
   * base64 encoding
   *
   * @param value text to encode
   */
  private base64URLEncode(value: Buffer) {
    return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  /**
   * Generate SHA256 code for given value
   *
   * @param value text to generate SHA256 code
   */
  public static sha256(value: string) {
    return sha256.create().update(value).arrayBuffer();
  }

  /**
   * Get PKCE code verifier code.
   */
  private getVerifier() {
    return this.base64URLEncode(new Buffer(cryptoGenerateRandom(32), 'UTF-8'));
  }

  constructor() {
    this.verifier = this.getVerifier();

    this.challenge = this.base64URLEncode(new Buffer(CodeVerifier.sha256(this.verifier)));
    this.method = 'S256';
  }
}