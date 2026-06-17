import type { NextConfig } from "next";

const nextConfig: import('next').NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
