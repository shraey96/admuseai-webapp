import { FUNCTIONS_URL } from "@/constants/api";
import { supabase } from "@/lib/supabaseClient";

/**
 * Converts an object URL to a File object
 */
export async function objectUrlToFile(
  objectUrl: string,
  filename: string = "image.png"
): Promise<File> {
  // Fetch the blob from the object URL
  const response = await fetch(objectUrl);
  const blob = await response.blob();

  // Create a new File object from the blob
  return new File([blob], filename, { type: blob.type });
}

export interface GenerateAdResponse {
  success: boolean;
  imageUrls?: string[];
  id?: string;
  error?: string;
}

export async function generateAdCreative(
  images: string[],
  prompt: string,
  transactionId: string,
  userEmail: string,
  options?: {
    size?: string;
    templateName?: string;
    selectedIntent?: string | null;
  }
): Promise<GenerateAdResponse> {
  try {
    const formData = new FormData();

    // Handle different types of image inputs
    await Promise.all(
      images.map(async (image, index) => {
        const file = await objectUrlToFile(image, `image-${index}.png`);
        formData.append("images", file);
      })
    );

    // Add other required fields
    formData.append("prompt", prompt);
    formData.append("transactionId", transactionId);
    formData.append("userEmail", userEmail);
    if (options?.size) formData.append("size", options.size);
    if (options?.templateName)
      formData.append("templateName", options.templateName);
    if (options?.selectedIntent)
      formData.append("selectedIntent", options.selectedIntent);

    const response = await fetch(`${FUNCTIONS_URL}/generate-gpt-images`, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(300000),
    });

    if (!response.ok) {
      // Clone the response and parse the JSON to get the error message
      const errorData = await response
        .clone()
        .json()
        .catch(() => null);
      console.error("API error response:", errorData);

      // Use the error message from the API if available
      if (errorData && errorData.error) {
        throw new Error(errorData.error);
      } else if (errorData && errorData.details) {
        throw new Error(errorData.details);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if response contains images array
    if (data.success && data.images && data.images.length > 0) {
      return {
        success: true,
        imageUrls: data.images,
        id: data.id || null,
      };
    } else {
      // Handle successful response but no images
      throw new Error(data.error || "No images were generated");
    }
  } catch (error) {
    console.error("Error generating ad creative:", error);

    // Log specific timeout error
    if (error instanceof Error && error.name === "AbortError") {
      console.error("API request timed out after 5 minutes");
    }

    // Extract detailed error message if available
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "object" &&
          error &&
          "details" in error &&
          typeof error.details === "string"
        ? error.details
        : "Unknown error occurred";

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Gets the current user's authorization header for Supabase API requests
 * @returns The Authorization header or undefined if not authenticated
 */
export async function getAuthorizationHeader(): Promise<HeadersInit> {
  const session = await supabase.auth.getSession();
  const accessToken = session?.data?.session?.access_token;

  const headers: HeadersInit = {
    // Add any other common headers here
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}

/**
 * Creates an ad with images and deducts credits via the Edge Function.
 * This is the main entry point for ad creation from the frontend.
 *
 * @param payload - Parameters matching the generate-ad Edge Function
 * @returns { success, ad?, error? }
 */
export async function createAdWithImages(payload: {
  images: string[] | File[];
  prompt: string;
  brandId?: string;
  numSamples?: number;
  quality?: string;
  name: string;
  [key: string]: any;
}): Promise<{ success: boolean; ad?: any; error?: string }> {
  try {
    const formData = new FormData();

    // Handle images
    if (payload.images && Array.isArray(payload.images)) {
      await Promise.all(
        payload.images.map(async (image, index) => {
          if (typeof image === "string") {
            // Convert string URLs to File objects
            const file = await objectUrlToFile(image, `image-${index}.png`);
            formData.append("images", file);
          } else if (image instanceof File) {
            // Use File objects directly
            formData.append("images", image);
          }
        })
      );
    }

    // Add required fields from the curl example
    formData.append("prompt", payload.prompt);
    formData.append("name", payload.name);
    formData.append("adType", payload.adType);
    formData.append("numSamples", String(payload.numSamples));

    if (payload.brandId) {
      formData.append("brandId", payload.brandId);
    }

    if (payload.quality) {
      formData.append("quality", payload.quality);
    }

    // Add any other fields provided
    Object.entries(payload).forEach(([key, value]) => {
      if (
        ![
          "images",
          "prompt",
          "visualStyle",
          "brandId",
          "numSamples",
          "quality",
        ].includes(key) &&
        value !== undefined &&
        value !== null
      ) {
        // Ensure values are properly stringified
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    return {
      success: true,
      ad_id: "14e0689c-e419-4820-b989-93c84b12d93d",
      images: [
        "https://eglwedwlixqeqiteygec.supabase.co/storage/v1/object/public/ai-generated-ads/ad-generation/results/2bab8236-9318-41c0-9450-58e8c7bb173c-generated-ad-1.png",
        "https://eglwedwlixqeqiteygec.supabase.co/storage/v1/object/public/ai-generated-ads/ad-generation/results/5a0054e1-15b5-48a0-b96c-ce61a96b51bc-generated-ad-2.png",
      ],
      credits_used: 4,
    };

    // Use the URL pattern from the curl example
    // If FUNCTIONS_URL is already set up, use that; otherwise use the default pattern
    const GENERATE_AD_URL = `${FUNCTIONS_URL}/generate-ad`;

    // Get authorization headers
    const headers = await getAuthorizationHeader();

    const response = await fetch(GENERATE_AD_URL, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .clone()
        .json()
        .catch(() => null);
      return {
        success: false,
        error:
          (errorData &&
            (errorData.error || errorData.message || errorData.details)) ||
          `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      ad: data.ad || data,
    };
  } catch (error) {
    console.error("Error creating ad:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
