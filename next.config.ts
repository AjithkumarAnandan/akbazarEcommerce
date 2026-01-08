import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/ecommerce',
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ecommerce/dashboard', // redirect root domain to dashboard
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
