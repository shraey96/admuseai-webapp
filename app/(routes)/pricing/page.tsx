"use client";

import React, { useEffect } from "react";
import { useCredits } from "@/context/CreditContext";
import PricingView from "@/components/pricing/pricing-view";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function PricingPage() {
  const { credits } = useCredits();

  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Pricing",
      current_credits: credits,
    });
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <p className="text-lg text-gray-700">
          Current Credits:{" "}
          <span className="font-bold text-indigo-600">{credits}</span>
        </p>
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Choose Your Credit Pack
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Select a credit pack that suits your needs and start creating amazing
          ads.
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <PricingView />
      </div>
    </div>
  );
}
