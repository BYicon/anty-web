import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  // Keep native SDK modules and Viem's dynamic chain loaders in Node's module system.
  serverExternalPackages: ["@coinbase/cdp-sdk", "viem"],
  experimental: {
    optimizePackageImports: [
      "wagmi",
      "wagmi/connectors",
      "@wagmi/connectors",
    ],
  },
  poweredByHeader: false,
  webpack(config) {
    // MetaMask's optional native storage is not used in this browser application.
    config.resolve.alias["@react-native-async-storage/async-storage"] = false;
    return config;
  },
  async rewrites() {
    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) return [];
    const destination = new URL(apiBaseUrl);
    if (
      !["http:", "https:"].includes(destination.protocol) ||
      destination.username ||
      destination.password
    ) {
      throw new Error(
        "API_BASE_URL must be an HTTP(S) URL without credentials.",
      );
    }
    destination.pathname = destination.pathname.replace(/\/$/, "") + "/upload";
    destination.search = "";
    destination.hash = "";
    return [{ source: "/api/upload", destination: destination.href }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
