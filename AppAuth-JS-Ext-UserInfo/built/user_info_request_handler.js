"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var query_string_utils_1 = require("./query_string_utils");
var storage_1 = require("./storage");
var token_response_1 = require("./token_response");
var types_1 = require("./types");
var user_info_response_1 = require("./user_info_response");
var xhr_1 = require("./xhr");
/**
 * The default user info request handler.
 */
var BaseUserInfoRequestHandler = /** @class */ (function () {
    function BaseUserInfoRequestHandler(storageBackend) {
        if (storageBackend === void 0) { storageBackend = new storage_1.LocalStorageBackend(); }
        this.storageBackend = storageBackend;
        this.requestor = new xhr_1.JQueryRequestor();
        this.utils = new query_string_utils_1.BasicQueryStringUtils();
        this.storageBackend = storageBackend;
    }
    BaseUserInfoRequestHandler.prototype.isUserInfoResponse = function (response) {
        return response.error === undefined;
    };
    BaseUserInfoRequestHandler.prototype.performUserInfoRequest = function (configuration, request) {
        var _this = this;
        return this.storageBackend.getItem(types_1.AUTHORIZATION_RESPONSE_HANDLE_KEY).then(function (result) {
            var tokenResponseJson = JSON.parse(result);
            var tokenResponse = token_response_1.TokenResponse.fromJson(tokenResponseJson);
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
                    return Promise.reject(new errors_1.AppAuthError(response.error, user_info_response_1.UserInfoError.fromJson(response)));
                }
            });
        });
    };
    return BaseUserInfoRequestHandler;
}());
exports.BaseUserInfoRequestHandler = BaseUserInfoRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3RfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2luZm9fcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQXNDO0FBRXRDLDJEQUE2RTtBQUM3RSxxQ0FBOEQ7QUFDOUQsbURBQStDO0FBQy9DLGlDQUEwRDtBQUUxRCwyREFBOEc7QUFDOUcsNkJBQWlEO0FBZWpEOztHQUVHO0FBQ0g7SUFJRSxvQ0FBNEIsY0FBMEQ7UUFBMUQsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFBMUQsbUJBQWMsR0FBZCxjQUFjLENBQTRDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBZSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDBDQUFxQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVPLHVEQUFrQixHQUExQixVQUEyQixRQUNpQjtRQUMxQyxPQUFRLFFBQThCLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsMkRBQXNCLEdBQXRCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBeUI7UUFGN0IsaUJBd0JDO1FBckJDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMseUNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQy9FLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLGFBQWEsR0FBRyw4QkFBYSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRTlELElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQXlDO2dCQUNoRixHQUFHLEVBQUUsYUFBYSxDQUFDLGdCQUFnQjtnQkFDbkMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUM7YUFDbEUsQ0FBQyxDQUFDO1lBRUgsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUNuQyxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDckMsT0FBTyxxQ0FBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsSUFBSSxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsa0NBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN6RTtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsaUNBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7TG9jYWxTdG9yYWdlQmFja2VuZCwgU3RvcmFnZUJhY2tlbmR9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQge1Rva2VuUmVzcG9uc2V9IGZyb20gJy4vdG9rZW5fcmVzcG9uc2UnO1xuaW1wb3J0IHtBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVl9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtVc2VySW5mb1JlcXVlc3R9IGZyb20gJy4vdXNlcl9pbmZvX3JlcXVlc3QnO1xuaW1wb3J0IHtVc2VySW5mb0Vycm9yLCBVc2VySW5mb0Vycm9ySnNvbiwgVXNlckluZm9SZXNwb25zZSwgVXNlckluZm9SZXNwb25zZUpzb259IGZyb20gJy4vdXNlcl9pbmZvX3Jlc3BvbnNlJztcbmltcG9ydCB7SlF1ZXJ5UmVxdWVzdG9yLCBSZXF1ZXN0b3J9IGZyb20gJy4veGhyJztcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugd2hpY2ggaXMgY2FwYWJsZSBvZiBoYW5kbGluZyBhbiB1c2VyIGluZm8gcmVxdWVzdFxuICogdXNpbmcgdmFyaW91cyBtZXRob2RzIChpZnJhbWUgLyBwb3B1cCAvIGRpZmZlcmVudCBwcm9jZXNzIGV0Yy4pLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvUmVxdWVzdEhhbmRsZXIge1xuICAvKipcbiAgICogTWFrZXMgYW4gVXNlckluZm8gcmVxdWVzdC5cbiAgICovXG4gIHBlcmZvcm1Vc2VySW5mb1JlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0PzogVXNlckluZm9SZXF1ZXN0KTogUHJvbWlzZTxVc2VySW5mb1Jlc3BvbnNlPjtcbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB1c2VyIGluZm8gcmVxdWVzdCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZVVzZXJJbmZvUmVxdWVzdEhhbmRsZXIgaW1wbGVtZW50cyBVc2VySW5mb1JlcXVlc3RIYW5kbGVyIHtcbiAgcHVibGljIHJlYWRvbmx5IHJlcXVlc3RvcjogUmVxdWVzdG9yO1xuICBwdWJsaWMgcmVhZG9ubHkgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHNcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgc3RvcmFnZUJhY2tlbmQ6IFN0b3JhZ2VCYWNrZW5kID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKSkge1xuICAgIHRoaXMucmVxdWVzdG9yID0gbmV3IEpRdWVyeVJlcXVlc3RvcigpO1xuICAgIHRoaXMudXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCk7XG4gICAgdGhpcy5zdG9yYWdlQmFja2VuZCA9IHN0b3JhZ2VCYWNrZW5kO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1VzZXJJbmZvUmVzcG9uc2UocmVzcG9uc2U6IFVzZXJJbmZvUmVzcG9uc2VKc29ufFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VySW5mb0Vycm9ySnNvbik6IHJlc3BvbnNlIGlzIFVzZXJJbmZvUmVzcG9uc2VKc29uIHtcbiAgICByZXR1cm4gKHJlc3BvbnNlIGFzIFVzZXJJbmZvRXJyb3JKc29uKS5lcnJvciA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcGVyZm9ybVVzZXJJbmZvUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q/OiBVc2VySW5mb1JlcXVlc3QpOiBQcm9taXNlPFVzZXJJbmZvUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZC5nZXRJdGVtKEFVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgdmFyIHRva2VuUmVzcG9uc2VKc29uID0gSlNPTi5wYXJzZShyZXN1bHQhKTtcbiAgICAgIHZhciB0b2tlblJlc3BvbnNlID0gVG9rZW5SZXNwb25zZS5mcm9tSnNvbih0b2tlblJlc3BvbnNlSnNvbik7XG5cbiAgICAgIGxldCB1c2VySW5mb1Jlc3BvbnNlID0gdGhpcy5yZXF1ZXN0b3IueGhyPFVzZXJJbmZvUmVzcG9uc2VKc29ufFVzZXJJbmZvRXJyb3JKc29uPih7XG4gICAgICAgIHVybDogY29uZmlndXJhdGlvbi51c2VySW5mb0VuZHBvaW50LFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICAgIGhlYWRlcnM6IHsnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuUmVzcG9uc2UuYWNjZXNzVG9rZW59XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHVzZXJJbmZvUmVzcG9uc2UudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzVXNlckluZm9SZXNwb25zZShyZXNwb25zZSkpIHtcbiAgICAgICAgICByZXR1cm4gVXNlckluZm9SZXNwb25zZS5mcm9tSnNvbihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0PFVzZXJJbmZvUmVzcG9uc2U+KFxuICAgICAgICAgICAgICBuZXcgQXBwQXV0aEVycm9yKHJlc3BvbnNlLmVycm9yLCBVc2VySW5mb0Vycm9yLmZyb21Kc29uKHJlc3BvbnNlKSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19