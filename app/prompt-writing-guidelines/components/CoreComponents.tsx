import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, Palette, Box, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CoreComponents() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Essential Components of Effective Prompts
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Master these core elements to create prompts that consistently
              generate high-quality ad images.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual References */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <ImageIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Visual References
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    Always include reference images when possible. They
                    communicate style, composition, and mood more effectively
                    than text descriptions.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <Badge className="mb-2">Best Practice</Badge>
                    <p className="text-sm">
                      "Use Image 1 as layout inspiration, maintaining the
                      composition but replacing the product with our bottle. For
                      optimal results, ensure reference images have similar
                      lighting conditions and color schemes to your desired
                      outcome."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Style Direction */}
            <div className="p-6 bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-100 rounded-lg">
                  <Palette className="w-8 h-8 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Style Direction
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    Be specific about lighting, mood, and aesthetic. Clear style
                    guidance leads to more consistent results.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <Badge className="mb-2">Best Practice</Badge>
                    <p className="text-sm">
                      "Create a high-key studio shot with soft overhead lighting
                      and a clean, minimal aesthetic. Consider the emotional
                      impact - use warm tones for approachability or cool tones
                      for sophistication."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Box className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Product Details
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    Clearly specify how your product should be presented,
                    including placement, angle, and key features to highlight.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <Badge className="mb-2">Best Practice</Badge>
                    <p className="text-sm">
                      "Position the bottle at a 45-degree angle, ensuring the
                      logo is clearly visible and the metallic cap catches the
                      light. Consider the product's scale in relation to the
                      frame - typically 40-60% of frame height for optimal
                      visual balance."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Elements */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Layers className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Brand Elements</h3>
                  <p className="text-zinc-600 mb-4">
                    Include specific instructions for brand assets, text
                    placement, and maintaining brand consistency.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <Badge className="mb-2">Best Practice</Badge>
                    <p className="text-sm">
                      "Add the brand name in Helvetica font at the top right,
                      maintaining our minimalist black and white color scheme.
                      Ensure there's a clear hierarchy - logo should be
                      prominent but not overshadow the product itself."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
