import axios from "axios";

const IPFS_KEY = process.env.NEXT_PUBLIC_IPFS_KEY;
const IPFS_FILE_PATH = process.env.NEXT_PUBLIC_IPFS_FILE_PATH;
export const getEthereumRealTimePrice = async () => {
  const result = await axios.get(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
  );
  return {
    price: (+result.data.price).toFixed(2),
    symbol: result.data.symbol,
  };
};

export const uploadImage= async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios({
    method: "post",
    url: `/api/upload`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return `${IPFS_FILE_PATH}${response.data.url}`;
};