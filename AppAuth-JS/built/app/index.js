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
        var _b = _a === void 0 ? {} : _a, _c = _b.authorizeUrl, authorizeUrl = _c === void 0 ? '' : _c, _d = _b.tokenUrl, tokenUrl = _d === void 0 ? '' : _d, _e = _b.revokeUrl, revokeUrl = _e === void 0 ? '' : _e, _f = _b.logoutUrl, logoutUrl = _f === void 0 ? '' : _f, _g = _b.userInfoUrl, userInfoUrl = _g === void 0 ? '' : _g, _h = _b.flowType, flowType = _h === void 0 ? types_1.FLOW_TYPE_IMPLICIT : _h, _j = _b.userStore, userStore = _j === void 0 ? types_1.LOCAL_STORAGE : _j, _k = _b.clientId, clientId = _k === void 0 ? '511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com' : _k, _l = _b.clientSecret, clientSecret = _l === void 0 ? '' : _l, _m = _b.redirectUri, redirectUri = _m === void 0 ? 'http://localhost:8080/app/' : _m, _o = _b.scope, scope = _o === void 0 ? 'openid' : _o, _p = _b.postLogoutRedirectUri, postLogoutRedirectUri = _p === void 0 ? 'http://localhost:8080/app/' : _p, _q = _b.discoveryUri, discoveryUri = _q === void 0 ? 'https://accounts.google.com' : _q;
        this.authorizeUrl = authorizeUrl;
        this.tokenUrl = tokenUrl;
        this.revokeUrl = revokeUrl;
        this.logoutUrl = logoutUrl;
        this.userInfoUrl = userInfoUrl;
        this.flowTypeInternal = types_1.FLOW_TYPE_IMPLICIT;
        if (flowType == types_1.FLOW_TYPE_PKCE) {
            this.flowTypeInternal = types_1.FLOW_TYPE_PKCE;
        }
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.scope = scope;
        this.redirectUri = redirectUri;
        this.postLogoutRedirectUri = postLogoutRedirectUri;
        this.discoveryUri = discoveryUri;
        if (userStore == types_1.LOCAL_STORAGE) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0RBQStEO0FBRS9ELGtFQUE4RDtBQUM5RCxrRkFBb0c7QUFDcEcsOEZBQXlGO0FBQ3pGLG9DQUE4QjtBQUM5QixvRUFBaUU7QUFDakUsa0NBQTZFO0FBQzdFLHNDQUFpRTtBQUNqRSxnREFBdUQ7QUFFdkQ7O0dBRUc7QUFDSDtJQXlCRSxhQUFZLEVBY047WUFkTSw0QkFjTixFQWJKLG9CQUFpQixFQUFqQixzQ0FBaUIsRUFDakIsZ0JBQWEsRUFBYixrQ0FBYSxFQUNiLGlCQUFjLEVBQWQsbUNBQWMsRUFDZCxpQkFBYyxFQUFkLG1DQUFjLEVBQ2QsbUJBQWdCLEVBQWhCLHFDQUFnQixFQUNoQixnQkFBNkIsRUFBN0IsMERBQTZCLEVBQzdCLGlCQUF5QixFQUF6QixzREFBeUIsRUFDekIsZ0JBQXFGLEVBQXJGLDBHQUFxRixFQUNyRixvQkFBaUIsRUFBakIsc0NBQWlCLEVBQ2pCLG1CQUEwQyxFQUExQywrREFBMEMsRUFDMUMsYUFBZ0IsRUFBaEIscUNBQWdCLEVBQ2hCLDZCQUFvRCxFQUFwRCx5RUFBb0QsRUFDcEQsb0JBQTRDLEVBQTVDLGlFQUE0QztRQUc1QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUUvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsMEJBQWtCLENBQUM7UUFDM0MsSUFBSSxRQUFRLElBQUksc0JBQWMsRUFBRTtZQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsc0JBQWMs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QUM7Z0JBQ3RELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDekM7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDLEFBcE1ELElBb01DO0FBcE1ZLGtCQUFHO0FBc01oQixhQUFhO0FBQ1osTUFBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBSZXByZXNlbnRzIHRoZSB0ZXN0IHdlYiBhcHAgdGhhdCB1c2VzIHRoZSBBcHBBdXRoSlMgbGlicmFyeS5cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdH0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcbmltcG9ydCB7QXV0aG9yaXphdGlvbk5vdGlmaWVyLCBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7UmVkaXJlY3RSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vcmVkaXJlY3RfYmFzZWRfaGFuZGxlcic7XG5pbXBvcnQgeyBGTE9XX1RZUEVfSU1QTElDSVQsIEZMT1dfVFlQRV9QS0NFLCBMT0NBTF9TVE9SQUdFIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlQmFja2VuZCwgU3RvcmFnZUJhY2tlbmQgfSBmcm9tICcuLi9zdG9yYWdlJztcbmltcG9ydCB7IGNyeXB0b0dlbmVyYXRlUmFuZG9tIH0gZnJvbSAnLi4vY3J5cHRvX3V0aWxzJztcblxuLyoqXG4gKiBUaGUgd3JhcHBlciBhcHBpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgQXBwIHtcblxuICAvKiBjbGllbnQgY29uZmlndXJhdGlvbiAqL1xuICBwcml2YXRlIGF1dGhvcml6ZVVybDogc3RyaW5nO1xuICBwcml2YXRlIHRva2VuVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcmV2b2tlVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgbG9nb3V0VXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgdXNlckluZm9Vcmw6IHN0cmluZztcblxuICBwcml2YXRlIGNsaWVudElkOiBzdHJpbmc7XG4gIHByaXZhdGUgY2xpZW50U2VjcmV0OiBzdHJpbmc7XG4gIHByaXZhdGUgcmVkaXJlY3RVcmk6IHN0cmluZztcbiAgcHJpdmF0ZSBzY29wZTogc3RyaW5nO1xuICBwcml2YXRlIHBvc3RMb2dvdXRSZWRpcmVjdFVyaTogc3RyaW5nO1xuXG4gIHByaXZhdGUgZGlzY292ZXJ5VXJpOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB1c2VyU3RvcmU6IFN0b3JhZ2VCYWNrZW5kO1xuICBwcml2YXRlIGZsb3dUeXBlSW50ZXJuYWw6IHN0cmluZztcblxuICBwcml2YXRlIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXI7XG4gIHByaXZhdGUgYXV0aG9yaXphdGlvbkhhbmRsZXI6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcjtcblxuICBwcml2YXRlIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbjtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgYXV0aG9yaXplVXJsID0gJycsXG4gICAgdG9rZW5VcmwgPSAnJyxcbiAgICByZXZva2VVcmwgPSAnJyxcbiAgICBsb2dvdXRVcmwgPSAnJyxcbiAgICB1c2VySW5mb1VybCA9ICcnLFxuICAgIGZsb3dUeXBlID0gRkxPV19UWVBFX0lNUExJQ0lULFxuICAgIHVzZXJTdG9yZSA9IExPQ0FMX1NUT1JBR0UsXG4gICAgY2xpZW50SWQgPSAnNTExODI4NTcwOTg0LTdubWVqMzZoOWoydGViaXFtcHFoODM1bmFldDR2Y2k0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICBjbGllbnRTZWNyZXQgPSAnJyxcbiAgICByZWRpcmVjdFVyaSA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBwLycsXG4gICAgc2NvcGUgPSAnb3BlbmlkJyxcbiAgICBwb3N0TG9nb3V0UmVkaXJlY3RVcmkgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwcC8nLFxuICAgIGRpc2NvdmVyeVVyaSA9ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20nXG4gIH0gPSB7fSkge1xuXG4gICAgdGhpcy5hdXRob3JpemVVcmwgPSBhdXRob3JpemVVcmw7XG4gICAgdGhpcy50b2tlblVybCA9IHRva2VuVXJsO1xuICAgIHRoaXMucmV2b2tlVXJsID0gcmV2b2tlVXJsO1xuICAgIHRoaXMubG9nb3V0VXJsID0gbG9nb3V0VXJsO1xuICAgIHRoaXMudXNlckluZm9VcmwgPSB1c2VySW5mb1VybDtcblxuICAgIHRoaXMuZmxvd1R5cGVJbnRlcm5hbCA9IEZMT1dfVFlQRV9JTVBMSUNJVDtcbiAgICBpZiAoZmxvd1R5cGUgPT0gRkxPV19UWVBFX1BLQ0UpIHtcbiAgICAgICAgdGhpcy5mbG93VHlwZUludGVybmFsID0gRkxPV19UWVBFX1BLQ0U7XG4gICAgfVxuXG4gICAgdGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xuICAgIHRoaXMuY2xpZW50U2VjcmV0ID0gY2xpZW50U2VjcmV0O1xuICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gcmVkaXJlY3RVcmk7XG4gICAgdGhpcy5wb3N0TG9nb3V0UmVkaXJlY3RVcmkgPSBwb3N0TG9nb3V0UmVkaXJlY3RVcmk7XG4gICAgdGhpcy5kaXNjb3ZlcnlVcmkgPSBkaXNjb3ZlcnlVcmk7XG5cbiAgICBpZiAodXNlclN0b3JlID09IExPQ0FMX1NUT1JBR0UpIHtcbiAgICAgIHRoaXMudXNlclN0b3JlID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1Nlc3Npb24gc3RvcmFnZSBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZCBvbiB1bmRlcmx5aW5nIHBsYXRmb3JtLicpO1xuICAgICAgdGhpcy51c2VyU3RvcmUgPSBuZXcgTG9jYWxTdG9yYWdlQmFja2VuZCgpO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24oXG4gICAgICB0aGlzLmZsb3dUeXBlSW50ZXJuYWwsXG4gICAgICBhdXRob3JpemVVcmwsXG4gICAgICB0b2tlblVybCxcbiAgICAgIHJldm9rZVVybCxcbiAgICAgIGxvZ291dFVybCxcbiAgICAgIHVzZXJJbmZvVXJsKTtcblxuICAgIHRoaXMubm90aWZpZXIgPSBuZXcgQXV0aG9yaXphdGlvbk5vdGlmaWVyKCk7XG4gICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlciA9IG5ldyBSZWRpcmVjdFJlcXVlc3RIYW5kbGVyKCk7XG4gIH1cblxuICBnZXRDb25maWd1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb247XG4gIH1cblxuICBpbml0KGF1dGhvcml6YXRpb25MaXN0ZW5lckNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAvLyBzZXQgbm90aWZpZXIgdG8gZGVsaXZlciByZXNwb25zZXNcbiAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyLnNldEF1dGhvcml6YXRpb25Ob3RpZmllcih0aGlzLm5vdGlmaWVyKTtcbiAgICAvLyBzZXQgYSBsaXN0ZW5lciB0byBsaXN0ZW4gZm9yIGF1dGhvcml6YXRpb24gcmVzcG9uc2VzXG4gICAgdGhpcy5ub3RpZmllci5zZXRBdXRob3JpemF0aW9uTGlzdGVuZXIoKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcikgPT4ge1xuICAgICAgbG9nKCdBdXRob3JpemF0aW9uIHJlcXVlc3QgY29tcGxldGUgJywgcmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKGBBdXRob3JpemF0aW9uIENvZGUgJHtyZXNwb25zZS5jb2RlfWApO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhvcml6YXRpb25MaXN0ZW5lckNhbGxiYWNrKSB7XG4gICAgICAgIGF1dGhvcml6YXRpb25MaXN0ZW5lckNhbGxiYWNrKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaFNlcnZpY2VDb25maWd1cmF0aW9uKCkge1xuXG4gICAgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLmZldGNoRnJvbUlzc3Vlcih0aGlzLmRpc2NvdmVyeVVyaSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgbG9nKCdGZXRjaGVkIHNlcnZpY2UgY29uZmlndXJhdGlvbicsIHJlc3BvbnNlKTtcbiAgICAgICAgcmVzcG9uc2Uub2F1dGhGbG93VHlwZSA9IHRoaXMuZmxvd1R5cGVJbnRlcm5hbDtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZSgnQ29tcGxldGVkIGZldGNoaW5nIGNvbmZpZ3VyYXRpb24nKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkJywgZXJyb3IpO1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKGBTb21ldGhpbmcgYmFkIGhhcHBlbmVkICR7ZXJyb3J9YClcbiAgICAgIH0pO1xuICB9XG5cbiAgbWFrZUF1dGhvcml6YXRpb25SZXF1ZXN0KHN0YXRlPzogc3RyaW5nLCBub25jZT86IHN0cmluZykge1xuXG4gICAgLy8gZ2VuZXJhdGVyIHN0YXRlXG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgc3RhdGUgPSBBcHAuZ2VuZXJhdGVTdGF0ZSgpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIHJlcXVlc3RcbiAgICB2YXIgcmVxdWVzdDtcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLnRvSnNvbigpLm9hdXRoX2Zsb3dfdHlwZSA9PSBGTE9XX1RZUEVfSU1QTElDSVQpIHtcbiAgICAgIC8vIGdlbmVyYXRlciBub25jZVxuICAgICAgaWYgKCFub25jZSkge1xuICAgICAgICBub25jZSA9IEFwcC5nZW5lcmF0ZU5vbmNlKCk7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QgPSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICAgICAgdGhpcy5jbGllbnRJZCxcbiAgICAgICAgICB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgICAgIHRoaXMuc2NvcGUsXG4gICAgICAgICAgQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9JRF9UT0tFTixcbiAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICB7J3Byb21wdCc6ICdjb25zZW50JywgJ2FjY2Vzc190eXBlJzogJ29ubGluZScsICdub25jZSc6IG5vbmNlfSk7XG4gICAgICAvLyBtYWtlIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAgICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIucGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KHRoaXMuY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XG5cbiAgICB9XG4gIH1cblxuICBjaGVja0ZvckF1dGhvcml6YXRpb25SZXNwb25zZSgpOiBQcm9taXNlPHZvaWQ+fHZvaWQge1xuXG4gICAgdmFyIGlzQXV0aFJlcXVlc3RDb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZ3VyYXRpb24udG9Kc29uKCkub2F1dGhfZmxvd190eXBlKSB7XG4gICAgICBjYXNlIEZMT1dfVFlQRV9JTVBMSUNJVDpcbiAgICAgICAgdmFyIHBhcmFtcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhsb2NhdGlvbiwgdHJ1ZSk7XG4gICAgICAgIGlzQXV0aFJlcXVlc3RDb21wbGV0ZSA9IHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnaWRfdG9rZW4nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGlzQXV0aFJlcXVlc3RDb21wbGV0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTtcblxuICAgIH1cbiAgfVxuXG4gIHNob3dNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICB9XG5cbiAgc3RhdGljIGdlbmVyYXRlTm9uY2UoKSB7XG4gICAgdmFyIG5vbmNlTGVuID0gODtcbiAgICByZXR1cm4gY3J5cHRvR2VuZXJhdGVSYW5kb20obm9uY2VMZW4pO1xuICB9XG5cbiAgc3RhdGljIGdlbmVyYXRlU3RhdGUoKSB7XG4gICAgdmFyIHN0YXRlTGVuID0gODtcbiAgICByZXR1cm4gY3J5cHRvR2VuZXJhdGVSYW5kb20oc3RhdGVMZW4pO1xuICB9XG5cbiAgcGFyc2VRdWVyeVN0cmluZyhsb2NhdGlvbjogTG9jYXRpb24sIHNwbGl0QnlIYXNoOiBib29sZWFuKTogT2JqZWN0IHtcbiAgICB2YXIgdXJsUGFyYW1zO1xuICAgIGlmIChzcGxpdEJ5SGFzaCkge1xuICAgICAgdXJsUGFyYW1zID0gbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsUGFyYW1zID0gbG9jYXRpb24uc2VhcmNoO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgLy8gaWYgYW55dGhpbmcgc3RhcnRzIHdpdGggPywgIyBvciAmIHJlbW92ZSBpdFxuICAgIHVybFBhcmFtcyA9IHVybFBhcmFtcy50cmltKCkucmVwbGFjZSgvXihcXD98I3wmKS8sICcnKTtcbiAgICBsZXQgcGFyYW1zID0gdXJsUGFyYW1zLnNwbGl0KCcmJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGxldCBwYXJhbSA9IHBhcmFtc1tpXTsgIC8vIGxvb2tzIHNvbWV0aGluZyBsaWtlIGE9YlxuICAgICAgbGV0IHBhcnRzID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPj0gMikge1xuICAgICAgICBsZXQga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzLnNoaWZ0KCkhKTtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJz0nKSA6IG51bGw7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbi8vIGV4cG9ydCBBcHBcbih3aW5kb3cgYXMgYW55KVsnQXBwJ10gPSBBcHA7XG4iXX0=