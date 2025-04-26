export const BASE_PROJECT_URL = "https://eglwedwlixqeqiteygec.supabase.co";

export const BUCKET_URL = `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation`;

export const FUNCTIONS_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:54325/functions/v1"
    : `${BASE_PROJECT_URL}/functions/v1`;
