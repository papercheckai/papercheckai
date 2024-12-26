import type { NextConfig } from "next";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
