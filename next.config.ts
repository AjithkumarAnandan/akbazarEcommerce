import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
