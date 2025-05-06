"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import ResultScreen from "./result-screen";
import { trackAnalytics } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import ConfettiPortal from "./ui/confetti-portal";
interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  onGenerateAnother: () => void;
  withConfetti?: boolean;
}

export default function ResultModal({
  isOpen,
  onClose,
  images,
  onGenerateAnother,
  withConfetti = true,
}: ResultModalProps) {
  const handleDirectClose = () => {
    onClose();
  };

  const handleDirectGenerateAnother = () => {
    trackAnalytics(ANALYTICS_EVENTS.GENERATE_AD_CLICKED);
    onGenerateAnother();
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !open && handleDirectClose()}
      >
        <DialogContent className="max-w-2xl w-full pt-10 items-start md:items-center">
          <ResultScreen
            images={images}
            onGenerateAnother={handleDirectGenerateAnother}
          />
        </DialogContent>
      </Dialog>
      {withConfetti && <ConfettiPortal show={true} />}
    </>
  );
}
