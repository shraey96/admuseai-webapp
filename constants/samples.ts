import { BASE_PROJECT_URL } from "@/constants/api";

export const SAMPLE_IMAGES = [
  {
    image: `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/cake_ad.png`,
    referenceImages: [
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/cake_product.png`,
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/cake_reference.png`,
    ],
    headline: "Sweet Dreams are Baked Here",
    description:
      "Indulge in our homemade chocolate cake — crafted with love, priced at just $25.",
    adType: "Direct Product Ad",
    visualStyle: "Soft Studio Lighting, Warm Tones",
    tone: "Homely, Rich, Comforting",
    generationPrompt:
      'Create 1 ad-ready image of a product named Crusty Cakes, described as Homemade chocolate cake, that reflects the following visual aesthetic: Warm Neutrals. Maintain the product\'s proportions, label placement, and design. Do not alter the label or shape. Format: 1080x1350. Reference Image Instructions: Replace objects in the image with my product. Extra instructions: In the top right corner, add the brand name "Crusty Cakes" in a cool, stylish font. Clearly display the price "$25" in a tasteful, modern way that fits the design. The overall feel should be clean, premium, and appealing—perfect for showcasing a handcrafted dessert. Result: https://eglwedwlixqeqiteygec.supabase.co/storage/v1/object/public/ai-generated-ads/ad-generation/results/15851b20-541d-4f78-bb4f-ba4bfa5a5e5d-generated-ad-1.png',
    templateUsed: "styled-product",
  },
  {
    image: `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/pearl_ad.png`,
    referenceImages: [
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/pearl_product.png`,
    ],
    headline: "Timeless. Graceful. You.",
    description:
      "Celebrate your elegance with Pekky Pearls — where beauty meets sophistication.",
    adType: "Portrait with Product",
    visualStyle: "Studio, High Contrast, Focused",
    tone: "Elegant, Warm, Personal",
    generationPrompt:
      "Create a photorealistic ad image for Pekky Pearls showing a Pearl Necklace being used or held by a South Indian Woman model in a Fashion Studio with black background during summer season. The image should feel urban chic, with high-key studio light and a natural gesture that demonstrates Wearing the pearl necklace, right index finger on chin, looking at camera, smiling. Keep proportions and label accuracy true to the original. Format: 1080x1350.",
    templateUsed: "product-with-person",
  },
  {
    image: `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/soda_ad.png`,
    referenceImages: [
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/soda_product.png`,
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/soda_reference.png`,
    ],
    headline: "Pop Open the Joy!",
    description:
      "Dive into the fizzy fun with Monto Cola — a playful twist on refreshment, releasing this summer.",
    adType: "Playful Product Visual",
    visualStyle: "Illustrated, Outdoor, Nature",
    tone: "Fun, Whimsical, Youthful",
    generationPrompt:
      "Create 1 ad-ready image of a product named Monto Cola, described as Monto Cola is finest soda in Germany, the can is red in color with apes dancing around in it and logo in green, that reflects the following visual aesthetic: Dewy Freshness. Maintain the product's proportions, label placement, and design. Do not alter the label or shape. Format: 1080x1350. Reference Image Instructions: Use images as style and layout inspiration. Extra instructions: Add the brand name to the top of the generated ad, making it look bold in a monstrous/devil handwriting. At the bottom right, say Releasing on 25th June 20205 in small font.",
    templateUsed: "product-in-environment",
  },
  {
    image: `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/skincare_ad.png`,
    referenceImages: [
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/skincare_product.png`,
    ],
    headline: "Softness, Bottled.",
    description:
      "Experience the gentle care of MEHU — natural skincare essentials for everyday radiance.",
    adType: "Clean Product Display",
    visualStyle: "Minimalist, Soft Light, Natural Materials",
    tone: "Calm, Gentle, Trustworthy",
    generationPrompt:
      "Create a static ad image for Mehu Essentials featuring a flat-lay arrangement of a curated Skincare bundle (3 items). Style the bundle as a premium gift offering placed on a bleached wood with Wooden box, using a warm contrast color scheme and organic arrangement. Lighting: soft overhead. All items should be balanced and intentional, maintaining a clean top-down view. No extra props or text. Extra instructions: Arrange all items from Mehu Essentials, keeping the middle one in the front, and the other 2 should be blurred a bit. The wooden box should be shot from the front angle and not the top.",
    templateUsed: "product-in-environment",
  },
  {
    image: `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/shoes_ad.png`,
    referenceImages: [
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/shoes_reference.png`,
    ],
    headline: "Move Bold. Wear XY.",
    description:
      "Designed for action and comfort — the ultimate blend of performance and street style.",
    adType: "Lifestyle Action Ad",
    visualStyle: "Urban Outdoor, Realistic Motion Shot",
    tone: "Energetic, Bold, Street-Savvy",
    generationPrompt:
      'Create an advertisement image featuring a man cycling, inspired by the attached reference photo. Focus clearly on the shoes, which should be stylish, black-toned, and prominently display the "XY" logo on the side. Match the lighting, vibe, and candid outdoor energy of the reference, but do not replicate the photo exactly. Ensure the shoes are the visual highlight, with the rest of the image supporting a modern, athletic lifestyle look.',
    templateUsed: "custom-prompt",
  },
  {
    image: `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/perfume_ad.png`,
    referenceImages: [
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/perfume_reference.png`,
      `${BASE_PROJECT_URL}/storage/v1/object/public/ai-generated-ads/ad-generation/samples/perfume_reference_1.png`,
    ],
    headline: "Luxury in Every Breath.",
    description:
      "The Exotica car perfume — elevate your drive with elegance and an unforgettable scent.",
    adType: "Luxury Placement Ad",
    visualStyle: "Premium Interior, Low-Light Contrast",
    tone: "Sophisticated, Sleek, Masculine",
    generationPrompt:
      'Create a classy advertisement image showcasing a black car perfume bottle labeled "Exotica" with a sleek, luxurious design and a golden top. The bottle should be clipped ontop of the AC vent of a Mercedes-Benz interior (use the attached car interior as reference). Take inspiration from the shape and aesthetic of the third reference bottle image to guide the look and elegance of the design. The setting should feel premium and sophisticated, with realistic lighting that highlights the texture of the bottle and the elegance of the Mercedes dashboard.',
    templateUsed: "custom-prompt",
  },
];
