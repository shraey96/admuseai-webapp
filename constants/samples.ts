import { BUCKET_URL } from "@/constants/api";

const SAMPLE_IMAGES_PATH = `${BUCKET_URL}/samples`;

export const SAMPLE_IMAGES = [
  {
    image: `${SAMPLE_IMAGES_PATH}/cake_ad.png`,
    referenceImages: [
      `${SAMPLE_IMAGES_PATH}/cake_product.png`,
      `${SAMPLE_IMAGES_PATH}/cake_reference.png`,
    ],
    headline: "Sweet Dreams are Baked Here",
    description:
      "Indulge in our homemade chocolate cake — crafted with love, priced at just $25.",
    adType: "Direct Product Ad",
    visualStyle: "Soft Studio Lighting, Warm Tones",
    tone: "Homely, Rich, Comforting",
    generationPrompt:
      'Create 1 ad-ready image of a product named Crusty Cakes, described as Homemade chocolate cake, that reflects the following visual aesthetic: Warm Neutrals. Maintain the product\'s proportions, label placement, and design. Do not alter the label or shape. Format: 1080x1350. Reference Image Instructions: Replace objects in the image with my product. Extra instructions: In the top right corner, add the brand name "Crusty Cakes" in a cool, stylish font. Clearly display the price "$25" in a tasteful, modern way that fits the design. The overall feel should be clean, premium, and appealing—perfect for showcasing a handcrafted dessert.',
    templateUsed: "styled-product",
  },
  {
    image: `${SAMPLE_IMAGES_PATH}/soda_ad.png`,
    referenceImages: [
      `${SAMPLE_IMAGES_PATH}/soda_product.png`,
      `${SAMPLE_IMAGES_PATH}/soda_reference.png`,
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
    image: `${SAMPLE_IMAGES_PATH}/chocolate_shake_ad.png`,
    referenceImages: [`${SAMPLE_IMAGES_PATH}/chocolate_shake_reference.png`],
    headline: "THIS ISN’T A SNACK",
    description:
      "Introducing Nouriva — a complete, balanced meal in a bottle. Chocolate flavor, high in protein, fiber, and satisfaction.",
    adType: "New Product Launch",
    visualStyle: "Minimalist, Soft Beige Background, Centered Product",
    tone: "Bold, Clean, Modern",
    generationPrompt:
      "Create a visually striking static ad image for Nouriva designed to highlight a new product launch or announcement. Use a clean, minimalist layout with a soft beige background. Place the Nouriva bottle vertically in the center. At the top, display the headline: 'This Isn’t a Snack' in bold uppercase sans-serif. Beneath it, add: 'It’s Your Whole Meal.' At the bottom, include the CTA: 'Fuel Your Day with Cocoa.' Keep the composition clean and distraction-free with soft diffused lighting.",
    templateUsed: "marketing-promo",
  },
  {
    image: `${SAMPLE_IMAGES_PATH}/sorbet_ad.png`,
    referenceImages: [`${SAMPLE_IMAGES_PATH}/sorbet_reference.png`],
    headline: "Real Fruit. Real Joy.",
    description:
      "ZestyBite Mango Sorbet bursts with real mango and passionfruit flavor — every scoop a tropical escape.",
    adType: "New Product Launch",
    visualStyle: "Playful, Bright Gradient, Floating Fruit Elements",
    tone: "Fun, Fresh, Flavorful",
    generationPrompt:
      "Create a visually striking static ad image for ZestyBite designed to highlight a new product launch or announcement. Use a bright yellow-orange gradient background. Place the ZestyBite sorbet tub at the bottom center. Surround it with floating mango and passionfruit slices mid-air, bursting outward. Show the headline 'Real Fruit. Real Joy.' near the top in a friendly, rounded font, with 'Every scoop is a tropical escape.' beneath. Add a soft glow or sparkles to enhance the fruit explosion. Keep the design clean, joyful, and energetic.",
    templateUsed: "marketing-promo",
  },
  {
    image: `${SAMPLE_IMAGES_PATH}/pearl_ad.png`,
    referenceImages: [`${SAMPLE_IMAGES_PATH}/pearl_product.png`],
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
    image: `${SAMPLE_IMAGES_PATH}/skincare_ad.png`,
    referenceImages: [`${SAMPLE_IMAGES_PATH}/skincare_product.png`],
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
    image: `${SAMPLE_IMAGES_PATH}/s17.png`,
    referenceImages: [],
    headline: "“It’s like waking up in a cozy cabin — every single morning.”",
    description:
      "Emma J. shares her love for BrewHaven Coffee, captured in a peaceful, lifestyle-inspired scene.",
    adType: "Customer Testimonial Ad",
    visualStyle: "Lifestyle, Cozy Cabin Setting, Natural Light, Warm Tones",
    tone: "Comforting, Warm, Authentic",
    generationPrompt:
      "Create a visually striking static ad image for BrewHaven Coffee designed to highlight a customer testimonial. Include a woman holding a rustic coffee mug while sitting on her sofa. Use soft morning light, a warm color palette, and clean serif typography to place the quote: 'It’s like waking up in a cozy cabin — every single morning.' – Emma J.",
    templateUsed: "marketing-promo",
  },
  {
    image: `${SAMPLE_IMAGES_PATH}/s8.png`,
    referenceImages: [`${SAMPLE_IMAGES_PATH}/s8_reference.png`],
    headline: "Move Freely. Look Sharp.",
    description:
      "StrideOne CoreFlex – performance sneakers built for everyday freedom and city style.",
    adType: "Urban Lifestyle Ad",
    visualStyle: "Golden Hour, Rooftop, Streetwear Chic",
    tone: "Confident, Aspirational, Natural",
    generationPrompt:
      "Create a photorealistic ad image for StrideOne showing a lightweight performance sneakers – CoreFlex edition being used or held by a young Black woman model in a urban rooftop at golden hour during summer season. The image should feel urban chic, with golden hour and a natural gesture that demonstrates walking confidently toward the camera, showing off the sneakers. Include background elements: city skyline, rooftop textures. Keep proportions and label accuracy true to the original. Format: 1024x1536.",
    templateUsed: "product-with-person",
  },
  // {
  //   image: `${SAMPLE_IMAGES_PATH}/shoes_ad.png`,
  //   referenceImages: [
  //     `${SAMPLE_IMAGES_PATH}/shoes_product.png`,
  //     `${SAMPLE_IMAGES_PATH}/shoes_reference.png`,
  //   ],
  //   headline: "Move Bold. Wear XY.",
  //   description:
  //     "Designed for action and comfort — the ultimate blend of performance and street style.",
  //   adType: "Lifestyle Action Ad",
  //   visualStyle: "Urban Outdoor, Realistic Motion Shot",
  //   tone: "Energetic, Bold, Street-Savvy",
  //   generationPrompt:
  //     'Create an advertisement image featuring a man cycling, inspired by the attached reference photo. Focus clearly on the shoes, which should be stylish, black-toned, and prominently display the "XY" logo on the side. Match the lighting, vibe, and candid outdoor energy of the reference, but do not replicate the photo exactly. Ensure the shoes are the visual highlight, with the rest of the image supporting a modern, athletic lifestyle look.',
  //   templateUsed: "custom-prompt",
  // },
  // {
  //   image: `${SAMPLE_IMAGES_PATH}/perfume_ad.png`,
  //   referenceImages: [
  //     `${SAMPLE_IMAGES_PATH}/perfume_reference.png`,
  //     `${SAMPLE_IMAGES_PATH}/perfume_reference_1.png`,
  //   ],
  //   headline: "Luxury in Every Breath.",
  //   description:
  //     "The Exotica car perfume — elevate your drive with elegance and an unforgettable scent.",
  //   adType: "Luxury Placement Ad",
  //   visualStyle: "Premium Interior, Low-Light Contrast",
  //   tone: "Sophisticated, Sleek, Masculine",
  //   generationPrompt:
  //     'Create a classy advertisement image showcasing a black car perfume bottle labeled "Exotica" with a sleek, luxurious design and a golden top. The bottle should be clipped ontop of the AC vent of a Mercedes-Benz interior (use the attached car interior as reference). Take inspiration from the shape and aesthetic of the third reference bottle image to guide the look and elegance of the design. The setting should feel premium and sophisticated, with realistic lighting that highlights the texture of the bottle and the elegance of the Mercedes dashboard.',
  //   templateUsed: "custom-prompt",
  // },
  // {
  //   image: `${SAMPLE_IMAGES_PATH}/home_ad.png`,
  //   referenceImages: [`${SAMPLE_IMAGES_PATH}/home_product.jpeg`],
  //   headline: "Modern Elegance at its Best",
  //   description:
  //     "Imagine this bright, open space with your personal touch. Stylish furniture and a serene atmosphere await.",
  //   adType: "Styled-Product",
  //   visualStyle: "Soft Lighting, Clean Design",
  //   tone: "Elegant, Fresh, Bright",
  //   generationPrompt:
  //     "Create 1 ad-ready image of a product named Modern Elegance, described as a bright, open living room with neutral tones and natural light, that reflects the following visual aesthetic: Clean and Elegant. Maintain the room’s proportions, layout, and structure. Do not alter any existing features such as windows, walls, or flooring. Format: 1080x1350. Reference Image Instructions: Add contemporary furniture and decor that complements the room’s airy, light-filled atmosphere. Extra instructions: Use soft lighting to create a refined, elegant feel.",
  //   templateUsed: "styled-product",
  // },
  {
    image: `${SAMPLE_IMAGES_PATH}/s16.png`,
    referenceImages: [`${SAMPLE_IMAGES_PATH}/s16_reference.png`],
    headline: "LuxeGlow Spa – Service Menu",
    description:
      "Discover serenity with our signature treatments, crafted for total relaxation and rejuvenation.",
    adType: "Service Menu Display",
    visualStyle: "Neutral Palette, Zen-Inspired Accents, Elegant Layout",
    tone: "Professional, Calming, Premium",
    generationPrompt:
      "Create a visually striking static ad image for LuxeGlow Spa designed to highlight a menu or service listing. Use an elegant vertical layout with subtle dividing lines. Place a calming background image featuring spa stones, flowers, and candles. Maintain a neutral color palette and luxurious fonts. List all treatments with pricing clearly.",
    templateUsed: "marketing-promo",
  },
  {
    image: `${SAMPLE_IMAGES_PATH}/s18.png`,
    referenceImages: [`${SAMPLE_IMAGES_PATH}/s18_reference.png`],
    headline: "Get 30% Off",
    description:
      "Limited-time offer on GlowCare Serum — your daily dose of radiance in a bottle.",
    adType: "Promotional Discount Banner",
    visualStyle: "Gradient Background, Bold Typography, Product-Centric",
    tone: "Energetic, Direct, Promotional",
    generationPrompt:
      "Create a glowing digital ad for GlowCare serum with a centered amber dropper bottle. Use a vibrant pink-to-purple gradient as the background. Feature bold, eye-catching text promoting a 30% discount. Ensure the product is clearly highlighted with good lighting and a focus on label visibility.",
    templateUsed: "marketing-promo",
  },

  {
    image: `${SAMPLE_IMAGES_PATH}/s14.png`,
    referenceImages: [],
    headline: "Style, Redefined.",
    description:
      "Step into the future of hair fashion with SALONS TODAY — where bold looks and expert tips set the trend.",
    adType: "Magazine Cover Editorial",
    visualStyle: "Modern Salon Interior, Bold Colors, Studio Lighting",
    tone: "Confident, Trendy, Professional",
    generationPrompt: ` Create an aesthetically compelling, inviting cover for a travel guide titled "Discover India." Visually highlight iconic and culturally distinctive elements of Kyoto, such as serene temples, indian monuments, the holy places, indian tourist spots etc. Incorporate a sophisticated yet inviting color palette. Clearly display the title "Discover India" prominently, with subtle typography featuring the tagline: "An Insider’s Guide to India."`,
    templateUsed: "custom-prompt",
  },
];
