import { BUCKET_URL } from "@/constants/api";

const SAMPLE_IMAGES_PATH = `${BUCKET_URL}/samples`;

export const HERO_SAMPLES = [
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
    src: `${SAMPLE_IMAGES_PATH}/s2.png`,
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
    src: `${SAMPLE_IMAGES_PATH}/s9.png`,
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
].map((sample) => ({
  ...sample,
  type: (sample.type || "image") as "image" | "video",
}));

export function getHeroSamplesSplit(
  minPerSide = 8,
  samples: { type: "image" | "video"; src: string }[] = HERO_SAMPLES
) {
  // First, shuffle all unique samples
  const shuffledSamples = [...samples].sort(() => Math.random() - 0.5);

  // Calculate how many samples we need to repeat to meet the minimum requirement
  const totalNeeded = minPerSide * 2;
  const uniqueSamples = shuffledSamples.length;

  // If we have enough unique samples, just split them
  if (uniqueSamples >= totalNeeded) {
    return {
      HERO_SAMPLES_LEFT: shuffledSamples.slice(0, minPerSide),
      HERO_SAMPLES_RIGHT: shuffledSamples.slice(minPerSide, totalNeeded),
    };
  }

  // If we need more samples, repeat the shuffled array
  const repeated = [];
  while (repeated.length < totalNeeded) {
    repeated.push(...shuffledSamples);
  }

  // Take exactly what we need and shuffle again
  const finalSamples = repeated
    .slice(0, totalNeeded)
    .sort(() => Math.random() - 0.5);

  return {
    HERO_SAMPLES_LEFT: finalSamples.slice(0, minPerSide),
    HERO_SAMPLES_RIGHT: finalSamples.slice(minPerSide, totalNeeded),
  };
}

export const { HERO_SAMPLES_LEFT, HERO_SAMPLES_RIGHT } = getHeroSamplesSplit();
