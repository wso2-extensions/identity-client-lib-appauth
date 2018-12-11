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
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionResponse = /** @class */ (function () {
    function EndSessionResponse(state) {
        this.state = state;
    }
    EndSessionResponse.prototype.toJson = function () {
        return { state: this.state };
    };
    EndSessionResponse.fromJson = function (json) {
        return new EndSessionResponse(json.state);
    };
    return EndSessionResponse;
}());
exports.EndSessionResponse = EndSessionResponse;
/**
 * Represents the EndSession error response.
 * For more information look at:
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionError = /** @class */ (function () {
    function EndSessionError(error, errorDescription, errorUri, state) {
        this.error = error;
        this.errorDescription = errorDescription;
        this.errorUri = errorUri;
        this.state = state;
    }
    EndSessionError.prototype.toJson = function () {
        return {
            error: this.error,
            error_description: this.errorDescription,
            error_uri: this.errorUri,
            state: this.state
        };
    };
    EndSessionError.fromJson = function (json) {
        return new EndSessionError(json.error, json.error_description, json.error_uri, json.state);
    };
    return EndSessionError;
}());
exports.EndSessionError = EndSessionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW5kX3Nlc3Npb25fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHOztBQW1CSDs7OztHQUlHO0FBQ0g7SUFDRSw0QkFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7SUFBRyxDQUFDO0lBRXBDLG1DQUFNLEdBQU47UUFDRSxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixJQUE0QjtRQUMxQyxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksZ0RBQWtCO0FBWS9COzs7O0dBSUc7QUFDSDtJQUNFLHlCQUNXLEtBQWEsRUFDYixnQkFBeUIsRUFDekIsUUFBaUIsRUFDakIsS0FBYztRQUhkLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFTO0lBQUcsQ0FBQztJQUU3QixnQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFTSx3QkFBUSxHQUFmLFVBQWdCLElBQXlCO1FBQ3ZDLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTgsIFdTTzIgSW5jLiAoaHR0cDovL3d3dy53c28yLm9yZykgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBXU08yIEluYy4gbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsXG4gKiBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRW5kU2Vzc2lvblJlc3BvbnNlIGFzIGEgSlNPTiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kU2Vzc2lvblJlc3BvbnNlSnNvbiB7XG4gIHN0YXRlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRW5kU2Vzc2lvbkVycm9yIGFzIGEgSlNPTiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kU2Vzc2lvbkVycm9ySnNvbiB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvcl91cmk/OiBzdHJpbmc7XG4gIHN0YXRlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVuZFNlc3Npb24gUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LXNlc3Npb24tMV8wLmh0bWxcbiAqL1xuZXhwb3J0IGNsYXNzIEVuZFNlc3Npb25SZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0ZTogc3RyaW5nKSB7fVxuXG4gIHRvSnNvbigpOiBFbmRTZXNzaW9uUmVzcG9uc2VKc29uIHtcbiAgICByZXR1cm4ge3N0YXRlOiB0aGlzLnN0YXRlfTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBFbmRTZXNzaW9uUmVzcG9uc2VKc29uKTogRW5kU2Vzc2lvblJlc3BvbnNlIHtcbiAgICByZXR1cm4gbmV3IEVuZFNlc3Npb25SZXNwb25zZShqc29uLnN0YXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVuZFNlc3Npb24gZXJyb3IgcmVzcG9uc2UuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3Qtc2Vzc2lvbi0xXzAuaHRtbFxuICovXG5leHBvcnQgY2xhc3MgRW5kU2Vzc2lvbkVycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZXJyb3I6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBlcnJvckRlc2NyaXB0aW9uPzogc3RyaW5nLFxuICAgICAgcHVibGljIGVycm9yVXJpPzogc3RyaW5nLFxuICAgICAgcHVibGljIHN0YXRlPzogc3RyaW5nKSB7fVxuXG4gIHRvSnNvbigpOiBFbmRTZXNzaW9uRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLFxuICAgICAgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGpzb246IEVuZFNlc3Npb25FcnJvckpzb24pOiBFbmRTZXNzaW9uRXJyb3Ige1xuICAgIHJldHVybiBuZXcgRW5kU2Vzc2lvbkVycm9yKGpzb24uZXJyb3IsIGpzb24uZXJyb3JfZGVzY3JpcHRpb24sIGpzb24uZXJyb3JfdXJpLCBqc29uLnN0YXRlKTtcbiAgfVxufVxuIl19