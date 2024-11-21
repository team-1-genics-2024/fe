/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
        protocol: "https",
        hostname: "api.beteam1genics.my.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
