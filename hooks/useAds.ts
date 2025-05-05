"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import type { Tables } from "@/lib/supabaseClient";
import { createAdWithImages } from "@/lib/api";
import { AdFormPayload } from "@/components/ads/AdForm";

type Ad = Tables["generated_ads"];
type AdInput = Omit<
  Ad,
  "id" | "user_id" | "status" | "created_at" | "updated_at" | "completed_at"
>;

export function useAds() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const getAds = async (
    brandId?: string
  ): Promise<{ data: Ad[]; error: string | null }> => {
    if (!user) return { data: [], error: "Not authenticated" };

    setIsLoading(true);

    try {
      let query = supabase
        .from("generated_ads")
        .select("*")
        .eq("user_id", user.id);

      if (brandId) {
        query = query.eq("brand_id", brandId);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        return { data: [], error: error.message };
      }

      return { data: data as Ad[], error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch ads";
      return { data: [], error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const getAd = async (
    adId: string
  ): Promise<{ data: Ad | null; error: string | null }> => {
    if (!user) return { data: null, error: "Not authenticated" };

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("generated_ads")
        .select("*")
        .eq("id", adId)

        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as Ad, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch ad";
      return { data: null, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const createAd = async (
    adData: AdFormPayload
  ): Promise<{ data: Ad | null; error: string | null }> => {
    if (!user) return { data: null, error: "Not authenticated" };

    setIsLoading(true);
    console.log(adData);
    try {
      // Use createAdWithImages from lib/api with the correct payload format
      const result = await createAdWithImages(adData);

      if (!result.success) {
        return { data: null, error: result.error || "Failed to create ad" };
      }

      return { data: result.ad as Ad, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create ad";
      return { data: null, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdStatus = async (
    adId: string,
    status: "completed" | "failed",
    data?: { result_urls?: string[]; error_message?: string }
  ): Promise<{ data: Ad | null; error: string | null }> => {
    if (!user) return { data: null, error: "Not authenticated" };

    setIsLoading(true);

    try {
      const now = new Date().toISOString();
      const updateData: Record<string, any> = {
        status,
        updated_at: now,
      };

      if (status === "completed") {
        updateData.completed_at = now;
        if (data?.result_urls) {
          updateData.result_urls = data.result_urls;
        }
      }

      if (status === "failed" && data?.error_message) {
        updateData.error_message = data.error_message;
      }

      const { data: updatedAd, error } = await supabase
        .from("generated_ads")
        .update(updateData)
        .eq("id", adId)

        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: updatedAd as Ad, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update ad status";
      return { data: null, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAd = async (
    adId: string
  ): Promise<{ success: boolean; error: string | null }> => {
    if (!user) return { success: false, error: "Not authenticated" };

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("delete-ad", {
        method: "DELETE",
        body: { adId },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete ad";
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateAd = async (
    adId: string,
    adData: Partial<AdInput>
  ): Promise<{ success: boolean; error: string | null; data: Ad | null }> => {
    if (!user)
      return { success: false, error: "Not authenticated", data: null };

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("generated_ads")
        .update({
          prompt: adData.prompt,
          brand_id: adData.brand_id || null,
          visual_style: adData.visual_style || null,
          ad_type: adData.ad_type || "image",
          dimensions: adData.dimensions || null,
          updated_at: new Date().toISOString(),
          name: adData.name,
          // Do not update status, result_urls, original_image_urls, credits_used or completed_at
        })
        .eq("id", adId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message, data: null };
      }

      return { success: true, error: null, data: data as Ad };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update ad";
      return { success: false, error: message, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAds,
    getAd,
    createAd,
    updateAd,
    updateAdStatus,
    deleteAd,
    isLoading,
  };
}
