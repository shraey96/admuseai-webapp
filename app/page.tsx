"use client";

import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";
import { useEffect } from "react";
import "./globals.css";

export default function Home() {
  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Home",
    });
  }, []);

  return <></>;
}
