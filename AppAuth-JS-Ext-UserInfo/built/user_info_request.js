"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcl9pbmZvX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQTs7OztHQUlHO0FBQ0g7SUFDRSx5QkFBbUIsV0FBb0IsRUFBUyxNQUFrQjtRQUEvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUFTLFdBQU0sR0FBTixNQUFNLENBQVk7SUFBRyxDQUFDO0lBRXRFOztPQUVHO0lBQ0gsZ0NBQU0sR0FBTjtRQUNFLE9BQU8sRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsSUFBSSxHQUFHLEdBQWMsRUFBRSxDQUFDO1FBRXhCLG1CQUFtQjtRQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuRSx1Q0FBdUM7b0JBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTSx3QkFBUSxHQUFmLFVBQWdCLEtBQTBCO1FBQ3hDLE9BQU8sSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELHdDQUFjLEdBQWQsVUFBZSxHQUFXLEVBQUUsS0FBYTtRQUN2QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMxQjtJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0M7QUFuQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnQG9wZW5pZC9hcHBhdXRoJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBVc2VyIEluZm8gUmVxdWVzdCBhcyBKU09OLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvUmVxdWVzdEpzb24ge1xuICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gVXNlciBJbmZvIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNVc2VySW5mb1JlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXJJbmZvUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY2Nlc3NUb2tlbj86IHN0cmluZywgcHVibGljIGV4dHJhcz86IFN0cmluZ01hcCkge31cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFVzZXJJbmZvUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IFVzZXJJbmZvUmVxdWVzdEpzb24ge1xuICAgIHJldHVybiB7YWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLCBleHRyYXM6IHRoaXMuZXh0cmFzfTtcbiAgfVxuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge307XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiB0aGlzLmV4dHJhcykge1xuICAgICAgICBpZiAodGhpcy5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpICYmICFtYXAuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgbWFwW2V4dHJhXSA9IHRoaXMuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFVzZXJJbmZvUmVxdWVzdEpzb24pOiBVc2VySW5mb1JlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgVXNlckluZm9SZXF1ZXN0KGlucHV0LmFjY2Vzc190b2tlbiwgaW5wdXQuZXh0cmFzKTtcbiAgfVxuXG4gIHNldEV4dHJhc0ZpZWxkKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICB0aGlzLmV4dHJhc1trZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59Il19