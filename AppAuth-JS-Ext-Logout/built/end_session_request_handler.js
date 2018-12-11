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
 * EndSession Service notifier.
 * This manages the communication of the EndSessionResponse to the 3p client.
 */
var EndSessionNotifier = /** @class */ (function () {
    function EndSessionNotifier() {
        this.listener = null;
    }
    EndSessionNotifier.prototype.setEndSessionListener = function (listener) {
        this.listener = listener;
    };
    /**
     * The endsession complete callback.
     */
    EndSessionNotifier.prototype.onEndSessionComplete = function (request, response, error) {
        if (this.listener) {
            // complete endsession request
            this.listener(request, response, error);
        }
    };
    return EndSessionNotifier;
}());
exports.EndSessionNotifier = EndSessionNotifier;
// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
exports.ENDSESSION_BUILT_IN_PARAMETERS = ['id_token_hint', 'post_logout_redirect_uri', 'state'];
/**
 * Defines the interface which is capable of handling an endsession request
 * using various methods (iframe / popup / different process etc.).
 */
var EndSessionRequestHandler = /** @class */ (function () {
    function EndSessionRequestHandler(utils, generateRandom) {
        this.utils = utils;
        this.generateRandom = generateRandom;
        // notifier send the response back to the client.
        this.notifier = null;
    }
    /**
     * A utility method to be able to build the endsession request URL.
     */
    EndSessionRequestHandler.prototype.buildRequestUrl = function (configuration, request) {
        // build the query string
        // coerce to any type for convenience
        var requestMap = {
            'id_token_hint': request.idTokenHint,
            'post_logout_redirect_uri': request.postLogoutRedirectUri,
            'state': request.state
        };
        // copy over extras
        if (request.extras) {
            for (var extra in request.extras) {
                if (request.extras.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    if (exports.ENDSESSION_BUILT_IN_PARAMETERS.indexOf(extra) < 0) {
                        requestMap[extra] = request.extras[extra];
                    }
                }
            }
        }
        var query = this.utils.stringify(requestMap);
        var baseUrl = configuration.endSessionEndpoint; // TBD - should throw if no url is available at OP
        var url = baseUrl + "?" + query;
        return url;
    };
    /**
     * Completes the endsession request if necessary & when possible.
     */
    EndSessionRequestHandler.prototype.completeEndSessionRequestIfPossible = function () {
        var _this = this;
        // call complete endsession if possible to see there might
        // be a response that needs to be delivered.
        appauth_1.log("Checking to see if there is an endsession response to be delivered.");
        if (!this.notifier) {
            appauth_1.log("Notifier is not present on EndSessionRequest handler.\n          No delivery of result will be possible");
        }
        return this.completeEndSessionRequest().then(function (result) {
            if (!result) {
                appauth_1.log("No result is available yet.");
            }
            if (result && _this.notifier) {
                _this.notifier.onEndSessionComplete(result.request, result.response, result.error);
            }
        });
    };
    /**
     * Sets the default EndSession Service notifier.
     */
    EndSessionRequestHandler.prototype.setEndSessionNotifier = function (notifier) {
        this.notifier = notifier;
        return this;
    };
    ;
    return EndSessionRequestHandler;
}());
exports.EndSessionRequestHandler = EndSessionRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuZF9zZXNzaW9uX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7O0FBRUgsMkNBQXFIO0FBc0JySDs7O0dBR0c7QUFDSDtJQUFBO1FBQ1UsYUFBUSxHQUE0QixJQUFJLENBQUM7SUFrQm5ELENBQUM7SUFoQkMsa0RBQXFCLEdBQXJCLFVBQXNCLFFBQTRCO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILGlEQUFvQixHQUFwQixVQUNJLE9BQTBCLEVBQzFCLFFBQWlDLEVBQ2pDLEtBQTJCO1FBQzdCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQiw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxnREFBa0I7QUFxQi9CLGlEQUFpRDtBQUNqRCwwQkFBMEI7QUFDYixRQUFBLDhCQUE4QixHQUN2QyxDQUFDLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUUzRDs7O0dBR0c7QUFDSDtJQUNFLGtDQUFtQixLQUF1QixFQUFZLGNBQStCO1FBQWxFLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVksbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBRXJGLGlEQUFpRDtRQUN2QyxhQUFRLEdBQTRCLElBQUksQ0FBQztJQUhxQyxDQUFDO0lBS3pGOztPQUVHO0lBQ08sa0RBQWUsR0FBekIsVUFDSSxhQUFnRCxFQUNoRCxPQUEwQjtRQUM1Qix5QkFBeUI7UUFDekIscUNBQXFDO1FBQ3JDLElBQUksVUFBVSxHQUFjO1lBQzFCLGVBQWUsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNwQywwQkFBMEIsRUFBRSxPQUFPLENBQUMscUJBQXFCO1lBQ3pELE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztTQUN2QixDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixLQUFLLElBQUksS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hDLHVDQUF1QztvQkFDdkMsSUFBSSxzQ0FBOEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNyRCxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQ1AsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUUsa0RBQWtEO1FBQ3pGLElBQUksR0FBRyxHQUFNLE9BQU8sU0FBSSxLQUFPLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSCxzRUFBbUMsR0FBbkM7UUFBQSxpQkFnQkM7UUFmQywwREFBMEQ7UUFDMUQsNENBQTRDO1FBQzVDLGFBQUcsQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLGFBQUcsQ0FBQyx5R0FDdUMsQ0FBQyxDQUFBO1NBQzdDO1FBQ0QsT0FBTyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ2pELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsYUFBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLE1BQU0sSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILHdEQUFxQixHQUFyQixVQUFzQixRQUE0QjtRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQSxDQUFDO0lBZUosK0JBQUM7QUFBRCxDQUFDLEFBakZELElBaUZDO0FBakZxQiw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE4LCBXU08yIEluYy4gKGh0dHA6Ly93d3cud3NvMi5vcmcpIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogV1NPMiBJbmMuIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLFxuICogVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgbG9nLCBRdWVyeVN0cmluZ1V0aWxzLCBSYW5kb21HZW5lcmF0b3IsIFN0cmluZ01hcH0gZnJvbSAnQG9wZW5pZC9hcHBhdXRoJztcblxuaW1wb3J0IHtFbmRTZXNzaW9uUmVxdWVzdH0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXF1ZXN0JztcbmltcG9ydCB7RW5kU2Vzc2lvbkVycm9yLCBFbmRTZXNzaW9uUmVzcG9uc2V9IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVzcG9uc2UnO1xuXG4vKipcbiAqIFRoaXMgdHlwZSByZXByZXNlbnRzIGEgbGFtYmRhIHRoYXQgY2FuIHRha2UgYW4gRW5kU2Vzc2lvblJlcXVlc3QsXG4gKiBhbmQgYW4gRW5kU2Vzc2lvblJlc3BvbnNlIGFzIGFyZ3VtZW50cy5cbiAqL1xuZXhwb3J0IHR5cGUgRW5kU2Vzc2lvbkxpc3RlbmVyID1cbiAgICAocmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QsIHJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8bnVsbCwgZXJyb3I6IEVuZFNlc3Npb25FcnJvcnxudWxsKSA9PlxuICAgICAgICB2b2lkO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdHJ1Y3R1cmFsIHR5cGUgaG9sZGluZyBib3RoIGVuZCBzZXNzaW9uIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2Uge1xuICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdDtcbiAgcmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxudWxsO1xuICBlcnJvcjogRW5kU2Vzc2lvbkVycm9yfG51bGw7XG59XG5cbi8qKlxuICogRW5kU2Vzc2lvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICogVGhpcyBtYW5hZ2VzIHRoZSBjb21tdW5pY2F0aW9uIG9mIHRoZSBFbmRTZXNzaW9uUmVzcG9uc2UgdG8gdGhlIDNwIGNsaWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEVuZFNlc3Npb25Ob3RpZmllciB7XG4gIHByaXZhdGUgbGlzdGVuZXI6IEVuZFNlc3Npb25MaXN0ZW5lcnxudWxsID0gbnVsbDtcblxuICBzZXRFbmRTZXNzaW9uTGlzdGVuZXIobGlzdGVuZXI6IEVuZFNlc3Npb25MaXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZW5kc2Vzc2lvbiBjb21wbGV0ZSBjYWxsYmFjay5cbiAgICovXG4gIG9uRW5kU2Vzc2lvbkNvbXBsZXRlKFxuICAgICAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QsXG4gICAgICByZXNwb25zZTogRW5kU2Vzc2lvblJlc3BvbnNlfG51bGwsXG4gICAgICBlcnJvcjogRW5kU2Vzc2lvbkVycm9yfG51bGwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcikge1xuICAgICAgLy8gY29tcGxldGUgZW5kc2Vzc2lvbiByZXF1ZXN0XG4gICAgICB0aGlzLmxpc3RlbmVyKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbi8vIFRPRE8ocmFodWxyYXZAKTogYWRkIG1vcmUgYnVpbHQgaW4gcGFyYW1ldGVycy5cbi8qIGJ1aWx0IGluIHBhcmFtZXRlcnMuICovXG5leHBvcnQgY29uc3QgRU5EU0VTU0lPTl9CVUlMVF9JTl9QQVJBTUVURVJTID1cbiAgICBbJ2lkX3Rva2VuX2hpbnQnLCAncG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpJywgJ3N0YXRlJ107XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgaW50ZXJmYWNlIHdoaWNoIGlzIGNhcGFibGUgb2YgaGFuZGxpbmcgYW4gZW5kc2Vzc2lvbiByZXF1ZXN0XG4gKiB1c2luZyB2YXJpb3VzIG1ldGhvZHMgKGlmcmFtZSAvIHBvcHVwIC8gZGlmZmVyZW50IHByb2Nlc3MgZXRjLikuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMsIHByb3RlY3RlZCBnZW5lcmF0ZVJhbmRvbTogUmFuZG9tR2VuZXJhdG9yKSB7fVxuXG4gIC8vIG5vdGlmaWVyIHNlbmQgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlIGNsaWVudC5cbiAgcHJvdGVjdGVkIG5vdGlmaWVyOiBFbmRTZXNzaW9uTm90aWZpZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEEgdXRpbGl0eSBtZXRob2QgdG8gYmUgYWJsZSB0byBidWlsZCB0aGUgZW5kc2Vzc2lvbiByZXF1ZXN0IFVSTC5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFJlcXVlc3RVcmwoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCkge1xuICAgIC8vIGJ1aWxkIHRoZSBxdWVyeSBzdHJpbmdcbiAgICAvLyBjb2VyY2UgdG8gYW55IHR5cGUgZm9yIGNvbnZlbmllbmNlXG4gICAgbGV0IHJlcXVlc3RNYXA6IFN0cmluZ01hcCA9IHtcbiAgICAgICdpZF90b2tlbl9oaW50JzogcmVxdWVzdC5pZFRva2VuSGludCxcbiAgICAgICdwb3N0X2xvZ291dF9yZWRpcmVjdF91cmknOiByZXF1ZXN0LnBvc3RMb2dvdXRSZWRpcmVjdFVyaSxcbiAgICAgICdzdGF0ZSc6IHJlcXVlc3Quc3RhdGVcbiAgICB9O1xuXG4gICAgLy8gY29weSBvdmVyIGV4dHJhc1xuICAgIGlmIChyZXF1ZXN0LmV4dHJhcykge1xuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gcmVxdWVzdC5leHRyYXMpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuZXh0cmFzLmhhc093blByb3BlcnR5KGV4dHJhKSkge1xuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxuICAgICAgICAgIGlmIChFTkRTRVNTSU9OX0JVSUxUX0lOX1BBUkFNRVRFUlMuaW5kZXhPZihleHRyYSkgPCAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0TWFwW2V4dHJhXSA9IHJlcXVlc3QuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlcnkgPSB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0TWFwKTtcbiAgICBsZXQgYmFzZVVybCA9XG4gICAgICAgIGNvbmZpZ3VyYXRpb24uZW5kU2Vzc2lvbkVuZHBvaW50OyAgLy8gVEJEIC0gc2hvdWxkIHRocm93IGlmIG5vIHVybCBpcyBhdmFpbGFibGUgYXQgT1BcbiAgICBsZXQgdXJsID0gYCR7YmFzZVVybH0/JHtxdWVyeX1gO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGxldGVzIHRoZSBlbmRzZXNzaW9uIHJlcXVlc3QgaWYgbmVjZXNzYXJ5ICYgd2hlbiBwb3NzaWJsZS5cbiAgICovXG4gIGNvbXBsZXRlRW5kU2Vzc2lvblJlcXVlc3RJZlBvc3NpYmxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGNhbGwgY29tcGxldGUgZW5kc2Vzc2lvbiBpZiBwb3NzaWJsZSB0byBzZWUgdGhlcmUgbWlnaHRcbiAgICAvLyBiZSBhIHJlc3BvbnNlIHRoYXQgbmVlZHMgdG8gYmUgZGVsaXZlcmVkLlxuICAgIGxvZyhgQ2hlY2tpbmcgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGVuZHNlc3Npb24gcmVzcG9uc2UgdG8gYmUgZGVsaXZlcmVkLmApO1xuICAgIGlmICghdGhpcy5ub3RpZmllcikge1xuICAgICAgbG9nKGBOb3RpZmllciBpcyBub3QgcHJlc2VudCBvbiBFbmRTZXNzaW9uUmVxdWVzdCBoYW5kbGVyLlxuICAgICAgICAgIE5vIGRlbGl2ZXJ5IG9mIHJlc3VsdCB3aWxsIGJlIHBvc3NpYmxlYClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIGxvZyhgTm8gcmVzdWx0IGlzIGF2YWlsYWJsZSB5ZXQuYCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ICYmIHRoaXMubm90aWZpZXIpIHtcbiAgICAgICAgdGhpcy5ub3RpZmllci5vbkVuZFNlc3Npb25Db21wbGV0ZShyZXN1bHQucmVxdWVzdCwgcmVzdWx0LnJlc3BvbnNlLCByZXN1bHQuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgRW5kU2Vzc2lvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICAgKi9cbiAgc2V0RW5kU2Vzc2lvbk5vdGlmaWVyKG5vdGlmaWVyOiBFbmRTZXNzaW9uTm90aWZpZXIpOiBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIge1xuICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogTWFrZXMgYW4gZW5kc2Vzc2lvbiByZXF1ZXN0LlxuICAgKi9cbiAgYWJzdHJhY3QgcGVyZm9ybUVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZW5kIHNlc3Npb24gcmVxdWVzdCBjYW4gYmUgY29tcGxldGVkLCBhbmQgY29tcGxldGVzIGl0LlxuICAgKiBUaGUgaGFuZGxlciByZXR1cm5zIGEgYFByb21pc2U8RW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZT5gIGlmIHJlYWR5LCBvciBhIGBQcm9taXNlPG51bGw+YFxuICAgKiBpZiBub3QgcmVhZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpOiBQcm9taXNlPEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD47XG59XG4iXX0=