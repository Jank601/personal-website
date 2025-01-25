/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_GA_TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID,
  },
};

export default nextConfig;
