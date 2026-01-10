import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/ecommerce",
  // assetPrefix: "/ecommerce",
  productionBrowserSourceMaps: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  async redirects() {
    return [
      {
        source: "/",        // maps to /ecommerce
        destination: "/dashboard", // maps to /ecommerce/login
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
