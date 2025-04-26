import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PromptStructure() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Anatomy of a Perfect Prompt</h2>
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold mb-2">Basic Structure</h3>
            <pre className="bg-white p-4 rounded-md">
              {`Create an ad image for [Product Name] that:
1. Uses [Reference Image] as inspiration
2. Features [Product Details]
3. Maintains [Style/Aesthetic]
4. Includes [Brand Elements]`}
            </pre>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="visual" className="border rounded-lg">
              <AccordionTrigger className="px-4">
                Visual References
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-zinc-600">
                    Reference images are the foundation of successful ad
                    generation. They provide concrete visual guidance that text
                    alone cannot convey.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">
                      Types of Reference Images to Include:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                      <li>
                        <span className="font-medium">Layout References:</span>{" "}
                        Show the desired composition, spacing, and overall
                        arrangement
                      </li>
                      <li>
                        <span className="font-medium">Style References:</span>{" "}
                        Demonstrate the visual aesthetic, lighting, and mood
                      </li>
                      <li>
                        <span className="font-medium">Product References:</span>{" "}
                        Clear shots of your product from multiple angles
                      </li>
                      <li>
                        <span className="font-medium">Brand References:</span>{" "}
                        Examples of brand elements and typography
                      </li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">Reference Image Handling:</h4>
                    <ul className="space-y-2 text-zinc-600">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        Upload a reference layout image (the ad you want to
                        emulate)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        Upload your actual product photo separately
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        The AI model automatically understands what you want to
                        swap in or emphasize
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        You can upload screenshots of your website, logos, past
                        ads for brand continuity
                      </li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">Pro Tip:</h4>
                    <p className="text-zinc-600">
                      If you're uploading multiple references, label them in
                      your prompt:
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm font-medium text-emerald-600">
                        Example: "Use Image 1 for product image. Use Image 2 for
                        layout inspiration."
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">Best Practices:</h4>
                    <ul className="space-y-2 text-zinc-600">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        Use high-quality, clear images without text overlays
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        Provide multiple references for complex requests
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        Label references clearly (e.g., "Use Image 1 for layout,
                        Image 2 for lighting")
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        Include both aspirational references and practical
                        examples
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Example Prompt Structure:
                    </h4>
                    <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                      {`Reference Image Instructions:
1. Layout: Follow the composition of Reference 1, maintaining the rule of thirds
2. Lighting: Match the soft, diffused lighting seen in Reference 2
3. Style: Adapt the minimal, clean aesthetic from Reference 3
4. Product: Replace the example product with our product, maintaining similar scale and positioning`}
                    </pre>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Real-World Example:</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600">
                        <span className="font-medium">Goal:</span> Create a
                        luxury perfume ad
                      </p>
                      <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                        {`Reference Images:
1. Use Image 1 (high-end fashion magazine spread) for overall composition and lighting
2. Use Image 2 (our product photo) for accurate bottle details and branding
3. Use Image 3 (brand website screenshot) for typography and color scheme

Prompt:
"Create a luxury perfume ad that:
- Follows the composition of Image 1, with the bottle positioned at the rule of thirds intersection
- Maintains the soft, diffused lighting from Image 1, creating subtle shadows
- Uses our product photo (Image 2) as the main subject, ensuring the gold cap catches the light
- Incorporates our brand typography and color scheme from Image 3
- Adds a subtle gradient background in our brand colors
- Includes our logo in the bottom right corner at 10% of frame width"`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Example Prompts Without Reference Images:
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <Badge className="mb-2">Luxury Product Shot</Badge>
                        <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                          {`Create a premium product shot for our "Elegance" Perfume by Maison de Luxe that:
- Uses soft, diffused overhead lighting with subtle rim lighting
- Positions the bottle at a 45-degree angle, showing both front and side
- Places the product at the rule of thirds intersection (bottom right)
- Occupies 60% of frame height
- Features a marble surface with a subtle reflection
- Includes the Maison de Luxe logo in the top right corner at 10% of frame width
- Uses our brand colors (#2C3E50 for background, #E74C3C for accents)
- Maintains a minimalist aesthetic with ample negative space
- Adds a subtle vignette effect (20% opacity)
- Ensures the gold cap catches the light and creates a warm glow`}
                        </pre>
                      </div>

                      <div>
                        <Badge className="mb-2">Lifestyle Product Shot</Badge>
                        <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                          {`Create a lifestyle product shot for our "Active Essentials" collection by Athletica that:
- Uses natural, golden-hour lighting from the side
- Shows the products in a modern, minimalist bedroom setting
- Arranges items in a balanced composition using the rule of thirds
- Includes a person (mid-20s, athletic build) interacting with the products
- Captures the products in use (folding clothes, trying on items)
- Uses a warm color palette (#F5F5F5 background, #2C3E50 accents)
- Maintains a clean, aspirational lifestyle aesthetic
- Includes subtle motion blur to suggest activity
- Adds depth with foreground and background elements
- Ensures the Athletica logo is visible but not dominant`}
                        </pre>
                      </div>

                      <div>
                        <Badge className="mb-2">Food Product Shot</Badge>
                        <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                          {`Create a mouthwatering food shot for our "Artisan Collection" Dark Chocolate by Cocoa & Co. that:
- Uses soft, diffused lighting from above and slightly behind
- Positions the chocolate at a 45-degree angle on a marble surface
- Shows the product's texture and shine with careful lighting
- Includes a shallow depth of field (f/2.8) to make the product pop
- Uses a warm, rich color palette (#2C3E50 background, #E74C3C accents)
- Adds a subtle steam effect to suggest freshness
- Includes a small portion of the Cocoa & Co. packaging to show branding
- Maintains a premium, artisanal aesthetic
- Ensures the chocolate's texture and shine are clearly visible
- Adds a subtle reflection on the marble surface`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="style" className="border rounded-lg">
              <AccordionTrigger className="px-4">
                Style Direction
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-zinc-600">
                    Style direction encompasses the visual language of your ad.
                    Being precise about style elements ensures the AI
                    understands your creative vision.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Badge>Effective Style Description</Badge>
                      <p className="mt-2 text-sm text-zinc-600">
                        "Create a high-key studio shot with soft overhead
                        lighting, pure white background, and subtle shadows.
                        Maintain a premium, minimalist aesthetic with clean
                        lines and ample negative space."
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Badge variant="destructive">Avoid This</Badge>
                      <p className="mt-2 text-sm text-zinc-600">
                        "Make it look professional and nice with good lighting
                        and a clean look." (Too vague, lacks specific direction)
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">
                      Key Style Elements to Specify:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Lighting</h5>
                        <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-1">
                          <li>Direction (overhead, side, front)</li>
                          <li>Quality (soft, harsh, diffused)</li>
                          <li>Temperature (warm, cool, neutral)</li>
                          <li>Shadows (soft, sharp, none)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Atmosphere</h5>
                        <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-1">
                          <li>Mood (energetic, calm, luxurious)</li>
                          <li>Time of day (morning, evening)</li>
                          <li>Season (summer freshness, winter cozy)</li>
                          <li>Setting (studio, outdoor, lifestyle)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Style Specification Template:
                    </h4>
                    <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                      {`Style Specifications:
1. Lighting: [Type] lighting from [Direction] with [Quality] shadows
2. Color Palette: [Primary], [Secondary], [Accent] colors
3. Mood: [Atmosphere] feeling with [Style] aesthetic
4. Environment: [Setting] with [Details] and [Props]
5. Post-Processing: [Effects] and [Adjustments]`}
                    </pre>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Real-World Example:</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600">
                        <span className="font-medium">Goal:</span> Create a tech
                        product ad
                      </p>
                      <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                        {`Style Direction:
"Create a modern tech ad with:
- High-key lighting from above and slightly behind the product
- Cool, blue-tinted lighting to emphasize the product's sleek design
- Minimalist composition with the product centered
- Dark, gradient background (from #1a1a1a to #2a2a2a)
- Subtle lens flare effect to highlight the product's premium feel
- Clean, sans-serif typography in white
- Ample negative space to create a sense of luxury and sophistication"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="product" className="border rounded-lg">
              <AccordionTrigger className="px-4">
                Product Placement
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-zinc-600">
                    Product placement is crucial for creating effective ads.
                    Every detail about how your product is presented should be
                    carefully specified.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">
                      Essential Product Details to Specify:
                    </h4>
                    <ul className="space-y-3 text-zinc-600">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">
                          Position
                        </Badge>
                        <div>
                          <p className="font-medium">
                            Exact placement in the frame
                          </p>
                          <p className="text-sm">
                            Example: "Center-right, occupying 40% of frame
                            height"
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">
                          Angle
                        </Badge>
                        <div>
                          <p className="font-medium">Viewing perspective</p>
                          <p className="text-sm">
                            Example: "45-degree angle showing front and side,
                            tilted slightly upward"
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">
                          Focus
                        </Badge>
                        <div>
                          <p className="font-medium">
                            Key features to highlight
                          </p>
                          <p className="text-sm">
                            Example: "Ensure logo is clearly visible, highlight
                            metallic finish"
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">
                          Context
                        </Badge>
                        <div>
                          <p className="font-medium">
                            Environmental interaction
                          </p>
                          <p className="text-sm">
                            Example: "Product casting natural shadow on marble
                            surface"
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">
                      Advanced Placement Techniques:
                    </h4>
                    <ul className="space-y-2 text-zinc-600">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600">•</span>
                        Use the rule of thirds for dynamic compositions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600">•</span>
                        Create depth with foreground/background elements
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600">•</span>
                        Utilize leading lines to draw attention
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600">•</span>
                        Balance negative space for visual impact
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Product Placement Template:
                    </h4>
                    <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                      {`Product Placement Details:
1. Position: [Location in frame] at [Scale]% of frame
2. Angle: [Viewing angle] with [Rotation] degrees
3. Focus Areas: Highlight [Feature 1], [Feature 2]
4. Environment: [Surface type] with [Props/Context]
5. Lighting Focus: [Key light] highlighting [Specific area]`}
                    </pre>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Real-World Example:</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600">
                        <span className="font-medium">Goal:</span> Create a
                        watch ad
                      </p>
                      <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                        {`Product Placement:
"Position the watch in the frame as follows:
- Place the watch at a 45-degree angle, showing both the face and band
- Position it at the rule of thirds intersection (bottom right)
- Ensure the watch face occupies 30% of the frame height
- Highlight the metallic finish with directional lighting
- Include a subtle reflection on a polished surface
- Add a shallow depth of field to make the watch pop
- Ensure the brand logo on the face is clearly visible
- Include a small portion of the band to show the premium leather texture"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brand" className="border rounded-lg">
              <AccordionTrigger className="px-4">
                Brand Elements
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-zinc-600">
                    Brand elements ensure your ad maintains consistent identity
                    and messaging. Every visual component should align with your
                    brand guidelines.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">
                      Brand Components to Specify:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">
                          Visual Elements
                        </h5>
                        <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-1">
                          <li>Logo placement and size</li>
                          <li>Color palette adherence</li>
                          <li>Typography hierarchy</li>
                          <li>Graphic elements/patterns</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">
                          Text Elements
                        </h5>
                        <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-1">
                          <li>Headline positioning</li>
                          <li>Font styles and sizes</li>
                          <li>Tagline placement</li>
                          <li>Call-to-action format</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">Brand Consistency Tips:</h4>
                    <ul className="space-y-2 text-zinc-600">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Maintain consistent spacing around logo and text
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Use exact brand color codes (HEX/RGB values)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Follow minimum size requirements for logos
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Respect clear space around brand elements
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Brand Elements Template:
                    </h4>
                    <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                      {`Brand Guidelines:
1. Logo: [Position] at [Size]px, [Color] variant
2. Typography: [Font] for headlines at [Size]pt, [Weight]
3. Colors: Primary [HEX], Secondary [HEX], Accent [HEX]
4. Layout: [Spacing] between elements, [Margins] from edges
5. Additional: [Patterns/Graphics] at [Opacity]%`}
                    </pre>
                  </div>

                  <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Real-World Example:</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600">
                        <span className="font-medium">Goal:</span> Create a
                        brand-consistent ad
                      </p>
                      <pre className="text-sm text-zinc-600 whitespace-pre-wrap">
                        {`Brand Elements:
"Incorporate brand elements as follows:
- Place the logo in the top right corner at 15% of frame width
- Use our primary brand color (#FF5733) for the background gradient
- Apply our brand font (Montserrat) for all text elements
- Include our tagline 'Innovate. Create. Elevate.' in the bottom left
- Add our signature pattern as a subtle watermark
- Maintain our brand's minimalist aesthetic
- Use our approved brand spacing guidelines (2rem from edges)
- Include our brand's signature shadow style for depth"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
