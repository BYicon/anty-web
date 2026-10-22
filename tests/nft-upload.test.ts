import assert from "node:assert/strict";
import test from "node:test";
import { canvasToBlob, validateImageUrl } from "../src/lib/nft-image";
import { uploadImage } from "../src/http/api";

test("canvas export resolves or rejects instead of leaving a pending promise", async () => {
  const blob = new Blob(["image"], { type: "image/png" });
  assert.equal(
    await canvasToBlob({ toBlob: (callback) => callback(blob) }),
    blob,
  );
  await assert.rejects(
    canvasToBlob({ toBlob: (callback) => callback(null) }),
    /Could not generate/,
  );
  await assert.rejects(
    canvasToBlob({
      toBlob: () => {
        throw new Error("tainted canvas");
      },
    }),
    /tainted canvas/,
  );
});

test("upload failures propagate and a retry can succeed with a browser-generated boundary", async () => {
  const originalFetch = globalThis.fetch;
  const file = new File(["image"], "image.png", { type: "image/png" });
  try {
    globalThis.fetch = async () => {
      throw new Error("network down");
    };
    await assert.rejects(uploadImage(file), /network down/);
    globalThis.fetch = async () => new Response("failed", { status: 503 });
    await assert.rejects(uploadImage(file), /Image upload failed/);
    globalThis.fetch = async (_url, options) => {
      assert.equal(options?.headers, undefined);
      assert.ok(options?.body instanceof FormData);
      return Response.json({ url: "https://example.com/image.png" });
    };
    assert.equal(await uploadImage(file), "https://example.com/image.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("upload responses cannot mint unsafe or missing image URLs", () => {
  for (const url of [
    undefined,
    "",
    "javascript:alert(1)",
    "data:image/svg+xml,test",
    "http://example.com/a",
    "https://user:password@example.com/a",
  ]) {
    assert.throws(() => validateImageUrl(url));
  }
  assert.equal(
    validateImageUrl("ipfs://bafyexample/image.png"),
    "ipfs://bafyexample/image.png",
  );
});
