import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     experimental: {
    serverActions: {
      bodySizeLimit: '10mb',  // your new limit
    }
  }
//  async redirects() {
//     return [
//       {
//         source: '/dashboard',
//         destination: '/',
//         permanent: true,
//       },
//     ]
//   },
};

export default nextConfig;
