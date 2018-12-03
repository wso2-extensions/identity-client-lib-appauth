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
var user_info_response_1 = require("./user_info_response");
/**
 * The default user info request handler.
 */
var BaseUserInfoRequestHandler = /** @class */ (function () {
    function BaseUserInfoRequestHandler(storageBackend) {
        if (storageBackend === void 0) { storageBackend = new appauth_1.LocalStorageBackend(); }
        this.storageBackend = storageBackend;
        this.requestor = new appauth_1.JQueryRequestor();
        this.utils = new appauth_1.BasicQueryStringUtils();
        this.storageBackend = storageBackend;
    }
    BaseUserInfoRequestHandler.prototype.isUserInfoResponse = function (response) {
        return response.error === undefined;
    };
    BaseUserInfoRequestHandler.prototype.performUserInfoRequest = function (configuration, request) {
        var _this = this;
        return this.storageBackend.getItem(appauth_1.AUTHORIZATION_RESPONSE_HANDLE_KEY).then(function (result) {
            var tokenResponseJson = JSON.parse(result);
            var tokenResponse = appauth_1.TokenResponse.fromJson(tokenResponseJson);
            var userInfoResponse = _this.requestor.xhr({
                url: configuration.userInfoEndpoint,
                method: 'POST',
                dataType: 'json',
                crossDomain: true,
                headers: { 'Authorization': 'Bearer ' + tokenResponse.accessToken }
            });
            return userInfoResponse.then(function (response) {
                if (_this.isUserInfoResponse(response)) {
                    return user_info_response_1.UserInfoResponse.fromJson(response);
                }
                else {
                    return Promise.reject(new appauth_1.AppAuthError(response.error, user_info_response_1.UserInfoError.fromJson(response)));
                }
            });
        });
    };
    return BaseUserInfoRequestHandler;
}());
exports.BaseUserInfoRequestHandler = BaseUserInfoRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3RfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2luZm9fcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRzs7QUFFSCwyQ0FBNE87QUFFNU8sMkRBQThHO0FBZTlHOztHQUVHO0FBQ0g7SUFJRSxvQ0FBNEIsY0FBMEQ7UUFBMUQsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFBMUQsbUJBQWMsR0FBZCxjQUFjLENBQTRDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx5QkFBZSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLCtCQUFxQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVPLHVEQUFrQixHQUExQixVQUEyQixRQUNpQjtRQUMxQyxPQUFRLFFBQThCLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsMkRBQXNCLEdBQXRCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBeUI7UUFGN0IsaUJBd0JDO1FBckJDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsMkNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQy9FLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLGFBQWEsR0FBRyx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRTlELElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQXlDO2dCQUNoRixHQUFHLEVBQUUsYUFBYSxDQUFDLGdCQUFnQjtnQkFDbkMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUM7YUFDbEUsQ0FBQyxDQUFDO1lBRUgsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUNuQyxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDckMsT0FBTyxxQ0FBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsSUFBSSxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsa0NBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN6RTtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsaUNBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTgsIFdTTzIgSW5jLiAoaHR0cDovL3d3dy53c28yLm9yZykgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBXU08yIEluYy4gbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsXG4gKiBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXBwQXV0aEVycm9yLCBBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVksIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgQmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBKUXVlcnlSZXF1ZXN0b3IsIExvY2FsU3RvcmFnZUJhY2tlbmQsIFF1ZXJ5U3RyaW5nVXRpbHMsIFJlcXVlc3RvciwgU3RvcmFnZUJhY2tlbmQsIFRva2VuUmVzcG9uc2V9IGZyb20gJ0BvcGVuaWQvYXBwYXV0aCc7XG5pbXBvcnQge1VzZXJJbmZvUmVxdWVzdH0gZnJvbSAnLi91c2VyX2luZm9fcmVxdWVzdCc7XG5pbXBvcnQge1VzZXJJbmZvRXJyb3IsIFVzZXJJbmZvRXJyb3JKc29uLCBVc2VySW5mb1Jlc3BvbnNlLCBVc2VySW5mb1Jlc3BvbnNlSnNvbn0gZnJvbSAnLi91c2VyX2luZm9fcmVzcG9uc2UnO1xuXG4vKipcbiAqIERlZmluZXMgdGhlIGludGVyZmFjZSB3aGljaCBpcyBjYXBhYmxlIG9mIGhhbmRsaW5nIGFuIHVzZXIgaW5mbyByZXF1ZXN0XG4gKiB1c2luZyB2YXJpb3VzIG1ldGhvZHMgKGlmcmFtZSAvIHBvcHVwIC8gZGlmZmVyZW50IHByb2Nlc3MgZXRjLikuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9SZXF1ZXN0SGFuZGxlciB7XG4gIC8qKlxuICAgKiBNYWtlcyBhbiBVc2VySW5mbyByZXF1ZXN0LlxuICAgKi9cbiAgcGVyZm9ybVVzZXJJbmZvUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q/OiBVc2VySW5mb1JlcXVlc3QpOiBQcm9taXNlPFVzZXJJbmZvUmVzcG9uc2U+O1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHVzZXIgaW5mbyByZXF1ZXN0IGhhbmRsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlVXNlckluZm9SZXF1ZXN0SGFuZGxlciBpbXBsZW1lbnRzIFVzZXJJbmZvUmVxdWVzdEhhbmRsZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdG9yOiBSZXF1ZXN0b3I7XG4gIHB1YmxpYyByZWFkb25seSB1dGlsczogUXVlcnlTdHJpbmdVdGlsc1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzdG9yYWdlQmFja2VuZDogU3RvcmFnZUJhY2tlbmQgPSBuZXcgTG9jYWxTdG9yYWdlQmFja2VuZCgpKSB7XG4gICAgdGhpcy5yZXF1ZXN0b3IgPSBuZXcgSlF1ZXJ5UmVxdWVzdG9yKCk7XG4gICAgdGhpcy51dGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKTtcbiAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kID0gc3RvcmFnZUJhY2tlbmQ7XG4gIH1cblxuICBwcml2YXRlIGlzVXNlckluZm9SZXNwb25zZShyZXNwb25zZTogVXNlckluZm9SZXNwb25zZUpzb258XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJJbmZvRXJyb3JKc29uKTogcmVzcG9uc2UgaXMgVXNlckluZm9SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiAocmVzcG9uc2UgYXMgVXNlckluZm9FcnJvckpzb24pLmVycm9yID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwZXJmb3JtVXNlckluZm9SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdD86IFVzZXJJbmZvUmVxdWVzdCk6IFByb21pc2U8VXNlckluZm9SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kLmdldEl0ZW0oQVVUSE9SSVpBVElPTl9SRVNQT05TRV9IQU5ETEVfS0VZKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICB2YXIgdG9rZW5SZXNwb25zZUpzb24gPSBKU09OLnBhcnNlKHJlc3VsdCEpO1xuICAgICAgdmFyIHRva2VuUmVzcG9uc2UgPSBUb2tlblJlc3BvbnNlLmZyb21Kc29uKHRva2VuUmVzcG9uc2VKc29uKTtcblxuICAgICAgbGV0IHVzZXJJbmZvUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8VXNlckluZm9SZXNwb25zZUpzb258VXNlckluZm9FcnJvckpzb24+KHtcbiAgICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnVzZXJJbmZvRW5kcG9pbnQsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgICAgaGVhZGVyczogeydBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5SZXNwb25zZS5hY2Nlc3NUb2tlbn1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdXNlckluZm9SZXNwb25zZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNVc2VySW5mb1Jlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgICAgIHJldHVybiBVc2VySW5mb1Jlc3BvbnNlLmZyb21Kc29uKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8VXNlckluZm9SZXNwb25zZT4oXG4gICAgICAgICAgICAgIG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2UuZXJyb3IsIFVzZXJJbmZvRXJyb3IuZnJvbUpzb24ocmVzcG9uc2UpKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=