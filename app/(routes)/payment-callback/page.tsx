"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { useAuth } from "@/context/AuthContext";
import { useCredits } from "@/context/CreditContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertTriangle, Home } from "lucide-react";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, session } = useAuth();
  const { refreshCredits } = useCredits();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const paymentId = searchParams.get("payment_id");
  const paymentStatus = searchParams.get("status");

  const validatePayment = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        "validate-payment",
        {
          method: "POST",
          body: {
            payment_id: paymentId,
            payment_status: paymentStatus,
          },
        }
      );

      if (functionError && functionError instanceof FunctionsHttpError) {
        const { error } = await functionError.context.json();
        console.log("Function returned an error", error);
        throw new Error(error);
      }

      if (data && data.success) {
        setSuccessMessage(
          data.message || "Payment validated and credits added successfully."
        );

        await refreshCredits();
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000); // Redirect after 3 seconds
      } else {
        // Handle cases where function executed (no functionError) but operation wasn't successful internally
        setError(
          data?.error ||
            data?.message ||
            "Payment validation failed. Please contact support."
        );
      }
    } catch (e: any) {
      console.error("Payment validation error:", e);
      setError(
        e.message || "An unexpected error occurred during payment validation."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!paymentId || !paymentStatus) {
      setError("Missing payment ID or status in callback.");
      setIsLoading(false);
      return;
    }

    if (!user || !session) {
      setError("User not authenticated. Please log in and try again.");
      setIsLoading(false);
      // Optionally redirect to login or show a login prompt
      // router.push("/login");
      return;
    }

    validatePayment();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl font-semibold">Validating your payment...</p>
        <p className="text-muted-foreground">
          Please wait, this may take a moment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold text-destructive mb-2">
          Payment Failed
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
        <Button asChild>
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" /> Go to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Payment Successful!
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">{successMessage}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Redirecting to dashboard shortly...
        </p>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" /> Go to Dashboard Now
          </Link>
        </Button>
      </div>
    );
  }

  return null; // Should not be reached if logic is correct
}

export default function PaymentCallbackPage() {
  return (
    // Suspense is required by Next.js when using useSearchParams in a page component directly
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
