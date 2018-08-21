"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appauth_1 = require("@openid/appauth");
var js_sha256_1 = require("js-sha256");
/**
 * class for PKCE code challenge and code verifier generation.
 */
var CodeVerifier = /** @class */ (function () {
    function CodeVerifier() {
        this.verifier = this.getVerifier();
        this.challenge = this.base64URLEncode(new Buffer(CodeVerifier.sha256(this.verifier)));
        this.method = 'S256';
    }
    /**
     * base64 encoding
     *
     * @param value text to encode
     */
    CodeVerifier.prototype.base64URLEncode = function (value) {
        return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };
    /**
     * Generate SHA256 code for given value
     *
     * @param value text to generate SHA256 code
     */
    CodeVerifier.sha256 = function (value) {
        return js_sha256_1.sha256.create().update(value).arrayBuffer();
    };
    /**
     * Get PKCE code verifier code.
     */
    CodeVerifier.prototype.getVerifier = function () {
        return this.base64URLEncode(new Buffer(appauth_1.cryptoGenerateRandom(32), 'UTF-8'));
    };
    return CodeVerifier;
}());
exports.CodeVerifier = CodeVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtjZV9jb2RlX3ZlcmlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BrY2VfY29kZV92ZXJpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFxRDtBQUNyRCx1Q0FBaUM7QUFFakM7O0dBRUc7QUFDSDtJQThCRTtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQTlCRDs7OztPQUlHO0lBQ0ssc0NBQWUsR0FBdkIsVUFBd0IsS0FBYTtRQUNuQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxtQkFBTSxHQUFwQixVQUFxQixLQUFhO1FBQ2hDLE9BQU8sa0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssa0NBQVcsR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxNQUFNLENBQUMsOEJBQW9CLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBUUgsbUJBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBcENZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbX0gZnJvbSAnQG9wZW5pZC9hcHBhdXRoJztcbmltcG9ydCB7c2hhMjU2fSBmcm9tICdqcy1zaGEyNTYnO1xuXG4vKipcbiAqIGNsYXNzIGZvciBQS0NFIGNvZGUgY2hhbGxlbmdlIGFuZCBjb2RlIHZlcmlmaWVyIGdlbmVyYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2RlVmVyaWZpZXIge1xuICBjaGFsbGVuZ2U6IHN0cmluZztcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHZlcmlmaWVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGJhc2U2NCBlbmNvZGluZ1xuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdGV4dCB0byBlbmNvZGVcbiAgICovXG4gIHByaXZhdGUgYmFzZTY0VVJMRW5jb2RlKHZhbHVlOiBCdWZmZXIpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpLnJlcGxhY2UoLz0vZywgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIFNIQTI1NiBjb2RlIGZvciBnaXZlbiB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdGV4dCB0byBnZW5lcmF0ZSBTSEEyNTYgY29kZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzaGEyNTYodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiBzaGEyNTYuY3JlYXRlKCkudXBkYXRlKHZhbHVlKS5hcnJheUJ1ZmZlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBQS0NFIGNvZGUgdmVyaWZpZXIgY29kZS5cbiAgICovXG4gIHByaXZhdGUgZ2V0VmVyaWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZTY0VVJMRW5jb2RlKG5ldyBCdWZmZXIoY3J5cHRvR2VuZXJhdGVSYW5kb20oMzIpLCAnVVRGLTgnKSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlcmlmaWVyID0gdGhpcy5nZXRWZXJpZmllcigpO1xuXG4gICAgdGhpcy5jaGFsbGVuZ2UgPSB0aGlzLmJhc2U2NFVSTEVuY29kZShuZXcgQnVmZmVyKENvZGVWZXJpZmllci5zaGEyNTYodGhpcy52ZXJpZmllcikpKTtcbiAgICB0aGlzLm1ldGhvZCA9ICdTMjU2JztcbiAgfVxufSJdfQ==