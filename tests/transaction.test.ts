import assert from "node:assert/strict";
import test from "node:test";
import { type Hash, type TransactionReceipt } from "viem";
import { confirmSepoliaTransaction } from "../src/lib/transaction";

const address = "0x0000000000000000000000000000000000000001" as const;
const hash = ("0x" + "1".repeat(64)) as Hash;
const receipt = {
  status: "success",
  transactionHash: hash,
} as TransactionReceipt;

test("rejects disconnected and wrong-chain wallets before invoking the wallet", async () => {
  let submitted = false;
  for (const session of [{}, { address, chainId: 1 }]) {
    await assert.rejects(
      confirmSepoliaTransaction({
        session,
        submit: async () => {
          submitted = true;
          return hash;
        },
        wait: async () => receipt,
        onSubmitted: () => {},
      }),
    );
  }
  assert.equal(submitted, false);
});

test("does not report success until the transaction has a successful receipt", async () => {
  const events: string[] = [];
  const result = await confirmSepoliaTransaction({
    session: { address, chainId: 11155111 },
    submit: async (account) => {
      assert.equal(account, address);
      events.push("wallet signed");
      return hash;
    },
    onSubmitted: (submitted) => {
      assert.equal(submitted, hash);
      events.push("hash available");
    },
    wait: async (submitted) => {
      assert.equal(submitted, hash);
      events.push("receipt confirmed");
      return receipt;
    },
  });
  assert.equal(result, receipt);
  assert.deepEqual(events, [
    "wallet signed",
    "hash available",
    "receipt confirmed",
  ]);
});

test("propagates wallet rejection and reverted receipts without reporting success", async () => {
  let waited = false;
  await assert.rejects(
    confirmSepoliaTransaction({
      session: { address, chainId: 11155111 },
      submit: async () => {
        throw new Error("User rejected request");
      },
      onSubmitted: () => {},
      wait: async () => {
        waited = true;
        return receipt;
      },
    }),
    /User rejected/,
  );
  assert.equal(waited, false);
  await assert.rejects(
    confirmSepoliaTransaction({
      session: { address, chainId: 11155111 },
      submit: async () => hash,
      onSubmitted: () => {},
      wait: async () => ({ ...receipt, status: "reverted" }),
    }),
    /reverted/,
  );
});
