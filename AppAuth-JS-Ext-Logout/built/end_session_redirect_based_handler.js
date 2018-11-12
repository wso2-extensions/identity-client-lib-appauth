"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var appauth_1 = require("@openid/appauth");
var end_session_request_1 = require("./end_session_request");
var end_session_request_handler_1 = require("./end_session_request_handler");
var end_session_response_1 = require("./end_session_response");
/** key for endsession request. */
var endSessionRequestKey = function (handle) {
    return handle + "_appauth_endsession_request";
};
/** key for authorization service configuration */
var authorizationServiceConfigurationKey = function (handle) {
    return handle + "_appauth_authorization_service_configuration";
};
/** key in local storage which represents the current endsession request. */
var ENDSESSION_REQUEST_HANDLE_KEY = 'appauth_current_endsession_request';
/**
 * Represents an EndSessionRequestHandler which uses a standard
 * redirect based code flow.
 */
var EndSessionRedirectRequestHandler = /** @class */ (function (_super) {
    __extends(EndSessionRedirectRequestHandler, _super);
    function EndSessionRedirectRequestHandler(
    // use the provided storage backend
    // or initialize local storage with the default storage backend which
    // uses window.localStorage
    storageBackend, utils, locationLike, generateRandom) {
        if (storageBackend === void 0) { storageBackend = new appauth_1.LocalStorageBackend(); }
        if (utils === void 0) { utils = new appauth_1.BasicQueryStringUtils(); }
        if (locationLike === void 0) { locationLike = window.location; }
        if (generateRandom === void 0) { generateRandom = appauth_1.cryptoGenerateRandom; }
        var _this = _super.call(this, utils, generateRandom) || this;
        _this.storageBackend = storageBackend;
        _this.locationLike = locationLike;
        return _this;
    }
    EndSessionRedirectRequestHandler.prototype.performEndSessionRequest = function (configuration, request) {
        var _this = this;
        var handle = this.generateRandom();
        // before you make request, persist all request related data in local storage.
        var persisted = Promise.all([
            this.storageBackend.setItem(ENDSESSION_REQUEST_HANDLE_KEY, handle),
            this.storageBackend.setItem(endSessionRequestKey(handle), JSON.stringify(request.toJson())),
            this.storageBackend.setItem(authorizationServiceConfigurationKey(handle), JSON.stringify(configuration.toJson())),
        ]);
        persisted.then(function () {
            // make the redirect request
            var url = _this.buildRequestUrl(configuration, request);
            appauth_1.log('Making a request to ', request, url);
            _this.locationLike.assign(url);
        });
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the request.
     */
    EndSessionRedirectRequestHandler.prototype.completeEndSessionRequest = function () {
        var _this = this;
        // TODO(rahulrav@): handle endsession errors.
        return this.storageBackend.getItem(ENDSESSION_REQUEST_HANDLE_KEY).then(function (handle) {
            if (handle) {
                // we have a pending request.
                // fetch endsession request, and check state
                return _this.storageBackend
                    .getItem(endSessionRequestKey(handle))
                    // requires a corresponding instance of result
                    // TODO(rahulrav@): check for inconsitent state here
                    .then(function (result) { return JSON.parse(result); })
                    .then(function (json) { return end_session_request_1.EndSessionRequest.fromJson(json); })
                    .then(function (request) {
                    // check redirect_uri and state
                    var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                    var queryParams = _this.utils.parse(_this.locationLike, false /* use hash */);
                    var state = queryParams['state'];
                    var error = queryParams['error'];
                    appauth_1.log('Potential endsession request ', currentUri, queryParams, state, error);
                    var shouldNotify = state === request.state;
                    var endSessionResponse = null;
                    var endSessionError = null;
                    if (shouldNotify) {
                        if (error) {
                            // get additional optional info.
                            var errorUri = queryParams['error_uri'];
                            var errorDescription = queryParams['error_description'];
                            endSessionError = new end_session_response_1.EndSessionError(error, errorDescription, errorUri, state);
                        }
                        else {
                            endSessionResponse = new end_session_response_1.EndSessionResponse(state);
                        }
                        // cleanup state
                        return Promise
                            .all([
                            _this.storageBackend.removeItem(ENDSESSION_REQUEST_HANDLE_KEY),
                            _this.storageBackend.removeItem(endSessionRequestKey(handle)),
                            _this.storageBackend.removeItem(authorizationServiceConfigurationKey(handle)),
                            _this.storageBackend.removeItem(appauth_1.AUTHORIZATION_RESPONSE_HANDLE_KEY)
                        ])
                            .then(function () {
                            appauth_1.log('Delivering endsession response');
                            return {
                                request: request,
                                response: endSessionResponse,
                                error: endSessionError
                            };
                        });
                    }
                    else {
                        appauth_1.log('Mismatched request (state and request_uri) dont match.');
                        return Promise.resolve(null);
                    }
                });
            }
            else {
                return null;
            }
        });
    };
    return EndSessionRedirectRequestHandler;
}(end_session_request_handler_1.EndSessionRequestHandler));
exports.EndSessionRedirectRequestHandler = EndSessionRedirectRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILDJDQUEwTTtBQUUxTSw2REFBd0Q7QUFDeEQsNkVBQWtHO0FBQ2xHLCtEQUEyRTtBQUczRSxrQ0FBa0M7QUFDbEMsSUFBTSxvQkFBb0IsR0FDdEIsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLGdDQUE2QixDQUFDO0FBQ2hELENBQUMsQ0FBQTtBQUVMLGtEQUFrRDtBQUNsRCxJQUFNLG9DQUFvQyxHQUN0QyxVQUFDLE1BQWM7SUFDYixPQUFVLE1BQU0saURBQThDLENBQUM7QUFDakUsQ0FBQyxDQUFBO0FBRUwsNEVBQTRFO0FBQzVFLElBQU0sNkJBQTZCLEdBQUcsb0NBQW9DLENBQUM7QUFFM0U7OztHQUdHO0FBQ0g7SUFBc0Qsb0RBQXdCO0lBQzVFO0lBQ0ksbUNBQW1DO0lBQ25DLHFFQUFxRTtJQUNyRSwyQkFBMkI7SUFDcEIsY0FBMEQsRUFDakUsS0FBbUMsRUFDNUIsWUFBNEMsRUFDbkQsY0FBcUM7UUFIOUIsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFDakUsc0JBQUEsRUFBQSxZQUFZLCtCQUFxQixFQUFFO1FBQzVCLDZCQUFBLEVBQUEsZUFBNkIsTUFBTSxDQUFDLFFBQVE7UUFDbkQsK0JBQUEsRUFBQSxpQkFBaUIsOEJBQW9CO1FBUHpDLFlBUUUsa0JBQU0sS0FBSyxFQUFFLGNBQWMsQ0FBQyxTQUM3QjtRQUxVLG9CQUFjLEdBQWQsY0FBYyxDQUE0QztRQUUxRCxrQkFBWSxHQUFaLFlBQVksQ0FBZ0M7O0lBR3ZELENBQUM7SUFFRCxtRUFBd0IsR0FBeEIsVUFDSSxhQUFnRCxFQUNoRCxPQUEwQjtRQUY5QixpQkFrQkM7UUFmQyxJ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RUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7eUJBQ2pGOzZCQUFNOzRCQUNMLGtCQUFrQixHQUFHLElBQUkseUNBQWtCLENBQUMsS0FBTSxDQUFDLENBQUM7eUJBQ3JEO3dCQUNELGdCQUFnQjt3QkFDaEIsT0FBTyxPQUFPOzZCQUNULEdBQUcsQ0FBQzs0QkFDSCxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQzs0QkFDN0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzVELEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUM1RSxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQywyQ0FBaUMsQ0FBQzt5QkFDbEUsQ0FBQzs2QkFDRCxJQUFJLENBQUM7NEJBQ0osYUFBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7NEJBQ3RDLE9BQU87Z0NBQ0wsT0FBTyxFQUFFLE9BQU87Z0NBQ2hCLFFBQVEsRUFBRSxrQkFBa0I7Z0NBQzVCLEtBQUssRUFBRSxlQUFlOzZCQUNNLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxDQUFDO3FCQUNSO3lCQUFNO3dCQUNMLGFBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO3dCQUM5RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzlCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHVDQUFDO0FBQUQsQ0FBQyxBQTVGRCxDQUFzRCxzREFBd0IsR0E0RjdFO0FBNUZZLDRFQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0FVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSwgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIGNyeXB0b0dlbmVyYXRlUmFuZG9tLCBMb2NhbFN0b3JhZ2VCYWNrZW5kLCBMb2NhdGlvbkxpa2UsIGxvZywgU3RvcmFnZUJhY2tlbmR9IGZyb20gJ0BvcGVuaWQvYXBwYXV0aCc7XG5cbmltcG9ydCB7RW5kU2Vzc2lvblJlcXVlc3R9IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVxdWVzdCc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciwgRW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZX0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtFbmRTZXNzaW9uRXJyb3IsIEVuZFNlc3Npb25SZXNwb25zZX0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXNwb25zZSc7XG5cblxuLyoqIGtleSBmb3IgZW5kc2Vzc2lvbiByZXF1ZXN0LiAqL1xuY29uc3QgZW5kU2Vzc2lvblJlcXVlc3RLZXkgPVxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9lbmRzZXNzaW9uX3JlcXVlc3RgO1xuICAgIH1cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gKi9cbmNvbnN0IGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uYDtcbiAgICB9XG5cbi8qKiBrZXkgaW4gbG9jYWwgc3RvcmFnZSB3aGljaCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGVuZHNlc3Npb24gcmVxdWVzdC4gKi9cbmNvbnN0IEVORFNFU1NJT05fUkVRVUVTVF9IQU5ETEVfS0VZID0gJ2FwcGF1dGhfY3VycmVudF9lbmRzZXNzaW9uX3JlcXVlc3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRW5kU2Vzc2lvblJlcXVlc3RIYW5kbGVyIHdoaWNoIHVzZXMgYSBzdGFuZGFyZFxuICogcmVkaXJlY3QgYmFzZWQgY29kZSBmbG93LlxuICovXG5leHBvcnQgY2xhc3MgRW5kU2Vzc2lvblJlZGlyZWN0UmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8vIHVzZSB0aGUgcHJvdmlkZWQgc3RvcmFnZSBiYWNrZW5kXG4gICAgICAvLyBvciBpbml0aWFsaXplIGxvY2FsIHN0b3JhZ2Ugd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIGJhY2tlbmQgd2hpY2hcbiAgICAgIC8vIHVzZXMgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgcHVibGljIHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCksXG4gICAgICB1dGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICAgIHB1YmxpYyBsb2NhdGlvbkxpa2U6IExvY2F0aW9uTGlrZSA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgIGdlbmVyYXRlUmFuZG9tID0gY3J5cHRvR2VuZXJhdGVSYW5kb20pIHtcbiAgICBzdXBlcih1dGlscywgZ2VuZXJhdGVSYW5kb20pO1xuICB9XG5cbiAgcGVyZm9ybUVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QpIHtcbiAgICBsZXQgaGFuZGxlID0gdGhpcy5nZW5lcmF0ZVJhbmRvbSgpO1xuICAgIC8vIGJlZm9yZSB5b3UgbWFrZSByZXF1ZXN0LCBwZXJzaXN0IGFsbCByZXF1ZXN0IHJlbGF0ZWQgZGF0YSBpbiBsb2NhbCBzdG9yYWdlLlxuICAgIGxldCBwZXJzaXN0ZWQgPSBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVksIGhhbmRsZSksXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oZW5kU2Vzc2lvblJlcXVlc3RLZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkocmVxdWVzdC50b0pzb24oKSkpLFxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKFxuICAgICAgICAgIGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleShoYW5kbGUpLCBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uLnRvSnNvbigpKSksXG4gICAgXSk7XG5cbiAgICBwZXJzaXN0ZWQudGhlbigoKSA9PiB7XG4gICAgICAvLyBtYWtlIHRoZSByZWRpcmVjdCByZXF1ZXN0XG4gICAgICBsZXQgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XG4gICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgIHRoaXMubG9jYXRpb25MaWtlLmFzc2lnbih1cmwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGludHJvc3BlY3QgdGhlIGNvbnRlbnRzIG9mIHN0b3JhZ2UgYmFja2VuZCBhbmQgY29tcGxldGVzIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbXBsZXRlRW5kU2Vzc2lvblJlcXVlc3QoKTogUHJvbWlzZTxFbmRTZXNzaW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+IHtcbiAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGhhbmRsZSBlbmRzZXNzaW9uIGVycm9ycy5cbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZC5nZXRJdGVtKEVORFNFU1NJT05fUkVRVUVTVF9IQU5ETEVfS0VZKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICBpZiAoaGFuZGxlKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSBwZW5kaW5nIHJlcXVlc3QuXG4gICAgICAgIC8vIGZldGNoIGVuZHNlc3Npb24gcmVxdWVzdCwgYW5kIGNoZWNrIHN0YXRlXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kXG4gICAgICAgICAgICAuZ2V0SXRlbShlbmRTZXNzaW9uUmVxdWVzdEtleShoYW5kbGUpKVxuICAgICAgICAgICAgLy8gcmVxdWlyZXMgYSBjb3JyZXNwb25kaW5nIGluc3RhbmNlIG9mIHJlc3VsdFxuICAgICAgICAgICAgLy8gVE9ETyhyYWh1bHJhdkApOiBjaGVjayBmb3IgaW5jb25zaXRlbnQgc3RhdGUgaGVyZVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IEpTT04ucGFyc2UocmVzdWx0ISkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IEVuZFNlc3Npb25SZXF1ZXN0LmZyb21Kc29uKGpzb24pKVxuICAgICAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAgIC8vIGNoZWNrIHJlZGlyZWN0X3VyaSBhbmQgc3RhdGVcbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVcmkgPSBgJHt0aGlzLmxvY2F0aW9uTGlrZS5vcmlnaW59JHt0aGlzLmxvY2F0aW9uTGlrZS5wYXRobmFtZX1gO1xuICAgICAgICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSB0aGlzLnV0aWxzLnBhcnNlKHRoaXMubG9jYXRpb25MaWtlLCBmYWxzZSAvKiB1c2UgaGFzaCAqLyk7XG4gICAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydzdGF0ZSddO1xuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgICAgICAgbG9nKCdQb3RlbnRpYWwgZW5kc2Vzc2lvbiByZXF1ZXN0ICcsIGN1cnJlbnRVcmksIHF1ZXJ5UGFyYW1zLCBzdGF0ZSwgZXJyb3IpO1xuICAgICAgICAgICAgICBsZXQgc2hvdWxkTm90aWZ5ID0gc3RhdGUgPT09IHJlcXVlc3Quc3RhdGU7XG4gICAgICAgICAgICAgIGxldCBlbmRTZXNzaW9uUmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgbGV0IGVuZFNlc3Npb25FcnJvcjogRW5kU2Vzc2lvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAoc2hvdWxkTm90aWZ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBnZXQgYWRkaXRpb25hbCBvcHRpb25hbCBpbmZvLlxuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVXJpID0gcXVlcnlQYXJhbXNbJ2Vycm9yX3VyaSddO1xuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcbiAgICAgICAgICAgICAgICAgIGVuZFNlc3Npb25FcnJvciA9IG5ldyBFbmRTZXNzaW9uRXJyb3IoZXJyb3IsIGVycm9yRGVzY3JpcHRpb24sIGVycm9yVXJpLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGVuZFNlc3Npb25SZXNwb25zZSA9IG5ldyBFbmRTZXNzaW9uUmVzcG9uc2Uoc3RhdGUhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2xlYW51cCBzdGF0ZVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgICAgICAgICAgICAgIC5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShFTkRTRVNTSU9OX1JFUVVFU1RfSEFORExFX0tFWSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKGVuZFNlc3Npb25SZXF1ZXN0S2V5KGhhbmRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGxvZygnRGVsaXZlcmluZyBlbmRzZXNzaW9uIHJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogZW5kU2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVuZFNlc3Npb25FcnJvclxuICAgICAgICAgICAgICAgICAgICAgIH0gYXMgRW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKCdNaXNtYXRjaGVkIHJlcXVlc3QgKHN0YXRlIGFuZCByZXF1ZXN0X3VyaSkgZG9udCBtYXRjaC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=