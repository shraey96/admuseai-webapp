export const FUNCTIONS_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:54325/functions/v1"
    : "https://eglwedwlixqeqiteygec.supabase.co/functions/v1";
