/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clotheser-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/rentals/**",
      },
    ],
  },
};

export default nextConfig;
