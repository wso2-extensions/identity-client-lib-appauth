import { AuthorizationServiceConfiguration, BasicQueryStringUtils, LocationLike, StorageBackend } from '@openid/appauth';
import { EndSessionRequest } from './end_session_request';
import { EndSessionRequestHandler, EndSessionRequestResponse } from './end_session_request_handler';
/**
 * Represents an EndSessionRequestHandler which uses a standard
 * redirect based code flow.
 */
export declare class EndSessionRedirectRequestHandler extends EndSessionRequestHandler {
    storageBackend: StorageBackend;
    locationLike: LocationLike;
    constructor(storageBackend?: StorageBackend, utils?: BasicQueryStringUtils, locationLike?: LocationLike, generateRandom?: import("@openid/appauth/built/crypto_utils").RandomGenerator);
    performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request: EndSessionRequest): void;
    /**
     * Attempts to introspect the contents of storage backend and completes the request.
     */
    protected completeEndSessionRequest(): Promise<EndSessionRequestResponse | null>;
}
