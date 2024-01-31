/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Fixes: https://github.com/vercel/next.js/issues/59432
    serverComponentsExternalPackages: ["@azure/storage-blob"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opportunify.blob.core.windows.net",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "media.glassdoor.com",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
