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

// Required by TSyringe:
import "reflect-metadata";
import { OidcHandlerMock } from "../../../src/login/oidc/__mocks__/IOidcHandler";
import { IssuerConfigFetcherMock } from "../../../src/login/oidc/__mocks__/IssuerConfigFetcher";
import OidcLoginHandler from "../../../src/login/oidc/OidcLoginHandler";
import URL from "url-parse";
import {
  StorageUtilityMock,
  mockStorageUtility,
} from "../../../src/storage/__mocks__/StorageUtility";
import { DpopClientKeyManagerMock } from "../../../src/dpop/__mocks__/DpopClientKeyManager";
import { ClientRegistrarMock } from "../../../src/login/oidc/__mocks__/ClientRegistrar";

describe("OidcLoginHandler", () => {
  const defaultMocks = {
    oidcHandler: OidcHandlerMock,
    issuerConfigFetcher: IssuerConfigFetcherMock,
    dpopClientKeyManager: DpopClientKeyManagerMock,
    storageUtility: StorageUtilityMock,
    clientRegistrar: ClientRegistrarMock,
  };
  function getInitialisedHandler(
    mocks: Partial<typeof defaultMocks> = defaultMocks
  ): OidcLoginHandler {
    return new OidcLoginHandler(
      mocks.oidcHandler ?? defaultMocks.oidcHandler,
      mocks.issuerConfigFetcher ?? defaultMocks.issuerConfigFetcher,
      mocks.dpopClientKeyManager ?? defaultMocks.dpopClientKeyManager,
      mocks.clientRegistrar ?? defaultMocks.clientRegistrar,
      mocks.storageUtility ?? defaultMocks.storageUtility
    );
  }

  it("should call the actual handler when an Oidc Issuer is provided", async () => {
    const actualHandler = defaultMocks.oidcHandler;
    const handler = getInitialisedHandler({ oidcHandler: actualHandler });
    await handler.handle({
      sessionId: "mySession",
      oidcIssuer: new URL("https://arbitrary.url"),
      redirectUrl: new URL("https://app.com/redirect"),
      clientId: "coolApp",
    });

    expect(actualHandler.handle.mock.calls.length).toBe(1);
  });

  it("should throw an error when called without an issuer", async () => {
    const handler = getInitialisedHandler();
    // TS Ignore because bad input is purposely given here for the purpose of testing
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await expect(handler.handle({})).rejects.toThrowError(
      "OidcLoginHandler requires an oidcIssuer"
    );
  });

  it("should indicate it when it can handle logins", async () => {
    const handler = getInitialisedHandler();

    await expect(
      handler.canHandle({
        sessionId: "mySession",
        oidcIssuer: new URL("https://arbitrary.url"),
        redirectUrl: new URL("https://app.com/redirect"),
        clientId: "coolApp",
      })
    ).resolves.toBe(true);
  });

  it("should indicate it cannot handle logins without an issuer", async () => {
    const handler = getInitialisedHandler();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(handler.canHandle({} as any)).resolves.toBe(false);
  });

  it("should clear the local storage when logging in", async () => {
    const nonEmptyStorage = mockStorageUtility({
      someUser: { someKey: "someValue" },
    });
    nonEmptyStorage.setForUser(
      "someUser",
      { someKey: "someValue" },
      { secure: true }
    );
    const handler = getInitialisedHandler({
      storageUtility: nonEmptyStorage,
    });
    handler.handle({
      sessionId: "someUser",
      oidcIssuer: new URL("https://arbitrary.url"),
      redirectUrl: new URL("https://app.com/redirect"),
      clientId: "coolApp",
    });
    expect(nonEmptyStorage.getForUser("someUser", "someKey", { secure: true }))
      .toBeUndefined;
    expect(nonEmptyStorage.getForUser("someUser", "someKey", { secure: false }))
      .toBeUndefined;
    // This test is only necessary until the key is stored safely
    expect(nonEmptyStorage.get("clientKey", { secure: false })).toBeUndefined;
  });
});
