

<img src="https://raw.githubusercontent.com/BYicon/mirc-web/refs/heads/main/public/images/logo.png" alt="Description" width="280"/>

![LICENSE](https://img.shields.io/badge/license-MIT-green)

## Preview
[DEMO](https://ioby.cn/)

[合约仓库](https://github.com/BYicon/mirror-coin)
`目前部署在sepolia测试网，合约部署address在abi文件中`

`开发中,欢迎一起探索Web3～～ 🐶 `
<hr />

 [![Next.js](https://img.shields.io/badge/Next.js-blue)](https://nextjs.org) [![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-blue)](https://ui.shadcn.com) [![Typescript](https://img.shields.io/badge/Typescript-blue)](https://www.typescriptlang.org)  [![Wagmi](https://img.shields.io/badge/Wagmi-red)](https://wagmi.sh)  [![RainbowKit](https://img.shields.io/badge/RainbowKit-orange)](https://www.rainbowkit.com) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-green)](https://tailwindcss.com)

## Features
- 常规钱包交互
- 每日签到，可获得MIR Token（计划：可以获得Sepolia ETH）
- 使用MIR Token兑换小程序积分，每使用10个 MIR Token，可获得一个NFT的铸造权限
- 铸造NFT时，生成随机图片并上传文件至IPFS
- NFT类似于会员卡，可以用于其他小程序

## TODO
- Air Drop
- 推荐奖励
- 管理员界面
- K线图
- nft的tokenURI根据规范修改
- 增加跨链铸造token



## Start project
```bash
yarn dev
```

## Deploy project

```bash
yarn build
```

```bash
pm2 start npm --name "mirc" -- start
```

## reference
- [wagmi](https://wagmi.sh)
- [rainbowkit](https://www.rainbowkit.com)
- [shadcn-ui](https://ui.shadcn.com)
- [pinata](https://pinata.cloud/)
- [next.js](https://nextjs.org)
- [blockies](https://github.com/download13/blockies)
- [html2canvas](https://html2canvas.hertzen.com/)
