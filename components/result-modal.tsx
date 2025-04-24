"use client";

import Modal from "@/components/ui/modal";
import ResultScreen from "./result-screen";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  onGenerateAnother: () => void;
}

export default function ResultModal({
  isOpen,
  onClose,
  images,
  onGenerateAnother,
}: ResultModalProps) {
  const handleGenerateAnother = () => {
    onGenerateAnother();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="max-w-2xl w-full"
      overlayClassName="pt-10 items-start md:items-center"
    >
      <ResultScreen images={images} onGenerateAnother={handleGenerateAnother} />
    </Modal>
  );
}
