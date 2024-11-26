import type { NextConfig } from "next";

const apiGatewayUrl = process.env.API_GATEWAY_URL

console.log('API_GATEWAY_URL', apiGatewayUrl)

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${apiGatewayUrl}/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig;
