"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MediaScroller from "@/components/media-scroller";
import { getHeroSamplesGrid } from "@/constants/hero-samples";
import { BASE_WEBSITE_URL } from "@/lib/constants";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

const HERO_SAMPLES_GRID = getHeroSamplesGrid(3);

function LoginClientPage() {
  const { user, signInWithGoogle, signInWithMagicLink, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const error = searchParams.get("error");

  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Login",
    });

    if (user) {
      router.push(redirectTo);
    }
    if (error === "auth") {
      setErrorMessage("Authentication failed. Please try again.");
    }
  }, [user, router, redirectTo, error]);

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    trackAnalytics(ANALYTICS_EVENTS.LOGIN_CLICKED, {
      method: "magic_link",
      email_provided: true,
    });

    setIsSendingMagicLink(true);
    setErrorMessage(null);
    try {
      const result = await signInWithMagicLink(email);
      if (result.success) {
        setMagicLinkSent(true);
      } else {
        setErrorMessage(result.error || "Failed to send magic link");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSendingMagicLink(false);
    }
  };

  const handleGoogleLogin = () => {
    trackAnalytics(ANALYTICS_EVENTS.LOGIN_CLICKED, {
      method: "google",
    });
    signInWithGoogle();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-stretch justify-center bg-gradient-to-br from-[#f5f6ff] via-[#e3e0ff] to-[#d1cfff] relative overflow-hidden">
      {/* Decorative blurred gradient blobs */}
      <div className="pointer-events-none select-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-indigo-300 opacity-30 blur-3xl z-0" />
      <div className="pointer-events-none select-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-200 opacity-30 blur-3xl z-0" />
      {/* Left: Minimal Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-4 relative z-10">
        <motion.div
          key={isSignUpMode ? "signup" : "login"}
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-2xl p-8 flex flex-col items-center">
            {/* Logo and App Name Flex Container */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link href={BASE_WEBSITE_URL} passHref legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AdMuseAI Home"
                >
                  <Image
                    src={`${BASE_WEBSITE_URL}/images/admuse.png`}
                    alt="AdMuse Logo"
                    width={48}
                    height={48}
                    className="drop-shadow-md cursor-pointer"
                  />
                </a>
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">AdMuseAI</h1>
            </div>
            {/* Welcome */}
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              {isSignUpMode ? "Create an account" : "Welcome back!"}
            </h2>
            {/* Google login placeholder */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-white/80 hover:bg-white mb-3"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_9914_10)">
                  <path
                    d="M19.8052 10.2309C19.8052 9.5508 19.7481 8.86727 19.6261 8.19824H10.2V12.0491H15.6191C15.3932 13.2727 14.6522 14.3355 13.6017 15.0377V17.1396H16.6832C18.4861 15.4808 19.8052 13.0855 19.8052 10.2309Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2 20C12.7009 20 14.7718 19.1818 16.6832 17.1396L13.6017 15.0377C12.5409 15.7577 11.2372 16.1818 10.2 16.1818C7.78544 16.1818 5.73544 14.4064 4.96544 12.1818H1.77832V14.3509C3.70126 17.5455 6.78544 20 10.2 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.96544 12.1818C4.54544 10.9582 4.54544 9.72727 4.96544 8.50364V6.33455H1.77832C0.781267 8.32727 0.781267 11.0418 1.77832 13.0345L4.96544 12.1818Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.2 3.81818C11.3145 3.80091 12.3936 4.21091 13.2172 4.96909L16.7363 1.63636C14.6818 -0.272727 11.7181 -0.545455 9.27263 1.01818C6.82717 2.58182 5.73544 5.40636 6.78544 8.18182L10.2 3.81818Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9914_10">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </Button>
            {/* Divider */}
            <div className="relative w-full mb-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            {/* Email form */}
            <form onSubmit={handleMagicLinkSignIn} className="w-full">
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/80 focus:ring-2 focus:ring-indigo-400 border border-zinc-200 focus:border-indigo-500 placeholder:text-zinc-400 mb-3"
              />
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors mb-2"
                disabled={isSendingMagicLink}
              >
                {isSendingMagicLink ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isSignUpMode ? (
                  "Sign up with Email"
                ) : (
                  "Sign in with Email"
                )}
              </Button>
            </form>
            {/* Sign up link */}
            <div className="w-full text-center mt-2 text-sm">
              <span>
                {isSignUpMode
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  onClick={() => {
                    if (!isSignUpMode) {
                      trackAnalytics(ANALYTICS_EVENTS.SIGNUP_CLICKED);
                    }
                    setIsSignUpMode(!isSignUpMode);
                  }}
                  className="text-indigo-600 hover:underline focus:outline-none"
                >
                  {isSignUpMode ? "Log in" : "Sign up"}
                </button>
              </span>
            </div>
            {/* Error message (minimal) */}
            {errorMessage && (
              <div className="w-full text-center text-xs text-red-500 mt-2">
                {errorMessage}
              </div>
            )}
            {/* Magic link sent message (minimal) */}
            {magicLinkSent && (
              <div className="w-full text-center text-xs text-green-600 mt-2">
                Check your email for a sign-in link.
              </div>
            )}
          </div>
        </motion.div>
      </div>
      {/* Right: Three horizontal MediaScroller rows, responsive cards */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative z-10">
        <div className="flex flex-col justify-center gap-6 w-[900px]">
          {HERO_SAMPLES_GRID.map((row, idx) => (
            <div key={idx} className="w-full flex items-center max-h-[300px]">
              <MediaScroller
                media={row}
                direction={idx % 2 === 0 ? "left-to-right" : "right-to-left"}
                speed={1}
                gap={10}
                syncDirection={true}
                isSecondary={idx % 2 === 1}
                className="[&>div>div]:w-[13vw] [&>div>div]:max-w-[160px] [&>div>div]:min-w-[100px] [&>div>div]:aspect-[4/5] [&>div>div]:rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <p className="flex h-screen w-full items-center justify-center">
          Loading...
        </p>
      }
    >
      <LoginClientPage />
    </Suspense>
  );
}
