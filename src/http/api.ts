import axios from "axios";

export const getEthereumRealTimePrice = async () => {
  const result = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");
  return {
    price: (+result.data.price).toFixed(2),
    symbol: result.data.symbol,
  };
};

