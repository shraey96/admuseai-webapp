"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAds } from "@/hooks/useAds";
import AdWizard from "@/components/ads/AdWizard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/lib/supabaseClient";
import { useCredits } from "@/context/CreditContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import DeleteAdDialog from "@/components/ads/DeleteAdDialog";
import ResultModal from "@/components/result-modal";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function AdEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";
  const { getAd, createAd, deleteAd, isLoading } = useAds();
  const { refreshCredits } = useCredits();
  const [ad, setAd] = useState<Tables["ads"] | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const [showResultModal, setShowResultModal] = useState(false);
  const [generatedImageUrls, setGeneratedImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // Track page view
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: isNew ? "Create New Ad" : "Edit Ad",
      ad_id: isNew ? null : id,
    });

    if (!isNew) {
      setFetching(true);
      getAd(id).then((result) => {
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
          return;
        }
        setAd(result.data);
        setFetching(false);
      });
    }
    // eslint-disable-next-line
  }, [id, isNew]);

  const handleSubmit = async (values: any) => {
    const payload = {
      ...values,
    };

    if (!isNew) {
      if (payload.images?.length === 0) {
        payload.images = [
          ...(ad?.original_image_urls || []),
          ...(ad?.result_urls || []),
        ];
      }
      payload.adType = ad?.ad_type;

      if (values.name !== ad?.name) {
        payload.name = values.name;
      } else {
        payload.name = `${payload.name}_${Date.now()}`;
      }
    }

    // Track ad creation attempt
    trackAnalytics(ANALYTICS_EVENTS.AD_CREATION_INITIATED, {
      is_new: isNew,
      ad_type: payload.adType,
      with_images: payload.images && payload.images.length > 0,
    });

    const result = await createAd(payload);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      await refreshCredits();

      toast({ title: "Ad created" });

      // Show the result modal with the generated images
      if (
        result.data &&
        result.data.images &&
        Array.isArray(result.data.images)
      ) {
        setGeneratedImageUrls(result.data.images);
        setShowResultModal(true);
      } else {
        // Fallback if images are not in the expected format, navigate to ads list
        console.error(
          "Generated images not found in the expected format in the response:",
          result.data
        );
        router.push("/ads");
      }
    }
  };

  const handleDelete = async () => {
    if (!ad) return;
    setDeleting(true);

    // Keep this as it tracks user intent
    trackAnalytics(ANALYTICS_EVENTS.AD_DELETION_INITIATED, {
      ad_id: ad.id,
      ad_name: ad.name,
      ad_type: ad.ad_type,
    });

    const result = await deleteAd(ad.id);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({ title: "Ad deleted" });
      router.push("/ads");
    }
    setDeleting(false);
    setShowDeleteDialog(false);
  };

  const handleCloseResultModal = () => {
    // Keep this as it tracks user intent/journey
    trackAnalytics(ANALYTICS_EVENTS.RESULT_MODAL_CLOSED);
    setShowResultModal(false);
    router.push("/ads");
  };

  const handleGenerateAnotherFromResults = () => {
    // Keep this as it tracks user intent
    trackAnalytics(ANALYTICS_EVENTS.GENERATE_ANOTHER_FROM_RESULTS_CLICKED);
    setShowResultModal(false);
    router.push("/ads/new");
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" size="sm" className="mb-2" asChild>
              <Link
                href="/ads"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Ads
              </Link>
            </Button>

            <h1 className="text-3xl font-bold mt-2">
              {isNew ? "Create Ad" : "Regenerate Ad"}
            </h1>
          </div>
          {ad && (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleting}
              size="sm"
            >
              {deleting ? "Deleting..." : "Delete Ad"}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <AdWizard
                isNew={isNew}
                initialValues={
                  ad
                    ? {
                        prompt: ad.prompt,
                        imageUrls: [
                          ...ad.original_image_urls,
                          ...ad.result_urls,
                        ],
                        name: ad.name,
                        brandId: ad.brand_id || undefined,
                        adType: ad.ad_type,
                        dimensions: ad.dimensions || undefined,
                      }
                    : undefined
                }
                onSubmit={handleSubmit}
                loading={isLoading}
              />
            </div>
          </div>
          <div>
            <Card className="shadow-lg border border-border/40 max-w-sm p-4">
              <CardHeader>
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div className="space-y-1">
                  <p className="font-medium">Quality Images</p>
                  <p className="text-muted-foreground">
                    Upload high-quality product images for best results.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Detailed Prompts</p>
                  <p className="text-muted-foreground">
                    Include lighting, background, mood, and style information.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Multiple Variations</p>
                  <p className="text-muted-foreground">
                    Generate different versions by adjusting the number of
                    samples.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <DeleteAdDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={deleting}
      />
      {showResultModal && (
        <ResultModal
          isOpen={showResultModal}
          onClose={handleCloseResultModal}
          images={generatedImageUrls}
          onGenerateAnother={handleGenerateAnotherFromResults}
        />
      )}
    </div>
  );
}
