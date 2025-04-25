// Type definitions
type FieldType = "text" | "dropdown" | "radio" | "textarea";

interface FieldOption {
  label: string;
  value: string;
  description?: string;
}

interface BaseField {
  label: string;
  name: string;
  type: FieldType;
  optional?: boolean;
  tooltip?: string;
}

interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
}

interface TextareaField extends BaseField {
  type: "textarea";
  placeholder?: string;
  rows?: number;
}

interface DropdownField extends BaseField {
  type: "dropdown";
  options: FieldOption[];
}

interface RadioField extends BaseField {
  type: "radio";
  options: FieldOption[];
}

type Field = TextField | DropdownField | RadioField | TextareaField;

interface Step {
  step: number;
  title: string;
  description?: string;
  fields: Field[];
}

interface TemplateConfig {
  steps: Step[];
  generatePrompt: (values: Record<string, any>) => string;
}

// Template descriptions
export const templateDescriptions: Record<
  string,
  { short: string; detailed: string }
> = {
  "product-in-environment": {
    short:
      "Showcase your product in a styled environment with real-world context.",
    detailed:
      "Perfect for lifestyle shots that place your product in a real-world context, highlighting its use and aesthetic appeal in carefully curated environments.",
  },
  "styled-product": {
    short:
      "Focus on your product with artistic flair in a professional setting.",
    detailed:
      "Ideal for highlighting product details, textures, and design elements in a clean, professional setting. Best for showcasing premium products and their unique features.",
  },
  "product-with-person": {
    short: "Show how customers interact with your product in real scenarios.",
    detailed:
      "Great for showing how customers interact with your product, creating relatable and engaging marketing content. Perfect for demonstrating product usage and building trust.",
  },
  "flat-lay": {
    short: "Create an organized, top-down arrangement of your products.",
    detailed:
      "Perfect for showcasing product collections, bundles, or multiple items in a clean, Instagram-worthy layout. Ideal for product sets and visual storytelling.",
  },
};

// Global steps shared across all templates
export const globalSteps: Step[] = [
  {
    step: 2,
    title: "Product Basics",
    description: "Enter product details",
    fields: [
      {
        label: "Product Name",
        name: "productName",
        type: "text",
        placeholder: "Enter your product name",
        tooltip: "The name of your product as it should appear in the ad",
      },
      {
        label: "Product Type",
        name: "productType",
        type: "text",
        placeholder: "e.g., serum bottle, candle",
        tooltip: "Describe the physical form of your product",
      },
      {
        label: "Orientation",
        name: "orientation",
        type: "radio",
        options: [
          { label: "Portrait (1080x1350)", value: "portrait" },
          { label: "Landscape (1350x1080)", value: "landscape" },
        ],
        tooltip:
          "Choose the aspect ratio for your ad. Portrait is taller, Landscape is wider",
      },
    ],
  },
];

// Final fields to be added to the last step of each template
export const finalFields: Field[] = [
  {
    label: "Extra Instructions (Optional)",
    name: "extraInstructions",
    type: "textarea",
    optional: true,
    placeholder: "Add any additional instructions or requirements",
    tooltip: "Optional additional instructions for the image generation",
    rows: 4,
  },
];

// Create template selection step
const templateSelectionStep: Step = {
  step: 1,
  title: "Template Selection",
  description: "Choose a template style",
  fields: [],
};

