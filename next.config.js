/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.opspy.dev",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.glassdoor.com",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/shadcn.png",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        port: "",
        pathname: "/avatar/**/*",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**/*",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "/dms/image/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
