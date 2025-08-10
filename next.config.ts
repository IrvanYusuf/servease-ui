import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // remotePatterns: ["res.cloudinary.com", "picsum.photos"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
