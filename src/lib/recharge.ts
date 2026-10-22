import { maxUint256, parseUnits } from "viem";
import { z } from "zod";

export const TOKEN_DECIMALS = 6;
export const rechargeSchema = z.object({
  userid: z
    .string()
    .trim()
    .max(78)
    .regex(/^\d+$/, "Enter a numeric user ID.")
    .refine(
      (value) =>
        value.length <= 78 &&
        /^\d+$/.test(value) &&
        BigInt(value) > 0n &&
        BigInt(value) <= maxUint256,
      "Enter a valid positive user ID.",
    ),
  amount: z
    .string()
    .trim()
    .max(16)
    .regex(
      /^\d+(?:\.\d{1,6})?$/,
      "Use up to 6 decimal places; scientific notation is not supported.",
    )
    .refine((value) => {
      if (value.length > 16 || !/^\d+(?:\.\d{1,6})?$/.test(value)) return false;
      const amount = parseUnits(value, TOKEN_DECIMALS);
      return (
        amount >= parseUnits("1", TOKEN_DECIMALS) &&
        amount <= parseUnits("100000000", TOKEN_DECIMALS)
      );
    }, "Amount must be between 1 and 100000000 Anty."),
});

export type RechargeValues = z.infer<typeof rechargeSchema>;
