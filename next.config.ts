import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Force Turbopack to treat this folder as the project root
    root: __dirname,
  },
};

export default nextConfig;
