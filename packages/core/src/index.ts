/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// export { Session } from "./Session";
// export { SessionManager } from "./SessionManager";
// export { getClientAuthenticationWithDependencies } from "./dependencies";

// Interfaces
// export { default as ISessionInfo } from "./sessionInfo/ISessionInfo";
// export { ISessionOptions } from "./Session";
// export { ISessionManagerOptions } from "./SessionManager";
// export { default as IStorage } from "./storage/IStorage";
export { default as ILoginInputOptions } from "./ILoginInputOptions";

export { default as ILoginHandler } from "./login/ILoginHandler";
export { default as ILoginOptions } from "./login/ILoginOptions";

export { default as ILogoutHandler } from "./logout/ILogoutHandler";

export { default as IHandleable } from "./util/handlerPattern/IHandleable";

export { default as IAuthenticatedFetcher } from "./authenticatedFetch/IAuthenticatedFetcher";
export { default as IRequestCredentials } from "./authenticatedFetch/IRequestCredentials";

export { default as IDpopRequestCredentials } from "./dpop/IDpopRequestCredentials";

export { default as IOidcHandler } from "./login/oidc/IOidcHandler";
export { default as IOidcOptions } from "./login/oidc/IOidcOptions";

export { default as IRedirectHandler } from "./login/oidc/redirectHandler/IRedirectHandler";

export { default as ISessionInfo } from "./sessionInfo/ISessionInfo";

export { default as IClient } from "./login/oidc/IClient";
export { default as IIssuerConfig } from "./login/oidc/IIssuerConfig";

// Utility functions.
export { default as validateSchema } from "./util/validateSchema";
