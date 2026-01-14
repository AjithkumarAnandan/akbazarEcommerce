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
  async headers() {
  return [
    {
      source: '/dashboard',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=30'
        }
      ]
    }
  ];
}
};

export default nextConfig;
