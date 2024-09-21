/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dcl-quochuynhwebsite.b-cdn.net',
          },
        ],
      },
};

export default nextConfig;
