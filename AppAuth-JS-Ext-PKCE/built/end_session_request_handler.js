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
var logger_1 = require("./logger");
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
        logger_1.log("Checking to see if there is an endsession response to be delivered.");
        if (!this.notifier) {
            logger_1.log("Notifier is not present on EndSessionRequest handler.\n          No delivery of result will be possible");
        }
        return this.completeEndSessionRequest().then(function (result) {
            if (!result) {
                logger_1.log("No result is available yet.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuZF9zZXNzaW9uX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQU1ILG1DQUE2QjtBQXFCN0I7OztHQUdHO0FBQ0g7SUFBQTtRQUNVLGFBQVEsR0FBNEIsSUFBSSxDQUFDO0lBa0JuRCxDQUFDO0lBaEJDLGtEQUFxQixHQUFyQixVQUFzQixRQUE0QjtRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpREFBb0IsR0FBcEIsVUFDSSxPQUEwQixFQUMxQixRQUFpQyxFQUNqQyxLQUEyQjtRQUM3QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksZ0RBQWtCO0FBcUIvQixpREFBaUQ7QUFDakQsMEJBQTBCO0FBQ2IsUUFBQSw4QkFBOEIsR0FDdkMsQ0FBQyxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFM0Q7OztHQUdHO0FBQ0g7SUFDRSxrQ0FBbUIsS0FBdUIsRUFBWSxjQUErQjtRQUFsRSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUVyRixpREFBaUQ7UUFDdkMsYUFBUSxHQUE0QixJQUFJLENBQUM7SUFIcUMsQ0FBQztJQUt6Rjs7T0FFRztJQUNPLGtEQUFlLEdBQXpCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBMEI7UUFDNUIseUJBQXlCO1FBQ3pCLHFDQUFxQztRQUNyQyxJQUFJLFVBQVUsR0FBYztZQUMxQixlQUFlLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDcEMsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLHFCQUFxQjtZQUN6RCxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDdkIsQ0FBQztRQUVGLG1CQUFtQjtRQUNuQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbEIsS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4Qyx1Q0FBdUM7b0JBQ3ZDLElBQUksc0NBQThCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzNDO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUNQLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFFLGtEQUFrRDtRQUN6RixJQUFJLEdBQUcsR0FBTSxPQUFPLFNBQUksS0FBTyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0VBQW1DLEdBQW5DO1FBQUEsaUJBZ0JDO1FBZkMsMERBQTBEO1FBQzFELDRDQUE0QztRQUM1QyxZQUFHLENBQUMscUVBQXFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixZQUFHLENBQUMseUdBQ3VDLENBQUMsQ0FBQTtTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNqRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLFlBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxNQUFNLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3REFBcUIsR0FBckIsVUFBc0IsUUFBNEI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUEsQ0FBQztJQWVKLCtCQUFDO0FBQUQsQ0FBQyxBQWpGRCxJQWlGQztBQWpGcUIsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Y3J5cHRvR2VuZXJhdGVSYW5kb20sIFJhbmRvbUdlbmVyYXRvcn0gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtFbmRTZXNzaW9uUmVxdWVzdCwgRW5kU2Vzc2lvblJlcXVlc3RKc29ufSBmcm9tICcuL2VuZF9zZXNzaW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtFbmRTZXNzaW9uRXJyb3IsIEVuZFNlc3Npb25FcnJvckpzb24sIEVuZFNlc3Npb25SZXNwb25zZSwgRW5kU2Vzc2lvblJlc3BvbnNlSnNvbn0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXNwb25zZSc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogVGhpcyB0eXBlIHJlcHJlc2VudHMgYSBsYW1iZGEgdGhhdCBjYW4gdGFrZSBhbiBFbmRTZXNzaW9uUmVxdWVzdCxcbiAqIGFuZCBhbiBFbmRTZXNzaW9uUmVzcG9uc2UgYXMgYXJndW1lbnRzLlxuICovXG5leHBvcnQgdHlwZSBFbmRTZXNzaW9uTGlzdGVuZXIgPVxuICAgIChyZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCwgcmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxudWxsLCBlcnJvcjogRW5kU2Vzc2lvbkVycm9yfG51bGwpID0+XG4gICAgICAgIHZvaWQ7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0cnVjdHVyYWwgdHlwZSBob2xkaW5nIGJvdGggZW5kIHNlc3Npb24gcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZSB7XG4gIHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0O1xuICByZXNwb25zZTogRW5kU2Vzc2lvblJlc3BvbnNlfG51bGw7XG4gIGVycm9yOiBFbmRTZXNzaW9uRXJyb3J8bnVsbDtcbn1cblxuLyoqXG4gKiBFbmRTZXNzaW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gKiBUaGlzIG1hbmFnZXMgdGhlIGNvbW11bmljYXRpb24gb2YgdGhlIEVuZFNlc3Npb25SZXNwb25zZSB0byB0aGUgM3AgY2xpZW50LlxuICovXG5leHBvcnQgY2xhc3MgRW5kU2Vzc2lvbk5vdGlmaWVyIHtcbiAgcHJpdmF0ZSBsaXN0ZW5lcjogRW5kU2Vzc2lvbkxpc3RlbmVyfG51bGwgPSBudWxsO1xuXG4gIHNldEVuZFNlc3Npb25MaXN0ZW5lcihsaXN0ZW5lcjogRW5kU2Vzc2lvbkxpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBlbmRzZXNzaW9uIGNvbXBsZXRlIGNhbGxiYWNrLlxuICAgKi9cbiAgb25FbmRTZXNzaW9uQ29tcGxldGUoXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8bnVsbCxcbiAgICAgIGVycm9yOiBFbmRTZXNzaW9uRXJyb3J8bnVsbCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgICAvLyBjb21wbGV0ZSBlbmRzZXNzaW9uIHJlcXVlc3RcbiAgICAgIHRoaXMubGlzdGVuZXIocmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gVE9ETyhyYWh1bHJhdkApOiBhZGQgbW9yZSBidWlsdCBpbiBwYXJhbWV0ZXJzLlxuLyogYnVpbHQgaW4gcGFyYW1ldGVycy4gKi9cbmV4cG9ydCBjb25zdCBFTkRTRVNTSU9OX0JVSUxUX0lOX1BBUkFNRVRFUlMgPVxuICAgIFsnaWRfdG9rZW5faGludCcsICdwb3N0X2xvZ291dF9yZWRpcmVjdF91cmknLCAnc3RhdGUnXTtcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugd2hpY2ggaXMgY2FwYWJsZSBvZiBoYW5kbGluZyBhbiBlbmRzZXNzaW9uIHJlcXVlc3RcbiAqIHVzaW5nIHZhcmlvdXMgbWV0aG9kcyAoaWZyYW1lIC8gcG9wdXAgLyBkaWZmZXJlbnQgcHJvY2VzcyBldGMuKS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB1dGlsczogUXVlcnlTdHJpbmdVdGlscywgcHJvdGVjdGVkIGdlbmVyYXRlUmFuZG9tOiBSYW5kb21HZW5lcmF0b3IpIHt9XG5cbiAgLy8gbm90aWZpZXIgc2VuZCB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGUgY2xpZW50LlxuICBwcm90ZWN0ZWQgbm90aWZpZXI6IEVuZFNlc3Npb25Ob3RpZmllcnxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQSB1dGlsaXR5IG1ldGhvZCB0byBiZSBhYmxlIHRvIGJ1aWxkIHRoZSBlbmRzZXNzaW9uIHJlcXVlc3QgVVJMLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkUmVxdWVzdFVybChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0KSB7XG4gICAgLy8gYnVpbGQgdGhlIHF1ZXJ5IHN0cmluZ1xuICAgIC8vIGNvZXJjZSB0byBhbnkgdHlwZSBmb3IgY29udmVuaWVuY2VcbiAgICBsZXQgcmVxdWVzdE1hcDogU3RyaW5nTWFwID0ge1xuICAgICAgJ2lkX3Rva2VuX2hpbnQnOiByZXF1ZXN0LmlkVG9rZW5IaW50LFxuICAgICAgJ3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSc6IHJlcXVlc3QucG9zdExvZ291dFJlZGlyZWN0VXJpLFxuICAgICAgJ3N0YXRlJzogcmVxdWVzdC5zdGF0ZVxuICAgIH07XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHJlcXVlc3QuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiByZXF1ZXN0LmV4dHJhcykge1xuICAgICAgICBpZiAocmVxdWVzdC5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgaWYgKEVORFNFU1NJT05fQlVJTFRfSU5fUEFSQU1FVEVSUy5pbmRleE9mKGV4dHJhKSA8IDApIHtcbiAgICAgICAgICAgIHJlcXVlc3RNYXBbZXh0cmFdID0gcmVxdWVzdC5leHRyYXNbZXh0cmFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBxdWVyeSA9IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3RNYXApO1xuICAgIGxldCBiYXNlVXJsID1cbiAgICAgICAgY29uZmlndXJhdGlvbi5lbmRTZXNzaW9uRW5kcG9pbnQ7ICAvLyBUQkQgLSBzaG91bGQgdGhyb3cgaWYgbm8gdXJsIGlzIGF2YWlsYWJsZSBhdCBPUFxuICAgIGxldCB1cmwgPSBgJHtiYXNlVXJsfT8ke3F1ZXJ5fWA7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZXMgdGhlIGVuZHNlc3Npb24gcmVxdWVzdCBpZiBuZWNlc3NhcnkgJiB3aGVuIHBvc3NpYmxlLlxuICAgKi9cbiAgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdElmUG9zc2libGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gY2FsbCBjb21wbGV0ZSBlbmRzZXNzaW9uIGlmIHBvc3NpYmxlIHRvIHNlZSB0aGVyZSBtaWdodFxuICAgIC8vIGJlIGEgcmVzcG9uc2UgdGhhdCBuZWVkcyB0byBiZSBkZWxpdmVyZWQuXG4gICAgbG9nKGBDaGVja2luZyB0byBzZWUgaWYgdGhlcmUgaXMgYW4gZW5kc2Vzc2lvbiByZXNwb25zZSB0byBiZSBkZWxpdmVyZWQuYCk7XG4gICAgaWYgKCF0aGlzLm5vdGlmaWVyKSB7XG4gICAgICBsb2coYE5vdGlmaWVyIGlzIG5vdCBwcmVzZW50IG9uIEVuZFNlc3Npb25SZXF1ZXN0IGhhbmRsZXIuXG4gICAgICAgICAgTm8gZGVsaXZlcnkgb2YgcmVzdWx0IHdpbGwgYmUgcG9zc2libGVgKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb21wbGV0ZUVuZFNlc3Npb25SZXF1ZXN0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgbG9nKGBObyByZXN1bHQgaXMgYXZhaWxhYmxlIHlldC5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgJiYgdGhpcy5ub3RpZmllcikge1xuICAgICAgICB0aGlzLm5vdGlmaWVyLm9uRW5kU2Vzc2lvbkNvbXBsZXRlKHJlc3VsdC5yZXF1ZXN0LCByZXN1bHQucmVzcG9uc2UsIHJlc3VsdC5lcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBFbmRTZXNzaW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gICAqL1xuICBzZXRFbmRTZXNzaW9uTm90aWZpZXIobm90aWZpZXI6IEVuZFNlc3Npb25Ob3RpZmllcik6IEVuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciB7XG4gICAgdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBlbmRzZXNzaW9uIHJlcXVlc3QuXG4gICAqL1xuICBhYnN0cmFjdCBwZXJmb3JtRW5kU2Vzc2lvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbmQgc2Vzc2lvbiByZXF1ZXN0IGNhbiBiZSBjb21wbGV0ZWQsIGFuZCBjb21wbGV0ZXMgaXQuXG4gICAqIFRoZSBoYW5kbGVyIHJldHVybnMgYSBgUHJvbWlzZTxFbmRTZXNzaW9uUmVxdWVzdFJlc3BvbnNlPmAgaWYgcmVhZHksIG9yIGEgYFByb21pc2U8bnVsbD5gXG4gICAqIGlmIG5vdCByZWFkeS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb21wbGV0ZUVuZFNlc3Npb25SZXF1ZXN0KCk6IFByb21pc2U8RW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZXxudWxsPjtcbn1cbiJdfQ==