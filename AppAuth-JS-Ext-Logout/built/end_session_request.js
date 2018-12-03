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
/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
var BYTES_LENGTH = 10; // 10 bytes
var newState = function (generateRandom) {
    return generateRandom(BYTES_LENGTH);
};
/**
 * Represents the EndSessionRequest.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionRequest = /** @class */ (function () {
    /**
     * Constructs a new EndSessionRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    function EndSessionRequest(idTokenHint, postLogoutRedirectUri, state, extras, generateRandom) {
        if (generateRandom === void 0) { generateRandom = appauth_1.cryptoGenerateRandom; }
        this.idTokenHint = idTokenHint;
        this.postLogoutRedirectUri = postLogoutRedirectUri;
        this.extras = extras;
        this.state = state || newState(generateRandom);
    }
    /**
     * Serializes the EndSessionRequest to a JavaScript Object.
     */
    EndSessionRequest.prototype.toJson = function () {
        return {
            id_token_hint: this.idTokenHint,
            post_logout_redirect_uri: this.postLogoutRedirectUri,
            state: this.state,
            extras: this.extras
        };
    };
    /**
     * Creates a new instance of EndSessionRequest.
     */
    EndSessionRequest.fromJson = function (input) {
        return new EndSessionRequest(input.id_token_hint, input.post_logout_redirect_uri, input.state, input.extras);
    };
    return EndSessionRequest;
}());
exports.EndSessionRequest = EndSessionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRzs7QUFFSCwyQ0FBaUY7QUFpQmpGOztHQUVHO0FBQ0gsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUUsV0FBVztBQUNyQyxJQUFNLFFBQVEsR0FBRyxVQUFTLGNBQStCO0lBQ3ZELE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJQUVFOzs7O09BSUc7SUFDSCwyQkFDVyxXQUFtQixFQUNuQixxQkFBNkIsRUFDcEMsS0FBYyxFQUNQLE1BQWtCLEVBQ3pCLGNBQXFDO1FBQXJDLCtCQUFBLEVBQUEsaUJBQWlCLDhCQUFvQjtRQUo5QixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQVE7UUFFN0IsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDL0Isd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtZQUNwRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQkFBUSxHQUFmLFVBQWdCLEtBQTRCO1FBQzFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FDeEIsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE4LCBXU08yIEluYy4gKGh0dHA6Ly93d3cud3NvMi5vcmcpIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogV1NPMiBJbmMuIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLFxuICogVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge2NyeXB0b0dlbmVyYXRlUmFuZG9tLCBSYW5kb21HZW5lcmF0b3IsIFN0cmluZ01hcH0gZnJvbSAnQG9wZW5pZC9hcHBhdXRoJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEVuZFNlc3Npb25SZXF1ZXN0IGFzIEpTT04uXG4gKi9cblxuLy8gTk9URTpcbi8vIEJvdGggcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZSBhcmUgYWN0dWFsbHkgb3B0aW9uYWwuXG4vLyBIb3dldmVyIEFwcEF1dGggaXMgbW9yZSBvcGlvbmlvbmF0ZWQsIGFuZCByZXF1aXJlcyB5b3UgdG8gdXNlIGJvdGguXG5cbmV4cG9ydCBpbnRlcmZhY2UgRW5kU2Vzc2lvblJlcXVlc3RKc29uIHtcbiAgaWRfdG9rZW5faGludDogc3RyaW5nO1xuICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmk6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSBuZXcgc3RhdGUuIFVzZWZ1bCBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICovXG5jb25zdCBCWVRFU19MRU5HVEggPSAxMDsgIC8vIDEwIGJ5dGVzXG5jb25zdCBuZXdTdGF0ZSA9IGZ1bmN0aW9uKGdlbmVyYXRlUmFuZG9tOiBSYW5kb21HZW5lcmF0b3IpOiBzdHJpbmcge1xuICByZXR1cm4gZ2VuZXJhdGVSYW5kb20oQllURVNfTEVOR1RIKTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRW5kU2Vzc2lvblJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XG4gKiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1zZXNzaW9uLTFfMC5odG1sXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uUmVxdWVzdCB7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEVuZFNlc3Npb25SZXF1ZXN0LlxuICAgKiBVc2UgYSBgdW5kZWZpbmVkYCB2YWx1ZSBmb3IgdGhlIGBzdGF0ZWAgcGFyYW1ldGVyLCB0byBnZW5lcmF0ZSBhIHJhbmRvbVxuICAgKiBzdGF0ZSBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWRUb2tlbkhpbnQ6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBwb3N0TG9nb3V0UmVkaXJlY3RVcmk6IHN0cmluZyxcbiAgICAgIHN0YXRlPzogc3RyaW5nLFxuICAgICAgcHVibGljIGV4dHJhcz86IFN0cmluZ01hcCxcbiAgICAgIGdlbmVyYXRlUmFuZG9tID0gY3J5cHRvR2VuZXJhdGVSYW5kb20pIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGUgfHwgbmV3U3RhdGUoZ2VuZXJhdGVSYW5kb20pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgdGhlIEVuZFNlc3Npb25SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBPYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogRW5kU2Vzc2lvblJlcXVlc3RKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWRfdG9rZW5faGludDogdGhpcy5pZFRva2VuSGludCxcbiAgICAgIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTogdGhpcy5wb3N0TG9nb3V0UmVkaXJlY3RVcmksXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIGV4dHJhczogdGhpcy5leHRyYXNcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgRW5kU2Vzc2lvblJlcXVlc3QuXG4gICAqL1xuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IEVuZFNlc3Npb25SZXF1ZXN0SnNvbik6IEVuZFNlc3Npb25SZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IEVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgICBpbnB1dC5pZF90b2tlbl9oaW50LCBpbnB1dC5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmksIGlucHV0LnN0YXRlLCBpbnB1dC5leHRyYXMpO1xuICB9XG59XG4iXX0=