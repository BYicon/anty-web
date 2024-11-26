import crypto from "crypto";

export function generateHash(input: string) {
  // 使用 SHA-256 哈希函数
  const hash = crypto.createHash("sha256");
  hash.update(input.toString());
  // 获取哈希值并截取前16位
  return hash.digest("hex").slice(0, 16);
}

export function padTokenId(tokenId: number, length: number = 8) {
  return tokenId.toString().padStart(length, "0");
}
