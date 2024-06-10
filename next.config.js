// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: ["next-auth"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
