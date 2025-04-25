/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    PADDLE_CLIENT_ID: process.env.PADDLE_CLIENT_ID,
    PADDLE_ENV: process.env.PADDLE_ENV,
  },
};

export default nextConfig;
