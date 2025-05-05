import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";

function ReviewStep({
  prompt,
  setPrompt,
  numImages,
  setNumImages,
  requiredCredits,
  maxImages,
}: {
  prompt: string;
  setPrompt: (val: string) => void;
  numImages: number;
  setNumImages: (val: number) => void;
  requiredCredits: number;
  maxImages: number;
}) {
  const handleNumImagesChange = (val: number) => {
    if (val > maxImages) {
      setNumImages(maxImages);
    } else if (val < 1) {
      setNumImages(1);
    } else {
      setNumImages(val);
    }
  };

  return (
    <>
      <div className="mb-6">
        <label className="text-sm font-medium mb-1 block flex items-center gap-1">
          Generated Prompt
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0} className="cursor-pointer">
                  <Info className="h-4 w-4 text-gray-400" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white">
                <p className="max-w-[200px] text-sm">
                  The prompt that will be sent to the AI for ad generation. You
                  can edit it for more control.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Textarea
          className="min-h-[180px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block flex items-center gap-1">
            Number of Variations to Generate
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="cursor-pointer">
                    <Info className="h-4 w-4 text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  <p className="max-w-[200px] text-sm">
                    How many different ad images you want to generate in this
                    batch. Each variation uses credits.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <Input
            type="number"
            min={1}
            max={maxImages}
            value={numImages}
            onChange={(e) => handleNumImagesChange(Number(e.target.value))}
            className="w-32"
            disabled={maxImages === 0}
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block flex items-center gap-1">
            Required Credits
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="cursor-pointer">
                    <Info className="h-4 w-4 text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  <p className="max-w-[200px] text-sm">
                    Total credits that will be consumed for this operation. Each
                    variation costs credits.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <Input
            type="number"
            value={requiredCredits}
            disabled
            className="w-32 bg-muted text-muted-foreground"
          />
        </div>
      </div>
    </>
  );
}

export default ReviewStep;
