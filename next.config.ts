import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://zzhkzsonib.ufs.sh/**")],
  },
};

export default nextConfig;
