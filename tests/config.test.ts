import assert from "node:assert/strict";
import test from "node:test";
import config from "../next.config.mjs";

test("API proxy exposes only the upload route with a fixed backend origin", async () => {
  assert.ok(config.rewrites);
  const previous = process.env.API_BASE_URL;
  const previousLegacy = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.API_BASE_URL;
    assert.deepEqual(await config.rewrites(), []);
    process.env.API_BASE_URL = "https://backend.example/service/";
    assert.deepEqual(await config.rewrites(), [
      {
        source: "/api/upload",
        destination: "https://backend.example/service/upload",
      },
    ]);
    process.env.API_BASE_URL = "https://user:secret@backend.example";
    await assert.rejects(config.rewrites(), /without credentials/);
    process.env.API_BASE_URL = "file:///etc/passwd";
    await assert.rejects(config.rewrites(), /HTTP/);
  } finally {
    if (previous === undefined) delete process.env.API_BASE_URL;
    else process.env.API_BASE_URL = previous;
    if (previousLegacy === undefined)
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    else process.env.NEXT_PUBLIC_API_BASE_URL = previousLegacy;
  }
});
