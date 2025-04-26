import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wand2, ImageIcon, Palette, Box, Layers } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface PromptStructureProps {
  onViewExamples: () => void;
}

export default function PromptStructure({
  onViewExamples,
}: PromptStructureProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Getting Started with AdMuseAI
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Learn how to create effective prompts for your ads using our
              platform. Follow these simple steps to get started.
            </p>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4">Quick Start Guide</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Upload Your Images</h4>
                  <p className="text-zinc-600">
                    Upload your product photos and any reference images that
                    inspire your desired style.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Choose Your Approach</h4>
                  <p className="text-zinc-600">
                    Select a pre-made template or write a custom prompt to
                    describe your desired ad.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Generate Your Ad</h4>
                  <p className="text-zinc-600">
                    Click generate and let our AI create your perfect ad based
                    on your inputs.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/" className="w-full">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Try It Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Platform Tools */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-rose-100/60 rounded-2xl">
                  <ImageIcon className="w-10 h-10 text-rose-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Templates</h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Browse our collection of pre-made templates for quick and
                    easy ad generation.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-white hover:bg-gray-50"
                    onClick={onViewExamples}
                  >
                    View Templates & Examples
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Structure */}
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold mb-2">Basic Prompt Structure</h3>
            <pre className="bg-white p-4 rounded-md">
              {`Create an ad image that:
1. Features [Your Product]
2. Matches the style of [Reference Image/Template]
3. Includes [Key Product Details]
4. Uses [Brand Elements] (optional)`}
            </pre>
          </div>

          {/* Detailed Guide */}
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="visual" className="border rounded-lg">
              <AccordionTrigger className="px-4">
                Visual References
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-zinc-600">
                    Reference images help our AI understand your vision. Upload
                    clear, high-quality images for best results.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">Types of Reference Images:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                      <li>
                        <span className="font-medium">Layout References:</span>{" "}
                        Show the desired composition and arrangement
                      </li>
                      <li>
                        <span className="font-medium">Style References:</span>{" "}
                        Demonstrate the visual aesthetic and mood
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
                    Choose a style that matches your brand and product. Our
                    platform offers various pre-defined styles to choose from.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Badge>Popular Styles</Badge>
                      <ul className="mt-2 text-sm text-zinc-600 space-y-2">
                        <li>• Minimalist & Clean</li>
                        <li>• Luxury & Premium</li>
                        <li>• Modern & Tech</li>
                        <li>• Natural & Organic</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Badge>Custom Style</Badge>
                      <p className="mt-2 text-sm text-zinc-600">
                        Upload your own reference image to create a custom style
                        that matches your brand.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="product" className="border rounded-lg">
              <AccordionTrigger className="px-4">
                Product Details
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-zinc-600">
                    Tell us about your product and how you want it to be
                    presented in the ad.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">Key Details to Specify:</h4>
                    <ul className="space-y-3 text-zinc-600">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">
                          Position
                        </Badge>
                        <div>
                          <p className="font-medium">
                            Where should the product be placed?
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
                          <p className="font-medium">
                            How should it be viewed?
                          </p>
                          <p className="text-sm">
                            Example: "45-degree angle showing front and side"
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">
                          Focus
                        </Badge>
                        <div>
                          <p className="font-medium">
                            What features should be highlighted?
                          </p>
                          <p className="text-sm">
                            Example: "Ensure logo is clearly visible"
                          </p>
                        </div>
                      </li>
                    </ul>
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
                    Add your brand elements to maintain consistency across your
                    ads.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium">Brand Elements to Include:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">
                          Visual Elements
                        </h5>
                        <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-1">
                          <li>Logo placement</li>
                          <li>Brand colors</li>
                          <li>Typography</li>
                          <li>Graphic elements</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">
                          Text Elements
                        </h5>
                        <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-1">
                          <li>Headline</li>
                          <li>Tagline</li>
                          <li>Call-to-action</li>
                        </ul>
                      </div>
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
