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
Object.defineProperty(exports, "__esModule", { value: true });
// Represents the test web app that uses the AppAuthJS library.
var authorization_request_1 = require("../authorization_request");
var authorization_request_handler_1 = require("../authorization_request_handler");
var authorization_service_configuration_1 = require("../authorization_service_configuration");
var logger_1 = require("../logger");
var redirect_based_handler_1 = require("../redirect_based_handler");
var types_1 = require("../types");
var storage_1 = require("../storage");
var crypto_utils_1 = require("../crypto_utils");
/**
 * The wrapper appication.
 */
var App = /** @class */ (function () {
    function App(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.authorizeUrl, authorizeUrl = _c === void 0 ? '' : _c, _d = _b.tokenUrl, tokenUrl = _d === void 0 ? '' : _d, _e = _b.revokeUrl, revokeUrl = _e === void 0 ? '' : _e, _f = _b.logoutUrl, logoutUrl = _f === void 0 ? '' : _f, _g = _b.userInfoUrl, userInfoUrl = _g === void 0 ? '' : _g, _h = _b.flowType, flowType = _h === void 0 ? "IMPLICIT" : _h, _j = _b.userStore, userStore = _j === void 0 ? "LOCAL_STORAGE" : _j, _k = _b.clientId, clientId = _k === void 0 ? '511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com' : _k, _l = _b.clientSecret, clientSecret = _l === void 0 ? '' : _l, _m = _b.redirectUri, redirectUri = _m === void 0 ? 'http://localhost:8080/app/' : _m, _o = _b.scope, scope = _o === void 0 ? 'openid' : _o, _p = _b.postLogoutRedirectUri, postLogoutRedirectUri = _p === void 0 ? 'http://localhost:8080/app/' : _p, _q = _b.discoveryUri, discoveryUri = _q === void 0 ? 'https://accounts.google.com' : _q;
        this.authorizeUrl = authorizeUrl;
        this.tokenUrl = tokenUrl;
        this.revokeUrl = revokeUrl;
        this.logoutUrl = logoutUrl;
        this.userInfoUrl = userInfoUrl;
        this.flowTypeInternal = types_1.FLOW_TYPE_IMPLICIT;
        if (flowType == "PKCE") {
            this.flowTypeInternal = types_1.FLOW_TYPE_PKCE;
        }
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.scope = scope;
        this.redirectUri = redirectUri;
        this.postLogoutRedirectUri = postLogoutRedirectUri;
        this.discoveryUri = discoveryUri;
        if (userStore == "LOCAL_STORAGE") {
            this.userStore = new storage_1.LocalStorageBackend();
        }
        else {
            console.log('Session storage is not currently supported on underlying platform.');
            this.userStore = new storage_1.LocalStorageBackend();
        }
        this.configuration = new authorization_service_configuration_1.AuthorizationServiceConfiguration(this.flowTypeInternal, authorizeUrl, tokenUrl, revokeUrl, logoutUrl, userInfoUrl);
        this.notifier = new authorization_request_handler_1.AuthorizationNotifier();
        this.authorizationHandler = new redirect_based_handler_1.RedirectRequestHandler();
    }
    App.prototype.getConfiguration = function () {
        return this.configuration;
    };
    App.prototype.init = function (authorizationListenerCallback) {
        var _this = this;
        // set notifier to deliver responses
        this.authorizationHandler.setAuthorizationNotifier(this.notifier);
        // set a listener to listen for authorization responses
        this.notifier.setAuthorizationListener(function (request, response, error) {
            logger_1.log('Authorization request complete ', request, response, error);
            if (response) {
                _this.showMessage("Authorization Code " + response.code);
            }
            if (authorizationListenerCallback) {
                authorizationListenerCallback(request, response, error);
            }
        });
    };
    App.prototype.fetchServiceConfiguration = function () {
        var _this = this;
        authorization_service_configuration_1.AuthorizationServiceConfiguration.fetchFromIssuer(this.discoveryUri)
            .then(function (response) {
            logger_1.log('Fetched service configuration', response);
            response.oauthFlowType = _this.flowTypeInternal;
            _this.showMessage('Completed fetching configuration');
            _this.configuration = response;
        })
            .catch(function (error) {
            logger_1.log('Something bad happened', error);
            _this.showMessage("Something bad happened " + error);
        });
    };
    App.prototype.makeAuthorizationRequest = function (state, nonce) {
        // generater state
        if (!state) {
            state = App.generateState();
        }
        // create a request
        var request;
        if (this.configuration.toJson().oauth_flow_type == types_1.FLOW_TYPE_IMPLICIT) {
            // generater nonce
            if (!nonce) {
                nonce = App.generateNonce();
            }
            request = new authorization_request_1.AuthorizationRequest(this.clientId, this.redirectUri, this.scope, authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_ID_TOKEN, state, { 'prompt': 'consent', 'access_type': 'online', 'nonce': nonce });
            // make the authorization request
            this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
        }
    };
    App.prototype.checkForAuthorizationResponse = function () {
        var isAuthRequestComplete = false;
        switch (this.configuration.toJson().oauth_flow_type) {
            case types_1.FLOW_TYPE_IMPLICIT:
                var params = this.parseQueryString(location, true);
                isAuthRequestComplete = params.hasOwnProperty('id_token');
                break;
        }
        if (isAuthRequestComplete) {
            return this.authorizationHandler.completeAuthorizationRequestIfPossible();
        }
    };
    App.prototype.showMessage = function (message) {
        console.log(message);
    };
    App.generateNonce = function () {
        var nonceLen = 8;
        return crypto_utils_1.cryptoGenerateRandom(nonceLen);
    };
    App.generateState = function () {
        var stateLen = 8;
        return crypto_utils_1.cryptoGenerateRandom(stateLen);
    };
    App.prototype.parseQueryString = function (location, splitByHash) {
        var urlParams;
        if (splitByHash) {
            urlParams = location.hash;
        }
        else {
            urlParams = location.search;
        }
        var result = {};
        // if anything starts with ?, # or & remove it
        urlParams = urlParams.trim().replace(/^(\?|#|&)/, '');
        var params = urlParams.split('&');
        for (var i = 0; i < params.length; i += 1) {
            var param = params[i]; // looks something like a=b
            var parts = param.split('=');
            if (parts.length >= 2) {
                var key = decodeURIComponent(parts.shift());
                var value = parts.length > 0 ? parts.join('=') : null;
                if (value) {
                    result[key] = decodeURIComponent(value);
                }
            }
        }
        return result;
    };
    return App;
}());
exports.App = App;
// export App
window['App'] = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0RBQStEO0FBRS9ELGtFQUE4RDtBQUM5RCxrRkFBb0c7QUFDcEcsOEZBQXlGO0FBQ3pGLG9DQUE4QjtBQUM5QixvRUFBaUU7QUFFakUsa0NBQWlHO0FBQ2pHLHNDQUFpRTtBQUNqRSxnREFBdUQ7QUFFdkQ7O0dBRUc7QUFDSDtJQXlCRSxhQUFZLEVBY047WUFkTSw0QkFjTixFQWJKLG9CQUFpQixFQUFqQixzQ0FBaUIsRUFDakIsZ0JBQWEsRUFBYixrQ0FBYSxFQUNiLGlCQUFjLEVBQWQsbUNBQWMsRUFDZCxpQkFBYyxFQUFkLG1DQUFjLEVBQ2QsbUJBQWdCLEVBQWhCLHFDQUFnQixFQUNoQixnQkFBcUIsRUFBckIsMENBQXFCLEVBQ3JCLGlCQUEyQixFQUEzQixnREFBMkIsRUFDM0IsZ0JBQXFGLEVBQXJGLDBHQUFxRixFQUNyRixvQkFBaUIsRUFBakIsc0NBQWlCLEVBQ2pCLG1CQUEwQyxFQUExQywrREFBMEMsRUFDMUMsYUFBZ0IsRUFBaEIscUNBQWdCLEVBQ2hCLDZCQUFvRCxFQUFwRCx5RUFBb0QsRUFDcEQsb0JBQTRDLEVBQTVDLGlFQUE0QztRQUc1QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUUvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsMEJBQWtCLENBQUM7UUFDM0MsSUFBRyxRQUFRLElBQUksTUFBTSxFQUFFO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBYyxD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O2dCQUN0RCxJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3pDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQXBNRCxJQW9NQztBQXBNWSxrQkFBRztBQXNNaEIsYUFBYTtBQUNaLE1BQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gUmVwcmVzZW50cyB0aGUgdGVzdCB3ZWIgYXBwIHRoYXQgdXNlcyB0aGUgQXBwQXV0aEpTIGxpYnJhcnkuXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25Ob3RpZmllciwgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge1JlZGlyZWN0UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3JlZGlyZWN0X2Jhc2VkX2hhbmRsZXInO1xuaW1wb3J0IHtHUkFOVF9UWVBFX0FVVEhPUklaQVRJT05fQ09ERSwgVG9rZW5SZXF1ZXN0fSBmcm9tICcuLi90b2tlbl9yZXF1ZXN0JztcbmltcG9ydCB7IEZMT1dfVFlQRV9JTVBMSUNJVCwgRkxPV19UWVBFX1BLQ0UsIEFVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZUJhY2tlbmQsIFN0b3JhZ2VCYWNrZW5kIH0gZnJvbSAnLi4vc3RvcmFnZSc7XG5pbXBvcnQgeyBjcnlwdG9HZW5lcmF0ZVJhbmRvbSB9IGZyb20gJy4uL2NyeXB0b191dGlscyc7XG5cbi8qKlxuICogVGhlIHdyYXBwZXIgYXBwaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcCB7XG5cbiAgLyogY2xpZW50IGNvbmZpZ3VyYXRpb24gKi9cbiAgcHJpdmF0ZSBhdXRob3JpemVVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSB0b2tlblVybDogc3RyaW5nO1xuICBwcml2YXRlIHJldm9rZVVybDogc3RyaW5nO1xuICBwcml2YXRlIGxvZ291dFVybDogc3RyaW5nO1xuICBwcml2YXRlIHVzZXJJbmZvVXJsOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nO1xuICBwcml2YXRlIGNsaWVudFNlY3JldDogc3RyaW5nO1xuICBwcml2YXRlIHJlZGlyZWN0VXJpOiBzdHJpbmc7XG4gIHByaXZhdGUgc2NvcGU6IHN0cmluZztcbiAgcHJpdmF0ZSBwb3N0TG9nb3V0UmVkaXJlY3RVcmk6IHN0cmluZztcblxuICBwcml2YXRlIGRpc2NvdmVyeVVyaTogc3RyaW5nO1xuXG4gIHByaXZhdGUgdXNlclN0b3JlOiBTdG9yYWdlQmFja2VuZDtcbiAgcHJpdmF0ZSBmbG93VHlwZUludGVybmFsOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyO1xuICBwcml2YXRlIGF1dGhvcml6YXRpb25IYW5kbGVyOiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXI7XG5cbiAgcHJpdmF0ZSBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb247XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGF1dGhvcml6ZVVybCA9ICcnLFxuICAgIHRva2VuVXJsID0gJycsXG4gICAgcmV2b2tlVXJsID0gJycsXG4gICAgbG9nb3V0VXJsID0gJycsXG4gICAgdXNlckluZm9VcmwgPSAnJyxcbiAgICBmbG93VHlwZSA9IFwiSU1QTElDSVRcIixcbiAgICB1c2VyU3RvcmUgPSBcIkxPQ0FMX1NUT1JBR0VcIixcbiAgICBjbGllbnRJZCA9ICc1MTE4Mjg1NzA5ODQtN25tZWozNmg5ajJ0ZWJpcW1wcWg4MzVuYWV0NHZjaTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nLFxuICAgIGNsaWVudFNlY3JldCA9ICcnLFxuICAgIHJlZGlyZWN0VXJpID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcHAvJyxcbiAgICBzY29wZSA9ICdvcGVuaWQnLFxuICAgIHBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBwLycsXG4gICAgZGlzY292ZXJ5VXJpID0gJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSdcbiAgfSA9IHt9KSB7XG5cbiAgICB0aGlzLmF1dGhvcml6ZVVybCA9IGF1dGhvcml6ZVVybDtcbiAgICB0aGlzLnRva2VuVXJsID0gdG9rZW5Vcmw7XG4gICAgdGhpcy5yZXZva2VVcmwgPSByZXZva2VVcmw7XG4gICAgdGhpcy5sb2dvdXRVcmwgPSBsb2dvdXRVcmw7XG4gICAgdGhpcy51c2VySW5mb1VybCA9IHVzZXJJbmZvVXJsO1xuXG4gICAgdGhpcy5mbG93VHlwZUludGVybmFsID0gRkxPV19UWVBFX0lNUExJQ0lUO1xuICAgIGlmKGZsb3dUeXBlID09IFwiUEtDRVwiKSB7XG4gICAgICAgIHRoaXMuZmxvd1R5cGVJbnRlcm5hbCA9IEZMT1dfVFlQRV9QS0NFO1xuICAgIH1cblxuICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZDtcbiAgICB0aGlzLmNsaWVudFNlY3JldCA9IGNsaWVudFNlY3JldDtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgdGhpcy5yZWRpcmVjdFVyaSA9IHJlZGlyZWN0VXJpO1xuICAgIHRoaXMucG9zdExvZ291dFJlZGlyZWN0VXJpID0gcG9zdExvZ291dFJlZGlyZWN0VXJpO1xuICAgIHRoaXMuZGlzY292ZXJ5VXJpID0gZGlzY292ZXJ5VXJpO1xuXG4gICAgaWYodXNlclN0b3JlID09IFwiTE9DQUxfU1RPUkFHRVwiKSB7XG4gICAgICB0aGlzLnVzZXJTdG9yZSA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTZXNzaW9uIHN0b3JhZ2UgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQgb24gdW5kZXJseWluZyBwbGF0Zm9ybS4nKTtcbiAgICAgIHRoaXMudXNlclN0b3JlID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uKFxuICAgICAgdGhpcy5mbG93VHlwZUludGVybmFsLFxuICAgICAgYXV0aG9yaXplVXJsLFxuICAgICAgdG9rZW5VcmwsXG4gICAgICByZXZva2VVcmwsXG4gICAgICBsb2dvdXRVcmwsXG4gICAgICB1c2VySW5mb1VybCk7XG5cbiAgICB0aGlzLm5vdGlmaWVyID0gbmV3IEF1dGhvcml6YXRpb25Ob3RpZmllcigpO1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIgPSBuZXcgUmVkaXJlY3RSZXF1ZXN0SGFuZGxlcigpO1xuICB9XG5cbiAgZ2V0Q29uZmlndXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uO1xuICB9XG5cbiAgaW5pdChhdXRob3JpemF0aW9uTGlzdGVuZXJDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgLy8gc2V0IG5vdGlmaWVyIHRvIGRlbGl2ZXIgcmVzcG9uc2VzXG4gICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlci5zZXRBdXRob3JpemF0aW9uTm90aWZpZXIodGhpcy5ub3RpZmllcik7XG4gICAgLy8gc2V0IGEgbGlzdGVuZXIgdG8gbGlzdGVuIGZvciBhdXRob3JpemF0aW9uIHJlc3BvbnNlc1xuICAgIHRoaXMubm90aWZpZXIuc2V0QXV0aG9yaXphdGlvbkxpc3RlbmVyKChyZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpID0+IHtcbiAgICAgIGxvZygnQXV0aG9yaXphdGlvbiByZXF1ZXN0IGNvbXBsZXRlICcsIHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZShgQXV0aG9yaXphdGlvbiBDb2RlICR7cmVzcG9uc2UuY29kZX1gKTtcbiAgICAgIH1cbiAgICAgIGlmKGF1dGhvcml6YXRpb25MaXN0ZW5lckNhbGxiYWNrKSB7XG4gICAgICAgIGF1dGhvcml6YXRpb25MaXN0ZW5lckNhbGxiYWNrKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaFNlcnZpY2VDb25maWd1cmF0aW9uKCkge1xuXG4gICAgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLmZldGNoRnJvbUlzc3Vlcih0aGlzLmRpc2NvdmVyeVVyaSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgbG9nKCdGZXRjaGVkIHNlcnZpY2UgY29uZmlndXJhdGlvbicsIHJlc3BvbnNlKTtcbiAgICAgICAgcmVzcG9uc2Uub2F1dGhGbG93VHlwZSA9IHRoaXMuZmxvd1R5cGVJbnRlcm5hbDtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZSgnQ29tcGxldGVkIGZldGNoaW5nIGNvbmZpZ3VyYXRpb24nKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkJywgZXJyb3IpO1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKGBTb21ldGhpbmcgYmFkIGhhcHBlbmVkICR7ZXJyb3J9YClcbiAgICAgIH0pO1xuICB9XG5cbiAgbWFrZUF1dGhvcml6YXRpb25SZXF1ZXN0KHN0YXRlPzogc3RyaW5nLCBub25jZT86IHN0cmluZykge1xuXG4gICAgLy8gZ2VuZXJhdGVyIHN0YXRlXG4gICAgaWYoIXN0YXRlKSB7XG4gICAgICBzdGF0ZSA9IEFwcC5nZW5lcmF0ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgcmVxdWVzdFxuICAgIHZhciByZXF1ZXN0O1xuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24udG9Kc29uKCkub2F1dGhfZmxvd190eXBlID09IEZMT1dfVFlQRV9JTVBMSUNJVCkge1xuICAgICAgLy8gZ2VuZXJhdGVyIG5vbmNlXG4gICAgICBpZighbm9uY2UpIHtcbiAgICAgICAgbm9uY2UgPSBBcHAuZ2VuZXJhdGVOb25jZSgpO1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0ID0gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgICAgIHRoaXMuY2xpZW50SWQsXG4gICAgICAgICAgdGhpcy5yZWRpcmVjdFVyaSxcbiAgICAgICAgICB0aGlzLnNjb3BlLFxuICAgICAgICAgIEF1dGhvcml6YXRpb25SZXF1ZXN0LlJFU1BPTlNFX1RZUEVfSURfVE9LRU4sXG4gICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgeydwcm9tcHQnOiAnY29uc2VudCcsICdhY2Nlc3NfdHlwZSc6ICdvbmxpbmUnLCAnbm9uY2UnOiBub25jZX0pO1xuICAgICAgLy8gbWFrZSB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gICAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyLnBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdCh0aGlzLmNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuXG4gICAgfVxuICB9XG5cbiAgY2hlY2tGb3JBdXRob3JpemF0aW9uUmVzcG9uc2UoKTogUHJvbWlzZTx2b2lkPnx2b2lkIHtcblxuICAgIHZhciBpc0F1dGhSZXF1ZXN0Q29tcGxldGUgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAodGhpcy5jb25maWd1cmF0aW9uLnRvSnNvbigpLm9hdXRoX2Zsb3dfdHlwZSkge1xuICAgICAgY2FzZSBGTE9XX1RZUEVfSU1QTElDSVQ6XG4gICAgICAgIHZhciBwYXJhbXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcobG9jYXRpb24sIHRydWUpO1xuICAgICAgICBpc0F1dGhSZXF1ZXN0Q29tcGxldGUgPSBwYXJhbXMuaGFzT3duUHJvcGVydHkoJ2lkX3Rva2VuJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChpc0F1dGhSZXF1ZXN0Q29tcGxldGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3RJZlBvc3NpYmxlKCk7XG5cbiAgICB9XG4gIH1cblxuICBzaG93TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfVxuXG4gIHN0YXRpYyBnZW5lcmF0ZU5vbmNlKCkge1xuICAgIHZhciBub25jZUxlbiA9IDg7XG4gICAgcmV0dXJuIGNyeXB0b0dlbmVyYXRlUmFuZG9tKG5vbmNlTGVuKTtcbiAgfVxuXG4gIHN0YXRpYyBnZW5lcmF0ZVN0YXRlKCkge1xuICAgIHZhciBzdGF0ZUxlbiA9IDg7XG4gICAgcmV0dXJuIGNyeXB0b0dlbmVyYXRlUmFuZG9tKHN0YXRlTGVuKTtcbiAgfVxuXG4gIHBhcnNlUXVlcnlTdHJpbmcobG9jYXRpb246IExvY2F0aW9uLCBzcGxpdEJ5SGFzaDogYm9vbGVhbik6IE9iamVjdCB7XG4gICAgdmFyIHVybFBhcmFtcztcbiAgICBpZiAoc3BsaXRCeUhhc2gpIHtcbiAgICAgIHVybFBhcmFtcyA9IGxvY2F0aW9uLmhhc2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybFBhcmFtcyA9IGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIC8vIGlmIGFueXRoaW5nIHN0YXJ0cyB3aXRoID8sICMgb3IgJiByZW1vdmUgaXRcbiAgICB1cmxQYXJhbXMgPSB1cmxQYXJhbXMudHJpbSgpLnJlcGxhY2UoL14oXFw/fCN8JikvLCAnJyk7XG4gICAgbGV0IHBhcmFtcyA9IHVybFBhcmFtcy5zcGxpdCgnJicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsZXQgcGFyYW0gPSBwYXJhbXNbaV07ICAvLyBsb29rcyBzb21ldGhpbmcgbGlrZSBhPWJcbiAgICAgIGxldCBwYXJ0cyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICBpZiAocGFydHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgbGV0IGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0cy5zaGlmdCgpISk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0cy5qb2luKCc9JykgOiBudWxsO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG4vLyBleHBvcnQgQXBwXG4od2luZG93IGFzIGFueSlbJ0FwcCddID0gQXBwO1xuIl19