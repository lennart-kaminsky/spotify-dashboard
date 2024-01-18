/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "i.scdn.co",
      "scontent-frx5-1.xx.fbcdn.net",
      "*.googleusercontent.com",
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
