/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io'],
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Only use this if you still face issues
        ignoreBuildErrors: true
    }
};

export default nextConfig;
