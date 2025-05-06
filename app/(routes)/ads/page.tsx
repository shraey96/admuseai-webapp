"use client";

import { useEffect, useState } from "react";
import { useAds } from "@/hooks/useAds";
import AdTable from "@/components/ads/AdTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function AdsPage() {
  const { getAds, deleteAd } = useAds();
  const [allAds, setAllAds] = useState<Tables["ads"][]>([]);
  const [filteredAds, setFilteredAds] = useState<Tables["ads"][]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAds = async () => {
    setLoading(true);
    const result = await getAds();

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      setAllAds([]);
      setFilteredAds([]);
    } else {
      setAllAds(result.data);
      setFilteredAds(result.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = allAds.filter((ad) => {
      const nameMatch = ad.name?.toLowerCase().includes(lowerSearchTerm);
      const adTypeMatch = ad.ad_type?.toLowerCase().includes(lowerSearchTerm);
      return nameMatch || adTypeMatch;
    });
    setFilteredAds(filtered);
  }, [searchTerm, allAds]);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const result = await deleteAd(id);

    if (result.error) {
      setDeleting(null);
      return { success: false, error: result.error };
    }
    setAllAds((prev) => prev.filter((a) => a.id !== id));
    setFilteredAds((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
    return { success: true, error: null };
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 pb-4 border-b gap-4">
        <h1 className="text-3xl font-semibold">Your Ad Creatives</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or ad type..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex-shrink-0"
          >
            <Button asChild className="flex-shrink-0">
              <Link href="/ads/new">Create Ad</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <AdTable
        ads={filteredAds}
        onDelete={handleDelete}
        loading={loading || !!deleting}
      />
    </div>
  );
}
