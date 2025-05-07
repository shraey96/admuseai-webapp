"use client";

import { useEffect } from "react";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Home",
    });
    router.push("/login");
  }, []);

  return <></>;
}
