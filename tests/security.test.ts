import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { getConfig, APP_CHAIN_ID } from "../src/lib/wagmi";
import { generateHash, merge, padTokenId } from "../src/shared/utils";

test("only Sepolia can be selected for contract interactions", () => {
  const config = getConfig();
  assert.deepEqual(
    config.chains.map((chain) => chain.id),
    [11155111],
  );
  assert.equal(config.state.chainId, APP_CHAIN_ID);
});

test("locale merge ignores prototype pollution payloads", () => {
  const target = { label: { title: "Hello" } };
  merge(
    target,
    JSON.parse(
      '{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"label":{"title":"Updated"}}',
    ),
  );
  assert.equal(Object.getPrototypeOf(target).polluted, undefined);
  assert.equal(({} as { polluted?: boolean }).polluted, undefined);
  assert.equal(target.label.title, "Updated");
});

test("NFT rendering preserves large token IDs and existing image seeds", () => {
  assert.equal(padTokenId(9007199254740993n), "9007199254740993");
  const input = "00000001";
  assert.equal(
    generateHash(input),
    createHash("sha256").update(input).digest("hex").slice(0, 16),
  );
});
