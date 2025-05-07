"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RedirectAfterAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log("searchParams", searchParams.get("code"));

  useEffect(() => {
    // Handle Supabase auth return with code in URL
    const handleAuthReturn = async () => {
      // Check if we have a code in the URL

      const { error } = await supabase.auth.verifyOtp({
        token_hash: "hash",
        type: "email",
      });

      if (!error) {
        const redirectTo = searchParams.get("redirectTo") || "/dashboard";
        router.push(redirectTo);
      } else {
        console.error("Error verifying OTP:", error);
        router.push(`/login?error=auth&message=${error.message}`);
      }
    };

    handleAuthReturn();
  }, [router, searchParams]);

  return null;
}
