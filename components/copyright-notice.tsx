import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CopyrightNoticeProps {
  isTooltip?: boolean;
}

export default function CopyrightNotice({
  isTooltip = false,
}: CopyrightNoticeProps) {
  const content = (
    <div className="text-sm space-y-2">
      <p>
        While you can draw inspiration from existing works, please avoid direct
        use of:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Copyrighted characters, logos, trademarks, or brand names</li>
        <li>Specific protected works or intellectual property</li>
        <li>Trademarked terms or brand-specific language</li>
      </ul>
      <p className="text-xs mt-3">
        Instead, focus on the themes, styles, and concepts that inspire you, and
        express them in your own unique way using descriptive language.
      </p>
    </div>
  );

  if (isTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
            <Info className="h-4 w-4 text-gray-400" />
            <span className="ml-1 text-xs">Copyright Guidelines</span>
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white w-[400px] p-4">
          <h3 className="text-sm font-semibold mb-2">Copyright Guidelines</h3>
          {content}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Card className="bg-white shadow-sm border-gray-100">
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Copyright Guidelines
        </h3>
        {content}
      </CardContent>
    </Card>
  );
}
