<img src="https://raw.githubusercontent.com/BYicon/anty-web/main/public/images/logo.png" alt="Anty" width="160"/>

# Anty Web3

基于 Next.js、Wagmi、Viem 和 RainbowKit 的 Sepolia 测试网应用。

[在线访问](https://ioby.cn/) · [合约仓库](https://github.com/BYicon/anty-coin)

## 当前功能

- 连接钱包，并在操作前检查 Sepolia 网络。
- 每个钱包领取一次 Anty 测试代币，交易需要 Sepolia ETH 支付 Gas。
- 使用 Anty 为指定小程序用户 ID 充值；授权额度必须与本次所需数量一致，也可以撤销已有授权。
- 查看 NFT 及待铸造资格，生成图片、上传到 IPFS 后提交铸造交易。
- 跟踪签名和链上确认状态，展示错误、重试入口和 Sepolia Etherscan 交易链接。
- ETF 页面为界面预览，图表和持仓使用明确标记的示例数据；授权、投资和赎回均未开放。

合约地址及 ABI 位于 `src/abis`。MIR 代币精度为 6 位，所有金额以字符串和 bigint 处理。现有 NFT 合约使用图片 URI；标准 JSON metadata、交易市场上架及 ETF 交易属于后续功能。

## 本地运行

使用 Node.js 22.14+（建议先执行 `nvm use`），统一使用 npm 和已提交的 `package-lock.json`：

```bash
npm ci
cp .env.example .env.local
npm run dev
```

打开 [本地页面](http://localhost:8042)。

- `API_BASE_URL`：上传后端的服务地址，只在服务端配置使用；Next.js 仅转发 `/api/upload` 到该地址的 `/upload`。需要在构建前设置。
- `NEXT_PUBLIC_ALCHEMY_API_KEY`：可选的公开 RPC key；不配置时使用默认 Sepolia RPC。建议在 Alchemy 中限制允许的域名。
- IPFS 写入凭证和钱包私钥只能保存在后端，不能放入 `NEXT_PUBLIC_*`。请勿提交真实环境文件。
- Sass 已作为项目依赖声明，不需要全局安装。

现有环境中的 `NEXT_PUBLIC_API_BASE_URL` 暂作为兼容配置读取，部署时请迁移到 `API_BASE_URL`。

## 验证

```bash
npm run typecheck
npm run lint
npm test
npm audit --omit=dev
npm run build
```

回归测试覆盖金额精度和边界、uint256 用户 ID、上传异常、空画布、上传 URL 校验、测试网配置和原型污染防护。GitHub Actions 会自动运行检查。

依赖中的 `overrides` 固定了 PostCSS、WalletConnect、uuid、glob 和 picomatch 的兼容版本。应用运行时为 Next.js 15.5.28，ESLint 规则配置包为 14.2.35；两者独立维护。调整这些版本约束时，应重新运行完整审计和构建。

## 使用流程

1. 准备一个带 Sepolia ETH 的测试钱包，进入 Recharge 页面并连接钱包。
2. 切换到 Sepolia，领取 Anty；已领取过的钱包不会重复显示领取弹窗。
3. 填写真实的小程序用户 ID 和金额（1～100000000，最多 6 位小数）。
4. 按本次金额授权，确认后提交充值，并查看 Etherscan 回执。
5. 满足合约的铸造条件后进入 NFTs 页面，上传图片并铸造 NFT。

签名被拒绝、上传失败或链上交易失败时会显示错误，并恢复操作入口。上传成功后取消签名，可以复用已经上传的图片重试。

## 部署

在部署环境准备好 Node.js 22.14+ 和后端地址后执行：

```bash
npm ci
npm run build
npm start
```

也可以使用 PM2 启动 `npm start`。更新代码后必须重新安装依赖并构建，环境变量中的上传目标会在构建时写入转发规则。

## 服务边界

本仓库包含前端应用。上传服务负责身份校验、限流、文件大小及实际文件内容检查；后端和合约负责充值到账与 NFT 铸造权限校验。
