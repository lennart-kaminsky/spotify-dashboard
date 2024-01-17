/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: { domains: ["i.scdn.co"] },
  reactStrictMode: true,
};

module.exports = nextConfig;
