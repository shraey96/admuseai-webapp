/** @type {import('next').NextConfig} */
const nextConfig = {
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
    MIXPANEL_PROJECT_TOKEN: process.env.MIXPANEL_PROJECT_TOKEN,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    DODO_ENV: process.env.DODO_ENV,
    DODO_PRICE_IDS: process.env.DODO_PRICE_IDS,
  },
};

export default nextConfig;
