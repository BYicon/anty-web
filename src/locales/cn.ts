const cn = {
  ConnectWallet: "连接钱包",
  Recharge: "充值",
  Confirm: "确认",
  Cancel: "取消",
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LocaleType = typeof cn;

export type PartialLocaleType = DeepPartial<typeof cn>;

export default cn;
