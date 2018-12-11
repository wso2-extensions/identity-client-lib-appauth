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
 * Represents an User Info request.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 */
var UserInfoRequest = /** @class */ (function () {
    function UserInfoRequest(accessToken, extras) {
        this.accessToken = accessToken;
        this.extras = extras;
    }
    /**
     * Serializes a UserInfoRequest to a JavaScript object.
     */
    UserInfoRequest.prototype.toJson = function () {
        return { access_token: this.accessToken, extras: this.extras };
    };
    UserInfoRequest.prototype.toStringMap = function () {
        var map = {};
        // copy over extras
        if (this.extras) {
            for (var extra in this.extras) {
                if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    map[extra] = this.extras[extra];
                }
            }
        }
        return map;
    };
    UserInfoRequest.fromJson = function (input) {
        return new UserInfoRequest(input.access_token, input.extras);
    };
    UserInfoRequest.prototype.setExtrasField = function (key, value) {
        if (this.extras) {
            this.extras[key] = value;
        }
    };
    return UserInfoRequest;
}());
exports.UserInfoRequest = UserInfoRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcl9pbmZvX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHOztBQWFIOzs7O0dBSUc7QUFDSDtJQUNFLHlCQUFtQixXQUFvQixFQUFTLE1BQWtCO1FBQS9DLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFdEU7O09BRUc7SUFDSCxnQ0FBTSxHQUFOO1FBQ0UsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLEdBQUcsR0FBYyxFQUFFLENBQUM7UUFFeEIsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25FLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsS0FBMEI7UUFDeEMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFlLEdBQVcsRUFBRSxLQUFhO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTgsIFdTTzIgSW5jLiAoaHR0cDovL3d3dy53c28yLm9yZykgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBXU08yIEluYy4gbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsXG4gKiBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICdAb3BlbmlkL2FwcGF1dGgnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFVzZXIgSW5mbyBSZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9SZXF1ZXN0SnNvbiB7XG4gIGFjY2Vzc190b2tlbj86IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBVc2VyIEluZm8gcmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1VzZXJJbmZvUmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgVXNlckluZm9SZXF1ZXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGFjY2Vzc1Rva2VuPzogc3RyaW5nLCBwdWJsaWMgZXh0cmFzPzogU3RyaW5nTWFwKSB7fVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGEgVXNlckluZm9SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogVXNlckluZm9SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHthY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sIGV4dHJhczogdGhpcy5leHRyYXN9O1xuICB9XG5cbiAgdG9TdHJpbmdNYXAoKTogU3RyaW5nTWFwIHtcbiAgICBsZXQgbWFwOiBTdHJpbmdNYXAgPSB7fTtcblxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIGZvciAobGV0IGV4dHJhIGluIHRoaXMuZXh0cmFzKSB7XG4gICAgICAgIGlmICh0aGlzLmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkgJiYgIW1hcC5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcbiAgICAgICAgICBtYXBbZXh0cmFdID0gdGhpcy5leHRyYXNbZXh0cmFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogVXNlckluZm9SZXF1ZXN0SnNvbik6IFVzZXJJbmZvUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBVc2VySW5mb1JlcXVlc3QoaW5wdXQuYWNjZXNzX3Rva2VuLCBpbnB1dC5leHRyYXMpO1xuICB9XG5cbiAgc2V0RXh0cmFzRmllbGQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIHRoaXMuZXh0cmFzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn0iXX0=