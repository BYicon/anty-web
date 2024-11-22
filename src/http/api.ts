import axios from "axios";

const IPFS_KEY = process.env.IPFS_KEY;
const IPFS_FILE_PATH = process.env.IPFS_FILE_PATH;

export const getEthereumRealTimePrice = async () => {
  const result = await axios.get(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
  );
  return {
    price: (+result.data.price).toFixed(2),
    symbol: result.data.symbol,
  };
};

// 上传到IPFS
export const uploadToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: formData,
    headers: {
      Authorization: `Bearer ${IPFS_KEY}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return `${IPFS_FILE_PATH}${response.data.IpfsHash}`;
};
