import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    XAI_API_KEY: process.env.XAI_API_KEY,
  },
};

export default nextConfig;
