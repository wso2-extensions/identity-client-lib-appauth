"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var appauth_1 = require("@openid/appauth");
var js_sha256_1 = require("js-sha256");
/**
 * class for PKCE code challenge and code verifier generation.
 */
var CodeVerifier = /** @class */ (function () {
    function CodeVerifier() {
        this.verifier = this.getVerifier();
        this.challenge = this.base64URLEncode(new Buffer(CodeVerifier.sha256(this.verifier)));
        this.method = 'S256';
    }
    /**
     * base64 encoding
     *
     * @param value text to encode
     */
    CodeVerifier.prototype.base64URLEncode = function (value) {
        return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };
    /**
     * Generate SHA256 code for given value
     *
     * @param value text to generate SHA256 code
     */
    CodeVerifier.sha256 = function (value) {
        return js_sha256_1.sha256.create().update(value).arrayBuffer();
    };
    /**
     * Get PKCE code verifier code.
     */
    CodeVerifier.prototype.getVerifier = function () {
        return this.base64URLEncode(new Buffer(appauth_1.cryptoGenerateRandom(32), 'UTF-8'));
    };
    return CodeVerifier;
}());
exports.CodeVerifier = CodeVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtjZV9jb2RlX3ZlcmlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BrY2VfY29kZV92ZXJpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7O0FBRUgsMkNBQXFEO0FBQ3JELHVDQUFpQztBQUVqQzs7R0FFRztBQUNIO0lBOEJFO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBOUJEOzs7O09BSUc7SUFDSyxzQ0FBZSxHQUF2QixVQUF3QixLQUFhO1FBQ25DLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLG1CQUFNLEdBQXBCLFVBQXFCLEtBQWE7UUFDaEMsT0FBTyxrQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxrQ0FBVyxHQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyw4QkFBb0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFRSCxtQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE4LCBXU08yIEluYy4gKGh0dHA6Ly93d3cud3NvMi5vcmcpIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogV1NPMiBJbmMuIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLFxuICogVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge2NyeXB0b0dlbmVyYXRlUmFuZG9tfSBmcm9tICdAb3BlbmlkL2FwcGF1dGgnO1xuaW1wb3J0IHtzaGEyNTZ9IGZyb20gJ2pzLXNoYTI1Nic7XG5cbi8qKlxuICogY2xhc3MgZm9yIFBLQ0UgY29kZSBjaGFsbGVuZ2UgYW5kIGNvZGUgdmVyaWZpZXIgZ2VuZXJhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvZGVWZXJpZmllciB7XG4gIGNoYWxsZW5nZTogc3RyaW5nO1xuICBtZXRob2Q6IHN0cmluZztcbiAgdmVyaWZpZXI6IHN0cmluZztcblxuICAvKipcbiAgICogYmFzZTY0IGVuY29kaW5nXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0ZXh0IHRvIGVuY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBiYXNlNjRVUkxFbmNvZGUodmFsdWU6IEJ1ZmZlcikge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJykucmVwbGFjZSgvPS9nLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgU0hBMjU2IGNvZGUgZm9yIGdpdmVuIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0ZXh0IHRvIGdlbmVyYXRlIFNIQTI1NiBjb2RlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNoYTI1Nih2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHNoYTI1Ni5jcmVhdGUoKS51cGRhdGUodmFsdWUpLmFycmF5QnVmZmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFBLQ0UgY29kZSB2ZXJpZmllciBjb2RlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRWZXJpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy5iYXNlNjRVUkxFbmNvZGUobmV3IEJ1ZmZlcihjcnlwdG9HZW5lcmF0ZVJhbmRvbSgzMiksICdVVEYtOCcpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVyaWZpZXIgPSB0aGlzLmdldFZlcmlmaWVyKCk7XG5cbiAgICB0aGlzLmNoYWxsZW5nZSA9IHRoaXMuYmFzZTY0VVJMRW5jb2RlKG5ldyBCdWZmZXIoQ29kZVZlcmlmaWVyLnNoYTI1Nih0aGlzLnZlcmlmaWVyKSkpO1xuICAgIHRoaXMubWV0aG9kID0gJ1MyNTYnO1xuICB9XG59Il19