"use client";

import { useEffect, useState } from "react";
import { useAds } from "@/hooks/useAds";
import AdTable from "@/components/ads/AdTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/lib/supabaseClient";

export default function AdsPage() {
  const { getAds, deleteAd } = useAds();
  const [ads, setAds] = useState<Tables["ads"][]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchAds = async () => {
    setLoading(true);
    const result = await getAds();

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setAds(result.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const result = await deleteAd(id);

    if (result.error) {
      setDeleting(null);
      return { success: false, error: result.error };
    }

    setAds((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
    return { success: true, error: null };
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ads</h1>
        <Button asChild>
          <Link href="/ads/new">Create Ad</Link>
        </Button>
      </div>
      <AdTable
        ads={ads}
        onDelete={handleDelete}
        loading={loading || !!deleting}
      />
    </div>
  );
}
