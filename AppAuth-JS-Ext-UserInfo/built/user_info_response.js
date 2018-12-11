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
/**
 * Represents the UserInfo Response type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse
 *
 * TODO: UserInfo response vlidation as of
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponseValidation
 */
var UserInfoResponse = /** @class */ (function () {
    function UserInfoResponse(sub, name, given_name, family_name, preferred_username, email, picture) {
        this.sub = sub;
        this.name = name;
        this.given_name = given_name;
        this.family_name = family_name;
        this.preferred_username = preferred_username;
        this.email = email;
        this.picture = picture;
    }
    UserInfoResponse.prototype.toJson = function () {
        return {
            sub: this.sub,
            name: this.name,
            given_name: this.given_name,
            family_name: this.family_name,
            preferred_username: this.preferred_username,
            email: this.email,
            picture: this.picture
        };
    };
    UserInfoResponse.fromJson = function (input) {
        return new UserInfoResponse(input.sub, input.name, input.given_name, input.family_name, input.preferred_username, input.email, input.picture);
    };
    return UserInfoResponse;
}());
exports.UserInfoResponse = UserInfoResponse;
/**
 * Represents the UserInfo Error type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoError
 */
var UserInfoError = /** @class */ (function () {
    function UserInfoError(error, errorDescription) {
        this.error = error;
        this.errorDescription = errorDescription;
    }
    UserInfoError.prototype.toJson = function () {
        return {
            error: this.error, error_description: this.errorDescription
        };
    };
    UserInfoError.fromJson = function (input) {
        return new UserInfoError(input.error, input.error_description);
    };
    return UserInfoError;
}());
exports.UserInfoError = UserInfoError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZXJfaW5mb19yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7O0FBOEJIOzs7Ozs7O0dBT0c7QUFDSDtJQUNFLDBCQUNXLEdBQVcsRUFDWCxJQUFZLEVBQ1osVUFBa0IsRUFDbEIsV0FBbUIsRUFDbkIsa0JBQTBCLEVBQzFCLEtBQWEsRUFDYixPQUFlO1FBTmYsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUTtRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUFHLENBQUM7SUFFOUIsaUNBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVNLHlCQUFRLEdBQWYsVUFBZ0IsS0FBMkI7UUFDekMsT0FBTyxJQUFJLGdCQUFnQixDQUN2QixLQUFLLENBQUMsR0FBRyxFQUNULEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLFdBQVcsRUFDakIsS0FBSyxDQUFDLGtCQUFrQixFQUN4QixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBaENZLDRDQUFnQjtBQWtDN0I7Ozs7R0FJRztBQUNIO0lBQ0UsdUJBQTRCLEtBQXdCLEVBQWtCLGdCQUF5QjtRQUFuRSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFrQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7SUFDL0YsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtTQUM1RCxDQUFBO0lBQ0gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsS0FBd0I7UUFDdEMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE4LCBXU08yIEluYy4gKGh0dHA6Ly93d3cud3NvMi5vcmcpIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogV1NPMiBJbmMuIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLFxuICogVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFVzZXJJbmZvUmVzcG9uc2UgYXMgYSBKU09OIE9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1Jlc3BvbnNlSnNvbiB7XG4gIHN1Yjogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7IC8qIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjVXNlckluZm8gKi9cbiAgZ2l2ZW5fbmFtZTogc3RyaW5nO1xuICBmYW1pbHlfbmFtZTogc3RyaW5nO1xuICBwcmVmZXJyZWRfdXNlcm5hbWU6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgcGljdHVyZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBvc3NpYmxlIGVycm9yIGNvZGVzIGZyb20gdGhlIHVzZXJJbmZvIGVuZHBvaW50LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjVXNlckluZm9FcnJvclxuICovXG5leHBvcnQgdHlwZSBVc2VySW5mb0Vycm9yVHlwZSA9ICdpbnZhbGlkX3Rva2VuJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBVc2VySW5mb0Vycm9yIGFzIGEgSlNPTiBPYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9FcnJvckpzb24ge1xuICBlcnJvcjogVXNlckluZm9FcnJvclR5cGU7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFVzZXJJbmZvIFJlc3BvbnNlIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNVc2VySW5mb1Jlc3BvbnNlXG4gKlxuICogVE9ETzogVXNlckluZm8gcmVzcG9uc2UgdmxpZGF0aW9uIGFzIG9mXG4gKiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1VzZXJJbmZvUmVzcG9uc2VWYWxpZGF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VySW5mb1Jlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgc3ViOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIGdpdmVuX25hbWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBmYW1pbHlfbmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHByZWZlcnJlZF91c2VybmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIGVtYWlsOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcGljdHVyZTogc3RyaW5nKSB7fVxuXG4gIHRvSnNvbigpOiBVc2VySW5mb1Jlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1YjogdGhpcy5zdWIsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBnaXZlbl9uYW1lOiB0aGlzLmdpdmVuX25hbWUsXG4gICAgICBmYW1pbHlfbmFtZTogdGhpcy5mYW1pbHlfbmFtZSxcbiAgICAgIHByZWZlcnJlZF91c2VybmFtZTogdGhpcy5wcmVmZXJyZWRfdXNlcm5hbWUsXG4gICAgICBlbWFpbDogdGhpcy5lbWFpbCxcbiAgICAgIHBpY3R1cmU6IHRoaXMucGljdHVyZVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFVzZXJJbmZvUmVzcG9uc2VKc29uKTogVXNlckluZm9SZXNwb25zZSB7XG4gICAgcmV0dXJuIG5ldyBVc2VySW5mb1Jlc3BvbnNlKFxuICAgICAgICBpbnB1dC5zdWIsXG4gICAgICAgIGlucHV0Lm5hbWUsXG4gICAgICAgIGlucHV0LmdpdmVuX25hbWUsXG4gICAgICAgIGlucHV0LmZhbWlseV9uYW1lLFxuICAgICAgICBpbnB1dC5wcmVmZXJyZWRfdXNlcm5hbWUsXG4gICAgICAgIGlucHV0LmVtYWlsLFxuICAgICAgICBpbnB1dC5waWN0dXJlKVxuICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVXNlckluZm8gRXJyb3IgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1VzZXJJbmZvRXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXJJbmZvRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IFVzZXJJbmZvRXJyb3JUeXBlLCBwdWJsaWMgcmVhZG9ubHkgZXJyb3JEZXNjcmlwdGlvbj86IHN0cmluZykge1xuICB9XG5cbiAgdG9Kc29uKCk6IFVzZXJJbmZvRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb25cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFVzZXJJbmZvRXJyb3JKc29uKSB7XG4gICAgcmV0dXJuIG5ldyBVc2VySW5mb0Vycm9yKGlucHV0LmVycm9yLCBpbnB1dC5lcnJvcl9kZXNjcmlwdGlvbik7XG4gIH1cbn1cbiJdfQ==