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
  env: {
    PUBLIC_GRAPHCMS_ENDPOINT: process.env.PUBLIC_GRAPHCMS_ENDPOINT,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    HYGRAPH_TOKEN: process.env.HYGRAPH_TOKEN,
    GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY,
  },
};

module.exports = nextConfig;
