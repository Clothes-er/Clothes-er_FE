/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clotheser-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/rentals/**",
      },
      {
        protocol: "https",
        hostname: "clotheser-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/profiles/**",
      },
      {
        protocol: "https",
        hostname: "clotheser-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/users/**",
      },
      {
        protocol: "https",
        hostname: "clotheser-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/chat/**",
      },
    ],
  },
};

export default nextConfig;
