import { BUCKET_URL } from "@/constants/api";

const SAMPLE_IMAGES_PATH = `${BUCKET_URL}/samples`;

type Sample = {
  type?: "image" | "video";
  src: string;
};

export const HERO_SAMPLES: Sample[] = [
  {
    src: `${SAMPLE_IMAGES_PATH}/cake_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/pearl_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/soda_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/skincare_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/shoes_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/perfume_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/home_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s1.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s3.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s4.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s5.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s6.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s7.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s8.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s10.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s11.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s12.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s13.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s14.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s16.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s17.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/s18.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/chocolate_shake_ad.png`,
  },
  {
    src: `${SAMPLE_IMAGES_PATH}/sorbet_ad.png`,
  },
];

export const PRIORITY_SAMPLES = [
  "s14",
  "sorbet_ad",
  "s16",
  "s17",
  "chocolate_shake_ad",
  "s18",
];
/**
 * Splits and organizes hero samples into left and right arrays with priority items at the top.
 * Priority items (up to 4) will appear at the beginning of the combined array, followed by
 * randomly ordered non-priority items. The final array is split into two equal sides.
 *
 * @param {number} [minPerSide=8] - Minimum number of samples required for each side (left/right)
 * @param {Sample[]} [samples=HERO_SAMPLES] - Array of samples to process
 * @param {string[]} [priorityItems=PRIORITY_SAMPLES] - Array of strings to match against sample.src
 *
 * @returns {Object} Object containing two arrays of samples
 * @property {Sample[]} HERO_SAMPLES_LEFT - Left side samples
 * @property {Sample[]} HERO_SAMPLES_RIGHT - Right side samples
 *
 * @example
 * // Basic usage with default parameters
 * const { HERO_SAMPLES_LEFT, HERO_SAMPLES_RIGHT } = getHeroSamplesSplit();
 *
 * @example
 * // Custom usage with specific priority items
 * const { HERO_SAMPLES_LEFT, HERO_SAMPLES_RIGHT } = getHeroSamplesSplit(
 *   6, // 6 samples per side
 *   HERO_SAMPLES,
 *   ["cake_ad", "pearl_ad"] // Priority items
 * );
 */
export function getHeroSamplesSplit(
  minPerSide = 8,
  samples: Sample[] = HERO_SAMPLES,
  priorityItems: string[] = PRIORITY_SAMPLES
) {
  // First, separate priority and non-priority samples
  const prioritySamples = samples.filter((sample) =>
    priorityItems.some((item) => sample.src.includes(item))
  );
  const nonPrioritySamples = samples.filter(
    (sample) => !priorityItems.some((item) => sample.src.includes(item))
  );

  // Shuffle both arrays
  const shuffledPriority = [...prioritySamples].sort(() => Math.random() - 0.5);
  const shuffledNonPriority = [...nonPrioritySamples].sort(
    () => Math.random() - 0.5
  );

  // Calculate how many samples we need
  const totalNeeded = minPerSide * 2;
  const priorityCount = Math.min(shuffledPriority.length, 4); // Keep top 4 priority items

  // If we need more samples, repeat the non-priority array
  const repeated: Sample[] = [];
  while (repeated.length < totalNeeded - priorityCount) {
    repeated.push(...shuffledNonPriority);
  }

  // Take exactly what we need and shuffle again (except priority items)
  const finalSamples = [
    ...shuffledPriority.slice(0, priorityCount),
    ...repeated.slice(0, totalNeeded - priorityCount),
  ]
    .sort((a, b) => {
      // Keep priority items in their positions
      const aIsPriority = priorityItems.some((item) => a.src.includes(item));
      const bIsPriority = priorityItems.some((item) => b.src.includes(item));
      if (aIsPriority && !bIsPriority) return -1;
      if (!aIsPriority && bIsPriority) return 1;
      return Math.random() - 0.5;
    })
    .map((image) => ({
      ...image,
      type: image.type || "image",
    }));

  return {
    HERO_SAMPLES_LEFT: finalSamples.slice(0, minPerSide),
    HERO_SAMPLES_RIGHT: finalSamples.slice(minPerSide, totalNeeded),
  };
}

export const { HERO_SAMPLES_LEFT, HERO_SAMPLES_RIGHT } = getHeroSamplesSplit();
