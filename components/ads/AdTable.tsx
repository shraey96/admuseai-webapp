import React, { useState } from "react";
import { Tables } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Download,
} from "lucide-react";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadImage } from "@/lib/utils";
import DeleteAdDialog from "@/components/ads/DeleteAdDialog";
import { useToast } from "@/hooks/use-toast";

interface AdTableProps {
  ads: Tables["ads"][];
  onDelete: (id: string) => Promise<{ success: boolean; error: string | null }>;
  loading?: boolean;
}

export default function AdTable({ ads, onDelete, loading }: AdTableProps) {
  const [deleteDialogState, setDeleteDialogState] = useState<{
    open: boolean;
    adId: string | null;
  }>({
    open: false,
    adId: null,
  });
  const { toast } = useToast();

  const handleDeleteClick = (adId: string) => {
    setDeleteDialogState({ open: true, adId });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialogState.adId) {
      const result = await onDelete(deleteDialogState.adId);
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Ad deleted successfully",
        });
      }
      setDeleteDialogState({ open: false, adId: null });
    }
  };

  if (loading && ads.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No ads found
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ads.map((ad) => {
          const hasImage = ad.result_urls && ad.result_urls.length > 0;
          const imageUrl = hasImage ? ad.result_urls[0] : null;
          return (
            <Card
              key={ad.id}
              className="shadow-lg rounded-2xl border border-gray-200 bg-white animate-fade-in p-0 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full aspect-square rounded-t-2xl overflow-hidden bg-muted">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={ad.name || "Ad image"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="h-10 w-10 mb-1 text-gray-400" />
                    <span className="text-xs">No generated images yet</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between p-5">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-base font-semibold font-sans line-clamp-1 mb-0">
                    {ad.name || "Untitled Ad"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-blue-100"
                          asChild
                        >
                          <Link href={`/ads/${ad.id}`}>
                            <Pencil className="h-4 w-4 text-blue-600" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Ad</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-red-100"
                          onClick={() => handleDeleteClick(ad.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete Ad</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                {/* Download Button */}
                {imageUrl && (
                  <Button
                    variant="outline"
                    className="w-full mt-2 flex items-center justify-center gap-2"
                    onClick={() =>
                      downloadImage(imageUrl, `${ad.name || "ad-image"}.png`)
                    }
                  >
                    <Download className="h-4 w-4" /> Download
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <DeleteAdDialog
        open={deleteDialogState.open}
        onOpenChange={(open) => setDeleteDialogState({ open, adId: null })}
        onConfirm={handleDeleteConfirm}
        isDeleting={loading}
      />
    </TooltipProvider>
  );
}

// Add fade-in animation
// In your global CSS (e.g., styles/globals.css or tailwind.css), add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: none;} }
// .animate-fade-in { animation: fade-in 0.5s both; }
