"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Assuming shadcn/ui structure

interface PricingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planName: string;
  credits: number;
  price: number;
}

export function PricingConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  planName,
  credits,
  price,
}: PricingConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Purchase</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to purchase the <strong>{planName}</strong> plan,
            which includes <strong>{credits} Credits</strong> for{" "}
            <strong>${price}</strong>.
            <br />
            <br />
            You will be redirected to our secure payment processor to complete
            your purchase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Proceed to Payment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
