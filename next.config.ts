import type { NextConfig } from "next";

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: cmsApiUrl ? [new URL(`${cmsApiUrl}/storage/**`)] : [],
  },
};

export default nextConfig;
