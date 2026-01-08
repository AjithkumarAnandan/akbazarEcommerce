import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/ecommerce',
  productionBrowserSourceMaps: false,
  // basePath: '/store',
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',  // your new limit
    }
  },
    async rewrites() {
    return [
      
      {
        source: '/ecommerce',
        destination: '/ecommerce/dashboard',
       
      },
      {
        source: '/',
        destination: '/ecommerce',
        },
    ]
  },
};

export default nextConfig;
