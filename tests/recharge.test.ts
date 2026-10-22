import assert from "node:assert/strict";
import test from "node:test";
import { maxUint256, parseUnits } from "viem";
import { rechargeSchema, TOKEN_DECIMALS } from "../src/lib/recharge";
import mir from "../src/abis/MIR";

test("recharge keeps exact micro-token amounts without Number conversion", () => {
  const values = rechargeSchema.parse({
    userid: "10086",
    amount: "12345678.123456",
  });
  assert.equal(parseUnits(values.amount, TOKEN_DECIMALS), 12345678123456n);
  assert.equal(TOKEN_DECIMALS, mir.contractDecimals);
});

test("rejects amounts that viem would otherwise round or interpret differently", () => {
  for (const amount of [
    "1.0000009",
    "1e6",
    "0.999999",
    "100000000.000001",
    "NaN",
    "Infinity",
    "-1",
    "",
    "1,000",
  ]) {
    assert.equal(
      rechargeSchema.safeParse({ userid: "10086", amount }).success,
      false,
      amount,
    );
  }
  assert.equal(
    rechargeSchema.safeParse({ userid: "10086", amount: "100000000.000000" })
      .success,
    true,
  );
});

test("user IDs must be positive uint256 decimal integers", () => {
  for (const userid of [
    "abcd",
    "0",
    "-1",
    "1.5",
    "1e8",
    "0x10",
    "",
    (maxUint256 + 1n).toString(),
    "9".repeat(10000),
  ]) {
    assert.equal(
      rechargeSchema.safeParse({ userid, amount: "1" }).success,
      false,
      userid.slice(0, 100),
    );
  }
  assert.equal(
    rechargeSchema.safeParse({ userid: maxUint256.toString(), amount: "1" })
      .success,
    true,
  );
});
