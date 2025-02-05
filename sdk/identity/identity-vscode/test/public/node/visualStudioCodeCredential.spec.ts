// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable sort-imports */

import type { Recorder } from "@azure-tools/test-recorder";
import { isRecordMode } from "@azure-tools/test-recorder";
import { VisualStudioCodeCredential } from "@azure/identity";
import assert from "assert";
import sinon from "sinon";

const mockedResponse = [
  {
    account: "AzureCloud",
    password: "refresh_token",
  },
];

// TODO: Enable again once the VisualStudio cache bug is fixed.
describe.skip("VisualStudioCodeCredential", function (this: Mocha.Suite) {
  let recorder: Recorder;

  beforeEach(async function (this: Mocha.Context) {});

  afterEach(async function () {});

  const scope = "https://graph.microsoft.com/.default";

  it("successfully gets a token", async () => {
    if (!isRecordMode()) {
      // In live CI or playback CI, we need to avoid actually using keytar
      // to try to read the Azure Account state, since it won't be available
      const mock = sinon.mock(require("keytar"));
      mock.expects("findCredentials").onFirstCall().returns(mockedResponse);
    }

    const cred = new VisualStudioCodeCredential(recorder.configureClientOptions({}));

    const token = await cred.getToken(scope);

    assert.ok(token.expiresOnTimestamp);
    assert.ok(token.token);
  });
});
