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
        source: '/',
        destination: '/ecommerce/dashboard',
        permanent: true, // you probably want this temporary redirect
      },
      {
        source: '/ecommerce',
        destination: '/ecommerce/dashboard',
        permanent: true, // you probably want this temporary redirect
      },
    ]
  },
};

export default nextConfig;
