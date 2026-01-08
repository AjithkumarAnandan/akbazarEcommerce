import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/ecommerce',
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',  // your new limit
    }
  },
    async rewrites() {
    return [      
       {
        source: '/',
        destination: '/dashboard',
        },
    ]
  },
};

export default nextConfig;
