import { keccak256, sha256, stringToHex } from "viem";

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
          `Attempted to get item "${key}" from localStorage, but localStorage is not available.`,
        );
        return null;
      }
    },
    setItem(key: string, value: string): void {
      if (storage) {
        storage.setItem(key, value);
      } else {
        console.warn(
          `Attempted to set item "${key}" in localStorage, but localStorage is not available.`,
        );
      }
    },
    removeItem(key: string): void {
      if (storage) {
        storage.removeItem(key);
      } else {
        console.warn(
          `Attempted to remove item "${key}" from localStorage, but localStorage is not available.`,
        );
      }
    },
    clear(): void {
      if (storage) {
        storage.clear();
      } else {
        console.warn(
          "Attempted to clear localStorage, but localStorage is not available.",
        );
      }
    },
  };
}

export function generateHash(input: string) {
  return sha256(stringToHex(input)).slice(2, 18);
}

export function generateHashV2(input: string) {
  return keccak256(stringToHex(input));
}

export function padTokenId(tokenId: bigint | number, length: number = 8) {
  return tokenId.toString().padStart(length, "0");
}

export function merge(target: any, source: any) {
  if (!source || typeof source !== "object") return target;
  Object.keys(source).forEach(function (key) {
    if (key === "__proto__" || key === "constructor" || key === "prototype")
      return;
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      const current =
        Object.prototype.hasOwnProperty.call(target, key) &&
        target[key] &&
        typeof target[key] === "object"
          ? target[key]
          : {};
      target[key] = merge(current, source[key]);
      return;
    }
    target[key] = source[key];
  });
  return target;
}
