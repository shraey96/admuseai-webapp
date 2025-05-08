"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCredits } from "@/context/CreditContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ImagePlus,
  History,
  TrendingUp,
  AlertCircle,
  Type,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getTemplateName } from "@/lib/prompt-wizard-config";
import { useAds } from "@/hooks/useAds";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

interface DashboardStats {
  totalAds: number;
  totalBrands: number;
  recentActivity: any[];
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { credits } = useCredits();
  const { getAds, isLoading: adsLoading } = useAds();
  const [stats, setStats] = useState<DashboardStats>({
    totalAds: 0,
    totalBrands: 0,
    recentActivity: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Track page view
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Dashboard",
    });

    async function fetchStats() {
      if (!user) {
        setStats({ totalAds: 0, totalBrands: 0, recentActivity: [] });
        setError(null);
        return;
      }

      setError(null);
      try {
        const { data: adsData, error: adsError } = await getAds();

        if (adsError) {
          throw new Error(adsError);
        }

        // For totalBrands, assuming you have a 'brands' table or a way to count them
        // This is a placeholder count. Replace with actual logic if available.
        const brandsCount = 0;

        setStats({
          totalAds: adsData?.length || 0,
          totalBrands: brandsCount,
          recentActivity: adsData?.slice(0, 5) || [],
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setStats({
          totalAds: 0,
          totalBrands: 0,
          recentActivity: [],
        });
      }
    }

    fetchStats();
  }, []);

  const animationProps = {
    animate: {
      scale: [1, 1.03, 1],
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
    className: "flex-shrink-0",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-sans tracking-tight">
          Dashboard
        </h1>

        <div className="flex gap-2">
          <motion.div {...animationProps}>
            <Button asChild>
              <Link
                href="/ads/new"
                onClick={() =>
                  trackAnalytics(ANALYTICS_EVENTS.DASHBOARD_CREATE_AD_CLICKED, {
                    section: "recent_activity",
                  })
                }
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Create Ad
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg rounded-2xl border border-gray-200 bg-white animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ImagePlus className="h-4 w-4 text-blue-500" /> Total Ads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans">
              {adsLoading ? "..." : stats.totalAds}
            </div>
          </CardContent>
        </Card>
        {/* <Card className="shadow-lg rounded-2xl border border-gray-200 bg-white animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TagIcon className="h-4 w-4 text-purple-500" /> Total Brands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans">
              {isLoading ? "..." : stats.totalBrands}
            </div>
          </CardContent>
        </Card> */}
        <Card className="shadow-lg rounded-2xl border border-gray-200 bg-white animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" /> Available
              Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans">{credits}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="col-span-1 shadow-lg rounded-2xl border border-gray-200 bg-white animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your most recent ads</CardDescription>
          </CardHeader>
          <CardContent>
            {adsLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading recent activity...
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">
                <AlertCircle className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">Error: {error}</p>
              </div>
            ) : stats.recentActivity.length === 0 ? (
              <div className="py-8 text-center">
                <History className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No ads created yet</p>
                <motion.div
                  {...animationProps}
                  className={`${animationProps.className} mt-4 inline-block`}
                >
                  <Button asChild>
                    <Link
                      href="/ads/new"
                      onClick={() =>
                        trackAnalytics(
                          ANALYTICS_EVENTS.DASHBOARD_CREATE_AD_CLICKED,
                          {
                            section: "recent_activity",
                          }
                        )
                      }
                    >
                      Create Your First Ad
                    </Link>
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentActivity.map((ad) => {
                  const templateName = ad.ad_type
                    ? getTemplateName(ad.ad_type)
                    : "N/A";
                  return (
                    <Link
                      key={ad.id}
                      href={`/ads/${ad.id}`}
                      passHref
                      className="block"
                      onClick={() =>
                        trackAnalytics(ANALYTICS_EVENTS.DASHBOARD_AD_CLICKED, {
                          ad_id: ad.id,
                          ad_name: ad.name,
                        })
                      }
                    >
                      <div className="flex items-center gap-4 border p-3 rounded-lg hover:bg-gray-50 cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-150">
                        {ad.result_urls && ad.result_urls[0] ? (
                          <img
                            src={ad.result_urls[0]}
                            alt={ad.prompt}
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium">{ad.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center mt-1">
                            <Type className="h-3 w-3 mr-1 text-sky-500" />
                            <span>{templateName}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {new Date(ad.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              ad.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : ad.status === "failed"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}
                          >
                            {ad.status}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* <Card className="col-span-1 shadow-lg rounded-2xl border border-gray-200 bg-white animate-fade-in">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/brands/new" className="block">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="lg"
              >
                <TagIcon className="mr-2 h-4 w-4" />
                Create New Brand
              </Button>
            </Link>

            <Link href="/ads/new" className="block">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="lg"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Generate New Ad
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>

            {credits < 2 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    You're running low on credits. Top up to continue creating
                    ads.
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
