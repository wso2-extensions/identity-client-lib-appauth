import { AuthorizationServiceConfiguration } from '../authorization_service_configuration';
/**
 * The wrapper appication.
 */
export declare class App {
    private authorizeUrl;
    private tokenUrl;
    private revokeUrl;
    private logoutUrl;
    private userInfoUrl;
    private clientId;
    private clientSecret;
    private redirectUri;
    private scope;
    private postLogoutRedirectUri;
    private discoveryUri;
    private userStore;
    private flowTypeInternal;
    private notifier;
    private authorizationHandler;
    private configuration;
    constructor({ authorizeUrl, tokenUrl, revokeUrl, logoutUrl, userInfoUrl, flowType, userStore, clientId, clientSecret, redirectUri, scope, postLogoutRedirectUri, discoveryUri }?: {
        authorizeUrl?: string;
        tokenUrl?: string;
        revokeUrl?: string;
        logoutUrl?: string;
        userInfoUrl?: string;
        flowType?: string;
        userStore?: string;
        clientId?: string;
        clientSecret?: string;
        redirectUri?: string;
        scope?: string;
        postLogoutRedirectUri?: string;
        discoveryUri?: string;
    });
    getConfiguration(): AuthorizationServiceConfiguration;
    init(authorizationListenerCallback?: Function): void;
    fetchServiceConfiguration(): void;
    makeAuthorizationRequest(state?: string, nonce?: string): void;
    checkForAuthorizationResponse(): Promise<void> | void;
    showMessage(message: string): void;
    static generateNonce(): string;
    static generateState(): string;
    parseQueryString(location: Location, splitByHash: boolean): Object;
}
