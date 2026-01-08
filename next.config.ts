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
    async redirects() {
    return [
      
      {
        source: '/ecommerce',
        destination: '/ecommerce/dashboard',
        permanent: false, // you probably want this temporary redirect
      },
      {
        source: '/',
        destination: '/ecommerce/dashboard',
        permanent: false, // you probably want this temporary redirect
      },
    ]
  },
};

export default nextConfig;
