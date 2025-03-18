export default {
  contractName: "ETFQuoter",
  contractAddress: "0x1234567890123456789012345678901234567890", // TODO: add address
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "uniswapV3Quoter_",
          type: "address",
        },
        {
          internalType: "address",
          name: "weth_",
          type: "address",
        },
        {
          internalType: "address",
          name: "usdc_",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "SameTokens",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "fees",
      outputs: [
        {
          internalType: "uint24",
          name: "",
          type: "uint24",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
      ],
      name: "getAllPaths",
      outputs: [
        {
          internalType: "bytes[]",
          name: "paths",
          type: "bytes[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "etf",
          type: "address",
        },
      ],
      name: "getTokenTargetValues",
      outputs: [
        {
          internalType: "uint24[]",
          name: "tokenTargetWeights",
          type: "uint24[]",
        },
        {
          internalType: "uint256[]",
          name: "tokenTargetValues",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "tokenReserves",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenIn",
          type: "address",
        },
        {
          internalType: "address",
          name: "tokenOut",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
      ],
      name: "quoteExactIn",
      outputs: [
        {
          internalType: "bytes",
          name: "path",
          type: "bytes",
        },
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenIn",
          type: "address",
        },
        {
          internalType: "address",
          name: "tokenOut",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
      ],
      name: "quoteExactOut",
      outputs: [
        {
          internalType: "bytes",
          name: "path",
          type: "bytes",
        },
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "etf",
          type: "address",
        },
        {
          internalType: "address",
          name: "srcToken",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "mintAmount",
          type: "uint256",
        },
      ],
      name: "quoteInvestWithToken",
      outputs: [
        {
          internalType: "uint256",
          name: "srcAmount",
          type: "uint256",
        },
        {
          internalType: "bytes[]",
          name: "swapPaths",
          type: "bytes[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "etf",
          type: "address",
        },
        {
          internalType: "address",
          name: "dstToken",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "burnAmount",
          type: "uint256",
        },
      ],
      name: "quoteRedeemToToken",
      outputs: [
        {
          internalType: "uint256",
          name: "dstAmount",
          type: "uint256",
        },
        {
          internalType: "bytes[]",
          name: "swapPaths",
          type: "bytes[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "uniswapV3Quoter",
      outputs: [
        {
          internalType: "contract IUniswapV3Quoter",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "usdc",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "weth",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
