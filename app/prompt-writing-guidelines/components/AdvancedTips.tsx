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

        {/* Template-Based Approach */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📝</span> Template-Based Approach
          </h3>
          <div className="space-y-4">
            <p className="text-zinc-600">
              Use this proven template structure for consistent results:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">
                {`Create an ad image for [Product Name] that:

1. STYLE: [Describe visual style, lighting, mood]
- Lighting: [Type, direction, quality]
- Color Palette: [Primary, secondary, accent]
- Mood: [Atmosphere, emotional impact]
- Environment: [Setting, background]

2. COMPOSITION: [Specify layout, angles, focal points]
- Framing: [Rule of thirds, centered, etc.]
- Perspective: [Viewing angle, distance]
- Scale: [Product size in frame]
- Depth: [Foreground/background elements]

3. PRODUCT: [Detail product placement and highlights]
- Position: [Exact placement in frame]
- Angle: [Viewing perspective]
- Focus: [Key features to highlight]
- Context: [Environmental interaction]

4. BRANDING: [Specify text, logos, brand elements]
- Logo: [Placement, size, variant]
- Typography: [Font, size, weight]
- Colors: [HEX/RGB values]
- Layout: [Spacing, margins]

5. TECHNICAL: [Set aspect ratio, resolution, format]
- Dimensions: [Width x Height]
- Resolution: [DPI/PPI]
- Format: [File type]
- Post-processing: [Effects, adjustments]`}
              </pre>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Template Usage Tips:</h4>
              <ul className="text-sm space-y-2 text-zinc-600">
                <li>• Copy and customize this template for each new project</li>
                <li>• Fill in all sections, even if some seem obvious</li>
                <li>• Use specific measurements and values where possible</li>
                <li>• Include reference images for each major section</li>
              </ul>
            </div>
            <div className="bg-white border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Example Filled Template:</h4>
              <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                {`Create an ad image for "Luxe Perfume" that:

1. STYLE:
- Lighting: Soft, diffused overhead lighting with subtle rim lighting
- Color Palette: Primary #2C3E50, Secondary #E74C3C, Accent #F1C40F
- Mood: Elegant, sophisticated, premium
- Environment: Minimalist studio setup with marble surface

2. COMPOSITION:
- Framing: Centered composition with rule of thirds
- Perspective: 45-degree angle, slightly elevated
- Scale: Product occupies 60% of frame height
- Depth: Shallow depth of field, subtle background blur

3. PRODUCT:
- Position: Centered, slightly to the right
- Angle: 45-degree view showing front and side
- Focus: Highlight metallic cap and glass texture
- Context: Sitting on marble surface with subtle reflection

4. BRANDING:
- Logo: Top right corner, 10% of frame width
- Typography: Helvetica Light 24pt for headline
- Colors: Use brand colors (#2C3E50, #E74C3C)
- Layout: 20px margin from edges, 40px between elements

5. TECHNICAL:
- Dimensions: 1200x1200 pixels
- Resolution: 300 DPI
- Format: PNG with transparency
- Post-processing: Subtle vignette, slight contrast boost`}
              </pre>
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

        {/* Advanced Techniques */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span> Advanced Techniques
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Layering Techniques</h4>
                <ul className="text-sm space-y-2 text-zinc-600">
                  <li>• Use multiple reference images for different aspects</li>
                  <li>• Combine style references with product references</li>
                  <li>
                    • Layer lighting references with composition references
                  </li>
                  <li>• Mix brand guidelines with style references</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Technical Specifications</h4>
                <ul className="text-sm space-y-2 text-zinc-600">
                  <li>• Specify exact dimensions and resolution</li>
                  <li>• Define color profiles and spaces</li>
                  <li>• Set compression and quality parameters</li>
                  <li>• Include format-specific requirements</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">
                Platform-Specific Considerations:
              </h4>
              <ul className="text-sm space-y-2 text-zinc-600">
                <li>
                  • Social media: Consider aspect ratios and mobile viewing
                </li>
                <li>• Print: Account for bleed and resolution requirements</li>
                <li>• Web: Optimize for different screen sizes</li>
                <li>• Video: Plan for motion and transitions</li>
              </ul>
            </div>
            <div className="bg-white border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Example Layered References:</h4>
              <div className="space-y-4">
                <div>
                  <Badge className="mb-2">Reference 1: Composition</Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`"Use the centered composition and rule of thirds from this reference, but with our product"`}
                  </pre>
                </div>
                <div>
                  <Badge className="mb-2">Reference 2: Lighting</Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`"Apply the soft, diffused lighting style from this reference"`}
                  </pre>
                </div>
                <div>
                  <Badge className="mb-2">Reference 3: Brand Elements</Badge>
                  <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {`"Incorporate the typography and logo placement from our brand guidelines"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Comprehensive Example */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎨</span> Comprehensive Example
          </h3>
          <div className="space-y-4">
            <div className="bg-white border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Complete Prompt Example:</h4>
              <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                {`Create a premium product advertisement for "Luxe Perfume" that follows these specifications:

1. STYLE & MOOD:
- Lighting: Soft, diffused overhead lighting (similar to Reference Image 1) with subtle rim lighting to create depth
- Color Palette: Primary #2C3E50 (deep navy), Secondary #E74C3C (coral accent), Accent #F1C40F (gold)
- Mood: Elegant, sophisticated, premium with a touch of warmth
- Environment: Minimalist studio setup with polished marble surface (like Reference Image 2)
- Atmosphere: Clean, airy, and luxurious with a slight golden glow

2. COMPOSITION & FRAMING:
- Layout: Rule of thirds with product slightly off-center to the right
- Perspective: 45-degree angle, slightly elevated (matching Reference Image 3)
- Scale: Product occupies 60% of frame height
- Depth: Shallow depth of field (f/2.8) with subtle background blur
- Negative Space: Generous white space on the left side for text
- Balance: Weighted towards the right side with product

3. PRODUCT DETAILS:
- Position: Centered-right, 40% from right edge
- Angle: 45-degree view showing front and side of bottle
- Focus: Highlight metallic cap and glass texture
- Details: Ensure liquid level is visible and bubbles are captured
- Reflection: Subtle reflection on marble surface
- Scale: Bottle height = 60% of frame height

4. BRAND ELEMENTS:
- Logo: Top right corner, 10% of frame width, white version
- Typography: 
* Headline: "Elegance Redefined" in Helvetica Light 24pt
* Subhead: "The Essence of Luxury" in Helvetica Regular 18pt
* Body: Product description in Helvetica Light 14pt
- Colors: Strict adherence to brand colors (#2C3E50, #E74C3C)
- Layout: 
* 20px margin from edges
* 40px between elements
* Text aligned to left margin
- Additional: Subtle brand pattern in background at 5% opacity

5. TECHNICAL SPECIFICATIONS:
- Dimensions: 1200x1200 pixels (1:1 aspect ratio)
- Resolution: 300 DPI for print quality
- Format: PNG with transparency
- Color Space: sRGB
- Post-processing:
* Subtle vignette (20% opacity)
* Slight contrast boost (+10%)
* Sharpening for product details
* Color grading to match brand palette

6. REFERENCE IMAGES:
- Image 1: Lighting reference (soft, diffused studio lighting)
- Image 2: Surface reference (polished marble texture)
- Image 3: Composition reference (product angle and framing)
- Image 4: Brand guidelines (typography and logo placement)

7. PLATFORM CONSIDERATIONS:
- Primary: Instagram feed (1:1)
- Secondary: Website hero (16:9)
- Mobile: Optimize for 1080px width
- Print: Include 3mm bleed

8. ADDITIONAL NOTES:
- Ensure product is the hero of the image
- Maintain brand consistency across all elements
- Focus on premium feel and luxury aesthetic
- Avoid cluttering the composition
- Keep text minimal and impactful`}
              </pre>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Why This Works:</h4>
              <ul className="text-sm space-y-2 text-zinc-600">
                <li>
                  • Combines all advanced techniques in one cohesive prompt
                </li>
                <li>• Provides specific measurements and values</li>
                <li>
                  • Includes multiple reference images for different aspects
                </li>
                <li>
                  • Considers technical and platform-specific requirements
                </li>
                <li>• Maintains brand consistency throughout</li>
                <li>
                  • Balances creative direction with technical specifications
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
