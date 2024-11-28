import crypto from "crypto";

export function safeLocalStorage(): {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
} {
  let storage: Storage | null;

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      storage = window.localStorage;
    } else {
      storage = null;
    }
  } catch (e) {
    console.error("localStorage is not available:", e);
    storage = null;
  }

  return {
    getItem(key: string): string | null {
      if (storage) {
        return storage.getItem(key);
      } else {
        console.warn(
          `Attempted to get item "${key}" from localStorage, but localStorage is not available.`
        );
        return null;
      }
    },
    setItem(key: string, value: string): void {
      if (storage) {
        storage.setItem(key, value);
      } else {
        console.warn(
          `Attempted to set item "${key}" in localStorage, but localStorage is not available.`
        );
      }
    },
    removeItem(key: string): void {
      if (storage) {
        storage.removeItem(key);
      } else {
        console.warn(
          `Attempted to remove item "${key}" from localStorage, but localStorage is not available.`
        );
      }
    },
    clear(): void {
      if (storage) {
        storage.clear();
      } else {
        console.warn(
          "Attempted to clear localStorage, but localStorage is not available."
        );
      }
    },
  };
}

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

export function merge(target: any, source: any) {
  Object.keys(source).forEach(function (key) {
    if (
      source.hasOwnProperty(key) && // Check if the property is not inherited
      source[key] &&
      typeof source[key] === "object" || key === "__proto__" || key === "constructor"
    ) {
      merge((target[key] = target[key] || {}), source[key]);
      return;
    }
    target[key] = source[key];
  });
} 