import React, { useState } from "react";
import { Tables } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import DeleteAdDialog from "@/components/ads/DeleteAdDialog";
import { useToast } from "@/hooks/use-toast";
import AdItem from "./AdItem";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ads.map((ad) => (
          <AdItem key={ad.id} ad={ad} onDeleteClick={handleDeleteClick} />
        ))}
      </div>

      <DeleteAdDialog
        open={deleteDialogState.open}
        onOpenChange={(open) => setDeleteDialogState({ open, adId: null })}
        onConfirm={handleDeleteConfirm}
        isDeleting={!!loading}
      />
    </TooltipProvider>
  );
}

// Add fade-in animation
// In your global CSS (e.g., styles/globals.css or tailwind.css), add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: none;} }
// .animate-fade-in { animation: fade-in 0.5s both; }