// Template-specific configurations
export const templates: Record<string, TemplateConfig> = {
  "product-in-environment": {
    steps: [
      {
        step: 3,
        title: "Environment Setup",
        description: "Configure the environment",
        fields: [
          {
            label: "Surface Type",
            name: "surfaceType",
            type: "dropdown",
            options: [
              { label: "Marble", value: "marble" },
              { label: "Wood", value: "wood" },
              { label: "Linen", value: "linen" },
              { label: "Ceramic", value: "ceramic" },
              { label: "Quartz", value: "quartz" },
              { label: "Bleached Wood", value: "bleached wood" },
              { label: "Honed Stone", value: "honed stone" },
            ],
            tooltip: "The material surface where your product will be placed",
          },
          {
            label: "Environment",
            name: "location",
            type: "dropdown",
            options: [
              { label: "Bathroom Vanity", value: "bathroom vanity" },
              { label: "Kitchen Counter", value: "kitchen counter" },
              { label: "Floating Shelf", value: "floating shelf" },
              { label: "Luxury Vanity", value: "luxury vanity" },
              { label: "Bedside Table", value: "bedside table" },
              { label: "Spa Bathroom", value: "spa bathroom" },
              { label: "Minimalist Interior", value: "minimalist interior" },
            ],
            tooltip: "The setting where your product will be showcased",
          },
          {
            label: "Mood / Style",
            name: "moodStyle",
            type: "dropdown",
            options: [
              { label: "Cozy", value: "cozy" },
              { label: "Luxury", value: "luxury" },
              { label: "Clean", value: "clean" },
              { label: "Elegant", value: "elegant" },
              { label: "Calm", value: "calm" },
              { label: "Fresh", value: "fresh" },
              { label: "Modern", value: "modern" },
            ],
            tooltip: "The overall atmosphere and feeling of the scene",
          },
        ],
      },
      {
        step: 4,
        title: "Styling Details",
        description: "Add styling elements",
        fields: [
          {
            label: "Lighting Style",
            name: "lightingStyle",
            type: "dropdown",
            options: [
              { label: "Soft Natural Light", value: "soft natural light" },
              { label: "Evening Light", value: "evening light" },
              { label: "Sunlight from Side", value: "sunlight from side" },
              { label: "Morning Light", value: "morning light" },
              { label: "Window Shadows", value: "window shadows" },
              { label: "Backlighting", value: "backlighting" },
              {
                label: "Indirect Window Light",
                value: "indirect window light",
              },
            ],
            tooltip:
              "The type of lighting that will illuminate your product and scene",
          },
          {
            label: "Decor Element 1 (optional)",
            name: "decor1",
            type: "text",
            optional: true,
            placeholder: "e.g., fresh flowers, books, rolled towels",
            tooltip: "Additional elements to enhance the scene (optional)",
          },
          {
            label: "Color / Texture",
            name: "colorTexture",
            type: "dropdown",
            options: [
              { label: "Beige Tones", value: "beige tones" },
              { label: "Stone Texture", value: "stone texture" },
              { label: "Light Beige", value: "light beige" },
              { label: "Neutral Wall", value: "neutral wall" },
              { label: "Warm Tones", value: "warm tones" },
            ],
            tooltip: "The color scheme and texture elements in the scene",
          },
        ],
      },
    ],
    generatePrompt: (values) => {
      return `Create a photorealistic static ad image for the brand ${
        values.productName
      } featuring a ${values.productType} placed on a ${
        values.surfaceType
      } in a ${values.location}.
The environment should feel ${values.moodStyle}, featuring:
– ${values.lightingStyle}
${values.decor1 ? `– ${values.decor1}\n` : ""}${
        values.colorTexture ? `– ${values.colorTexture}` : ""
      }
The product should be the hero of the image. Format: ${
        values.orientation === "portrait" ? "1080x1350" : "1350x1080"
      }.`;
    },
  },
  "styled-product": {
    steps: [
      {
        step: 3,
        title: "Visual Style",
        description: "Configure visual style",
        fields: [
          {
            label: "Product Description",
            name: "productDescription",
            type: "text",
            placeholder: "Describe your product's key features",
            tooltip:
              "Describe the key features and characteristics of your product",
          },
          {
            label: "Shooting Style",
            name: "shootingStyle",
            type: "dropdown",
            options: [
              {
                label: "Nordic Calm",
                value: "Nordic Calm",
                description:
                  "light oak wood, white backdrops, soft textures, natural shadows",
              },
              {
                label: "Warm Neutrals",
                value: "Warm Neutrals",
                description:
                  "beige and taupe palette, soft morning light, cotton textures",
              },
              {
                label: "Reflective Glow",
                value: "Reflective Glow",
                description:
                  "high-gloss surfaces, polished marble textures, sharp reflections",
              },
              {
                label: "Desert Organic",
                value: "Desert Organic",
                description:
                  "sunbaked clay tones, textured stone surfaces, warm dusty light",
              },
              {
                label: "Dewy Freshness",
                value: "Dewy Freshness",
                description:
                  "water droplets, light blue glass, cool tones, high contrast lighting",
              },
              {
                label: "Earthy Luxury",
                value: "Earthy Luxury",
                description:
                  "warm light, natural textures (linen, wood, stone)",
              },
            ],
            tooltip:
              "Choose a visual style that best represents your product's aesthetic",
          },
        ],
      },
    ],
    generatePrompt: (values) => {
      return `Create 1 ad-ready image of a product named ${
        values.productName
      }, described as ${
        values.productDescription
      }, that reflects the following visual aesthetic: ${values.shootingStyle}.
Maintain the product's proportions, label placement, and design. Do not alter the label or shape. Format: ${
        values.orientation === "portrait" ? "1080x1350" : "1350x1080"
      }.`;
    },
  },
  "product-with-person": {
    steps: [
      {
        step: 3,
        title: "Person & Scene",
        description: "Configure person and scene",
        fields: [
          {
            label: "Person Type",
            name: "personType",
            type: "dropdown",
            options: [
              { label: "Young Black Woman", value: "young Black woman" },
              {
                label: "Middle-Aged Asian Man",
                value: "middle-aged Asian man",
              },
              {
                label: "Elderly Caucasian Couple",
                value: "elderly Caucasian couple",
              },
              { label: "Young Asian Woman", value: "young Asian woman" },
              {
                label: "Middle-Aged Black Man",
                value: "middle-aged Black man",
              },
              {
                label: "Young Caucasian Woman",
                value: "young Caucasian woman",
              },
            ],
            tooltip:
              "The demographic and characteristics of the person in the ad",
          },
          {
            label: "Environment",
            name: "location",
            type: "dropdown",
            options: [
              { label: "Bathroom Mirror", value: "bathroom mirror" },
              { label: "Gym", value: "gym" },
              { label: "Skincare Studio", value: "skincare studio" },
              { label: "Park", value: "park" },
              { label: "Cozy Living Room", value: "cozy living room" },
              { label: "Modern Office", value: "modern office" },
              { label: "Outdoor Cafe", value: "outdoor cafe" },
            ],
            tooltip: "The setting where the person will be using your product",
          },
          {
            label: "Season / Target Demo",
            name: "seasonDemo",
            type: "dropdown",
            options: [
              { label: "Spring", value: "spring" },
              { label: "Summer", value: "summer" },
              { label: "Fall", value: "fall" },
              { label: "Winter", value: "winter" },
              { label: "All Seasons", value: "all seasons" },
            ],
            tooltip: "The seasonal context and target demographic for the ad",
          },
        ],
      },
      {
        step: 4,
        title: "Mood & Function",
        description: "Configure mood and function",
        fields: [
          {
            label: "Mood / Vibe",
            name: "moodVibe",
            type: "dropdown",
            options: [
              { label: "Minimal Luxury", value: "minimal luxury" },
              { label: "Earthy Natural", value: "earthy natural" },
              { label: "Sunny and Energetic", value: "sunny and energetic" },
              { label: "Urban Chic", value: "urban chic" },
              { label: "Professional", value: "professional" },
              { label: "Relaxed", value: "relaxed" },
            ],
            tooltip: "The emotional atmosphere and feeling of the scene",
          },
          {
            label: "Lighting Style",
            name: "lightingStyle",
            type: "dropdown",
            options: [
              { label: "Soft Morning Light", value: "soft morning light" },
              { label: "Moody Shadows", value: "moody shadows" },
              {
                label: "High-Key Studio Light",
                value: "high-key studio light",
              },
              { label: "Golden Hour", value: "golden hour" },
              { label: "Natural Window Light", value: "natural window light" },
            ],
            tooltip: "The lighting that will illuminate the person and product",
          },
          {
            label: "Product Function",
            name: "productFunction",
            type: "text",
            placeholder:
              "e.g., being applied to face, holding product, using in daily routine",
            tooltip: "How the person is using or interacting with your product",
          },
          {
            label: "Background Elements (optional)",
            name: "backgroundElements",
            type: "text",
            optional: true,
            placeholder: "e.g., plants, furniture, decor items",
            tooltip: "Additional elements to enhance the background (optional)",
          },
        ],
      },
    ],
    generatePrompt: (values) => {
      return `Create a photorealistic ad image for ${
        values.productName
      } showing a ${values.productType} being used or held by a ${
        values.personType
      } model in a ${values.location} during ${values.seasonDemo} season.
The image should feel ${values.moodVibe}, with ${
        values.lightingStyle
      } and a natural gesture that demonstrates ${values.productFunction}.
${
  values.backgroundElements
    ? `Include background elements: ${values.backgroundElements}. `
    : ""
}
Keep proportions and label accuracy true to the original. Format: ${
        values.orientation === "portrait" ? "1080x1350" : "1350x1080"
      }.`;
    },
  },
  "flat-lay": {
    steps: [
      {
        step: 3,
        title: "Bundle Details",
        description: "Configure bundle details",
        fields: [
          {
            label: "Number of Items",
            name: "bundleCount",
            type: "dropdown",
            options: [
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
            tooltip: "How many products to include in the bundle",
          },
          {
            label: "Surface Type",
            name: "surfaceType",
            type: "dropdown",
            options: [
              { label: "Linen", value: "linen" },
              { label: "Honed Stone", value: "honed stone" },
              { label: "Bleached Wood", value: "bleached wood" },
              { label: "Marble", value: "marble" },
              { label: "Textured Paper", value: "textured paper" },
              { label: "Soft Fabric", value: "soft fabric" },
            ],
            tooltip: "The material surface for the flat-lay arrangement",
          },
          {
            label: "Lighting Style",
            name: "lightingStyle",
            type: "dropdown",
            options: [
              { label: "Soft Overhead", value: "soft overhead" },
              { label: "Natural Window", value: "natural window" },
              { label: "Even Light", value: "even light" },
              { label: "Warm Glow", value: "warm glow" },
            ],
            tooltip: "The lighting style for the flat-lay composition",
          },
        ],
      },
      {
        step: 4,
        title: "Visual Styling",
        description: "Configure visual styling",
        fields: [
          {
            label: "Prop (Optional)",
            name: "propItem",
            type: "dropdown",
            options: [
              { label: "Ceramic Tray", value: "ceramic tray" },
              { label: "Dried Flowers", value: "dried flowers" },
              { label: "Wooden Board", value: "wooden board" },
              { label: "Stone Slab", value: "stone slab" },
              { label: "Fabric Swatch", value: "fabric swatch" },
              { label: "None", value: "none" },
            ],
            optional: true,
            tooltip: "Optional prop to enhance the arrangement (optional)",
          },
          {
            label: "Color Palette",
            name: "colorPalette",
            type: "dropdown",
            options: [
              { label: "Soft Neutrals", value: "soft neutrals" },
              { label: "Complementary Tones", value: "complementary tones" },
              { label: "Warm Contrast", value: "warm contrast" },
              { label: "Cool Tones", value: "cool tones" },
              { label: "Earth Tones", value: "earth tones" },
            ],
            tooltip: "The color scheme for the flat-lay composition",
          },
          {
            label: "Arrangement Style",
            name: "arrangementStyle",
            type: "radio",
            options: [
              { label: "Symmetrical", value: "symmetrical" },
              { label: "Organic", value: "organic" },
              { label: "Grid", value: "grid" },
            ],
            tooltip: "How the products should be arranged in the composition",
          },
        ],
      },
    ],
    generatePrompt: (values) => {
      return `Create a ${
        values.orientation === "portrait" ? "1080x1350" : "1350x1080"
      } static ad image for ${
        values.productName
      } featuring a flat-lay arrangement of a curated ${
        values.productType
      } bundle (${values.bundleCount} items).
Style the bundle as a premium gift offering placed on a ${values.surfaceType}${
        values.propItem && values.propItem !== "none"
          ? ` with ${values.propItem}`
          : ""
      }, using a ${values.colorPalette} color scheme and ${
        values.arrangementStyle
      } arrangement.
Lighting: ${
        values.lightingStyle
      }. All items should be balanced and intentional, maintaining a clean top-down view. No extra props or text.`;
    },
  },
};

// Final fields to be added to the last step of each template

// Helper function to get all steps for a template
export function getTemplateSteps(templateType: string): Step[] {
  const templateConfig = templates[templateType];
  if (!templateConfig) {
    throw new Error(`Template type "${templateType}" not found`);
  }

  // Create deep copies of steps to avoid modifying originals
  const contentSteps = [
    ...globalSteps.map((step) => ({
      ...step,
      fields: [...step.fields],
    })),
    ...templateConfig.steps.map((step) => ({
      ...step,
      fields: [...step.fields],
    })),
  ];

  // Add final fields to the last content step
  if (contentSteps.length > 0) {
    const lastStep = contentSteps[contentSteps.length - 1];
    lastStep.fields = [...lastStep.fields, ...finalFields];
  }

  // Combine all steps and sort by step number
  return [templateSelectionStep, ...contentSteps].sort(
    (a, b) => a.step - b.step
  );
}

// Helper function to validate if all required fields are filled for a step
export function validateStepFields(
  step: Step,
  values: Record<string, any>
): boolean {
  return step.fields.every((field) => {
    // Skip validation for optional fields
    if (field.optional) {
      return true;
    }

    const value = values[field.name];
    // Check if the value exists and is not empty
    return value !== undefined && value !== null && value !== "";
  });
}

// Helper function to append extra instructions to prompt
export function appendExtraInstructions(
  prompt: string,
  extraInstructions?: string
): string {
  if (!extraInstructions) return prompt;
  return `${prompt}\n\nExtra instructions:\n${extraInstructions}`;
}

// Export types for use in other files
export type {
  FieldType,
  FieldOption,
  BaseField,
  TextField,
  DropdownField,
  RadioField,
  TextareaField,
  Field,
  Step,
  TemplateConfig,
};
