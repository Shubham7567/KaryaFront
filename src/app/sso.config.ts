import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig:AuthConfig = {
    issuer: 'https://localhost:7018',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'angular',
    scope: 'openid profile weatherapi.read',
    dummyClientSecret:'secret',
    responseType: 'code',
    requireHttps: false
}