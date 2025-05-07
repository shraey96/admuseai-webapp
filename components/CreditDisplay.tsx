"use client";

import { useRouter } from "next/navigation";
import { useCredits } from "@/context/CreditContext";
import { Button } from "@/components/ui/button";
import { BadgePlus, Coins, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function CreditDisplay() {
  const { credits, isLoading } = useCredits();

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Loading credits...
      </div>
    );
  }

  const isLowOnCredits = credits === 0;

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center rounded-full border bg-accent/30 px-3 py-1 text-sm font-medium">
              <Coins className="mr-1 h-4 w-4 text-primary" />
              <span>{credits} Credits</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Your available credits</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        size="sm"
        variant={isLowOnCredits ? "default" : "outline"}
        className={cn(
          "gap-1",
          isLowOnCredits &&
            "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-yellow-950 border-yellow-500 dark:border-yellow-600"
        )}
        onClick={() => router.push("/pricing")}
      >
        <BadgePlus className="h-4 w-4" />
        <span className="hidden sm:inline">Top Up</span>
      </Button>
    </div>
  );
}
