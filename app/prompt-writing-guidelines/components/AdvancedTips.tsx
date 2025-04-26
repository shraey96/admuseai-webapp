import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdvancedTips() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Advanced Techniques</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Level up your prompt writing with these professional tips and
          strategies for creating perfect ad images.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Iterative Refinement */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span> Iterative Refinement
          </h3>
          <div className="space-y-4">
            <p className="text-zinc-600">
              Start with a basic prompt and refine it step by step. Focus on one
              aspect at a time:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Badge variant="outline" className="mb-2">
                  Step 1: Foundation
                </Badge>
                <ul className="text-sm space-y-2 text-zinc-600">
                  <li>• Basic composition and layout</li>
                  <li>• Product placement and scale</li>
                  <li>• Overall framing and perspective</li>
                  <li>• Initial lighting setup</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Badge variant="outline" className="mb-2">
                  Step 2: Enhancement
                </Badge>
                <ul className="text-sm space-y-2 text-zinc-600">
                  <li>• Refine lighting and shadows</li>
                  <li>• Add atmospheric elements</li>
                  <li>• Adjust color grading</li>
                  <li>• Enhance product details</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Badge variant="outline" className="mb-2">
                  Step 3: Polish
                </Badge>
                <ul className="text-sm space-y-2 text-zinc-600">
                  <li>• Add brand elements</li>
                  <li>• Fine-tune text placement</li>
                  <li>• Adjust final composition</li>
                  <li>• Add finishing touches</li>
                </ul>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Pro Tip:</h4>
              <p className="text-sm text-zinc-600">
                Save each iteration of your prompt. This allows you to track
                changes and revert if needed. Use version numbers or timestamps
                in your prompt names for easy reference.
              </p>
            </div>
            <div className="bg-white border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Example Iteration Process:</h4>
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    Initial Prompt
                  </Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`Create an ad for our new perfume bottle`}
                  </pre>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    After Step 1
                  </Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`Create a centered composition featuring our new perfume bottle at 45-degree angle, occupying 60% of frame height`}
                  </pre>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    After Step 2
                  </Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`Create a centered composition featuring our new perfume bottle at 45-degree angle, occupying 60% of frame height. Use soft, diffused lighting from above with subtle rim lighting. Add a marble surface with a slight reflection.`}
                  </pre>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    Final Prompt
                  </Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`Create a centered composition featuring our new perfume bottle at 45-degree angle, occupying 60% of frame height. Use soft, diffused lighting from above with subtle rim lighting. Add a marble surface with a slight reflection. Place the brand logo in the top right corner at 10% of frame width. Add "Elegance Redefined" in Helvetica Light at the bottom, centered.`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pro Tips */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span> Pro Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Do's</h4>
              <ul className="space-y-2 text-zinc-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Use specific, descriptive terms for style and mood
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Include multiple reference images when needed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Specify exact measurements and positions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Break down complex scenes into clear components
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Consider the target audience and platform
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Use consistent terminology throughout
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Don'ts</h4>
              <ul className="space-y-2 text-zinc-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">×</span>
                  Use vague terms like "nice" or "good"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">×</span>
                  Overload the prompt with too many requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">×</span>
                  Forget to specify important brand elements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">×</span>
                  Assume the AI understands implied details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">×</span>
                  Mix different styles in one prompt
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">×</span>
                  Neglect to specify technical requirements
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Common Pitfalls to Avoid:</h4>
            <ul className="text-sm space-y-2 text-zinc-600">
              <li>• Inconsistent terminology across prompts</li>
              <li>• Unclear hierarchy of elements</li>
              <li>• Missing technical specifications</li>
              <li>• Overlooking platform-specific requirements</li>
              <li>• Not considering the final use case</li>
            </ul>
          </div>
          <div className="mt-4 bg-white border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Before & After Examples:</h4>
            <div className="space-y-4">
              <div>
                <Badge variant="destructive" className="mb-2">
                  Vague Prompt
                </Badge>
                <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                  {`Create a nice ad for our perfume with good lighting`}
                </pre>
              </div>
              <div>
                <Badge className="mb-2">Improved Prompt</Badge>
                <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                  {`Create a premium product shot of our Luxe Perfume bottle at a 45-degree angle, using soft diffused lighting from above. Position the bottle in the center-right of the frame, occupying 60% of the height. Include a marble surface with a subtle reflection. Add the brand logo in the top right corner at 10% of frame width.`}
                </pre>
              </div>
            </div>
          </div>
        </Card>

        {/* Keywords and Phrases */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Power Keywords
          </h3>
          <div className="space-y-4">
            <p className="text-zinc-600">
              Use these powerful keywords to enhance your prompts:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Badge className="mb-2">Lighting</Badge>
                <ul className="text-sm space-y-1">
                  <li>High-key</li>
                  <li>Soft diffused</li>
                  <li>Dramatic</li>
                  <li>Natural</li>
                  <li>Rim lighting</li>
                  <li>Backlit</li>
                  <li>Golden hour</li>
                  <li>Low-key</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Badge className="mb-2">Composition</Badge>
                <ul className="text-sm space-y-1">
                  <li>Rule of thirds</li>
                  <li>Centered</li>
                  <li>Dynamic angle</li>
                  <li>Balanced</li>
                  <li>Leading lines</li>
                  <li>Negative space</li>
                  <li>Symmetrical</li>
                  <li>Asymmetrical</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Badge className="mb-2">Style</Badge>
                <ul className="text-sm space-y-1">
                  <li>Minimalist</li>
                  <li>Premium</li>
                  <li>Editorial</li>
                  <li>Lifestyle</li>
                  <li>Vintage</li>
                  <li>Modern</li>
                  <li>Artistic</li>
                  <li>Commercial</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Badge className="mb-2">Mood</Badge>
                <ul className="text-sm space-y-1">
                  <li>Vibrant</li>
                  <li>Elegant</li>
                  <li>Energetic</li>
                  <li>Serene</li>
                  <li>Luxurious</li>
                  <li>Playful</li>
                  <li>Sophisticated</li>
                  <li>Dramatic</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Keyword Combination Tips:</h4>
              <ul className="text-sm space-y-2 text-zinc-600">
                <li>
                  • Combine lighting and mood keywords for emotional impact
                </li>
                <li>
                  • Pair composition and style keywords for visual harmony
                </li>
                <li>
                  • Use technical keywords with style keywords for precision
                </li>
                <li>
                  • Mix and match keywords from different categories for unique
                  results
                </li>
              </ul>
            </div>
            <div className="mt-4 bg-white border p-4 rounded-lg">
              <h4 className="font-medium mb-2">
                Example Keyword Combinations:
              </h4>
              <div className="space-y-4">
                <div>
                  <Badge className="mb-2">Premium Product Shot</Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`"Soft diffused lighting" + "Centered composition" + "Premium style" + "Elegant mood"`}
                  </pre>
                </div>
                <div>
                  <Badge className="mb-2">Dynamic Lifestyle Shot</Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`"Natural lighting" + "Rule of thirds" + "Lifestyle style" + "Energetic mood"`}
                  </pre>
                </div>
                <div>
                  <Badge className="mb-2">Artistic Editorial</Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`"Dramatic lighting" + "Asymmetrical composition" + "Artistic style" + "Sophisticated mood"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
