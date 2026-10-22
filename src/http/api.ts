import { validateImageUrl } from "@/lib/nft-image";

export async function getEthereumRealTimePrice() {
  const response = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    { signal: AbortSignal.timeout(15_000) },
  );
  if (!response.ok) throw new Error("Could not fetch the ETH price.");
  const result = await response.json();
  return {
    price: Number(result.price).toFixed(2),
    symbol: String(result.symbol),
  };
}

export async function uploadImage(file: File): Promise<string> {
  if (
    file.type !== "image/png" ||
    file.size === 0 ||
    file.size > 10 * 1024 * 1024
  )
    throw new Error("Upload a PNG image smaller than 10 MB.");
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error("Image upload failed. Please try again.");
  const result = await response.json();
  return validateImageUrl(result.url);
}
