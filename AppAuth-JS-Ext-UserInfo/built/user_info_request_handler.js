"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appauth_1 = require("@openid/appauth");
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
                    return appauth_1.UserInfoResponse.fromJson(response);
                }
                else {
                    return Promise.reject(new appauth_1.AppAuthError(response.error, appauth_1.UserInfoError.fromJson(response)));
                }
            });
        });
    };
    return BaseUserInfoRequestHandler;
}());
exports.BaseUserInfoRequestHandler = BaseUserInfoRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3RfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2luZm9fcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTRVO0FBZTVVOztHQUVHO0FBQ0g7SUFJRSxvQ0FBNEIsY0FBMEQ7UUFBMUQsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFBMUQsbUJBQWMsR0FBZCxjQUFjLENBQTRDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx5QkFBZSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLCtCQUFxQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVPLHVEQUFrQixHQUExQixVQUEyQixRQUNpQjtRQUMxQyxPQUFRLFFBQThCLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsMkRBQXNCLEdBQXRCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBeUI7UUFGN0IsaUJBd0JDO1FBckJDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsMkNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQy9FLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLGFBQWEsR0FBRyx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRTlELElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQXlDO2dCQUNoRixHQUFHLEVBQUUsYUFBYSxDQUFDLGdCQUFnQjtnQkFDbkMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUM7YUFDbEUsQ0FBQyxDQUFDO1lBRUgsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUNuQyxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDckMsT0FBTywwQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsSUFBSSxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsdUJBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN6RTtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsaUNBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwQXV0aEVycm9yLCBBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVksIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgQmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBKUXVlcnlSZXF1ZXN0b3IsIExvY2FsU3RvcmFnZUJhY2tlbmQsIGxvZywgUXVlcnlTdHJpbmdVdGlscywgUmVxdWVzdG9yLCBTdG9yYWdlQmFja2VuZCwgVG9rZW5SZXNwb25zZSwgVXNlckluZm9FcnJvciwgVXNlckluZm9FcnJvckpzb24sIFVzZXJJbmZvUmVxdWVzdCwgVXNlckluZm9SZXNwb25zZSwgVXNlckluZm9SZXNwb25zZUpzb259IGZyb20gJ0BvcGVuaWQvYXBwYXV0aCc7XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgaW50ZXJmYWNlIHdoaWNoIGlzIGNhcGFibGUgb2YgaGFuZGxpbmcgYW4gdXNlciBpbmZvIHJlcXVlc3RcbiAqIHVzaW5nIHZhcmlvdXMgbWV0aG9kcyAoaWZyYW1lIC8gcG9wdXAgLyBkaWZmZXJlbnQgcHJvY2VzcyBldGMuKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1JlcXVlc3RIYW5kbGVyIHtcbiAgLyoqXG4gICAqIE1ha2VzIGFuIFVzZXJJbmZvIHJlcXVlc3QuXG4gICAqL1xuICBwZXJmb3JtVXNlckluZm9SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdD86IFVzZXJJbmZvUmVxdWVzdCk6IFByb21pc2U8VXNlckluZm9SZXNwb25zZT47XG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgdXNlciBpbmZvIHJlcXVlc3QgaGFuZGxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VVc2VySW5mb1JlcXVlc3RIYW5kbGVyIGltcGxlbWVudHMgVXNlckluZm9SZXF1ZXN0SGFuZGxlciB7XG4gIHB1YmxpYyByZWFkb25seSByZXF1ZXN0b3I6IFJlcXVlc3RvcjtcbiAgcHVibGljIHJlYWRvbmx5IHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzXG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCkpIHtcbiAgICB0aGlzLnJlcXVlc3RvciA9IG5ldyBKUXVlcnlSZXF1ZXN0b3IoKTtcbiAgICB0aGlzLnV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpO1xuICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQgPSBzdG9yYWdlQmFja2VuZDtcbiAgfVxuXG4gIHByaXZhdGUgaXNVc2VySW5mb1Jlc3BvbnNlKHJlc3BvbnNlOiBVc2VySW5mb1Jlc3BvbnNlSnNvbnxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlckluZm9FcnJvckpzb24pOiByZXNwb25zZSBpcyBVc2VySW5mb1Jlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIChyZXNwb25zZSBhcyBVc2VySW5mb0Vycm9ySnNvbikuZXJyb3IgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHBlcmZvcm1Vc2VySW5mb1JlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0PzogVXNlckluZm9SZXF1ZXN0KTogUHJvbWlzZTxVc2VySW5mb1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHZhciB0b2tlblJlc3BvbnNlSnNvbiA9IEpTT04ucGFyc2UocmVzdWx0ISk7XG4gICAgICB2YXIgdG9rZW5SZXNwb25zZSA9IFRva2VuUmVzcG9uc2UuZnJvbUpzb24odG9rZW5SZXNwb25zZUpzb24pO1xuXG4gICAgICBsZXQgdXNlckluZm9SZXNwb25zZSA9IHRoaXMucmVxdWVzdG9yLnhocjxVc2VySW5mb1Jlc3BvbnNlSnNvbnxVc2VySW5mb0Vycm9ySnNvbj4oe1xuICAgICAgICB1cmw6IGNvbmZpZ3VyYXRpb24udXNlckluZm9FbmRwb2ludCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgICAgICBoZWFkZXJzOiB7J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblJlc3BvbnNlLmFjY2Vzc1Rva2VufVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1c2VySW5mb1Jlc3BvbnNlLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc1VzZXJJbmZvUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgICAgcmV0dXJuIFVzZXJJbmZvUmVzcG9uc2UuZnJvbUpzb24ocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxVc2VySW5mb1Jlc3BvbnNlPihcbiAgICAgICAgICAgICAgbmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5lcnJvciwgVXNlckluZm9FcnJvci5mcm9tSnNvbihyZXNwb25zZSkpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==