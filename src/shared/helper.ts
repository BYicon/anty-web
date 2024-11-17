import { networks } from "./networks";
import { ethers, utils } from "ethers";

/**
 * 检查钱包是否已经登陆
 */
export const checkIfWalletIsConnected = async () => {
  if (!window.ethereum) return alert("Please Install MetaMask");
  //   const network = await changeNetwork({ networkName: "localhost" });
  const account = await window.ethereum.request({ method: "eth_accounts" });
  return account[0] || "";
};

/**
 * 获取余额
 * @param account 钱包地址
 */
export const getBalance = async (account: string) => {
  if (!window.ethereum) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(account);
  const balanceStr = ethers.utils.formatEther(balance);
  return balanceStr;
};

/**
 * 切换网络
 */
export const changeNetwork = async ({
  networkName,
}: {
  networkName: string;
}) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
