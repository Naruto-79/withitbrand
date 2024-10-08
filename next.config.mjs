/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io'],
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
