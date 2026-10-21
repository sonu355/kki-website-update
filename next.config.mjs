/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mysql2", "cloudinary"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "4.imimg.com" },
    ],
  },
};

export default nextConfig;
