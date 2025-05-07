const envPriceIds = process.env.DODO_PRICE_IDS || "";
const formattedPriceIds = envPriceIds.split(",");

console.log(formattedPriceIds);

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  currency: "USD";
  credits: number;
  ads: number;
  type: "one-time" | "subscription";
  priceId: string;
  isPopular: boolean;
  badgeLabel: string | null;
  badgeColor: string | null;
  features: {
    label: string;
    tooltip: string;
  }[];
  ctaText: string;
};

export const plans: PricingPlan[] = [
  {
    id: "growth",
    name: "Growth",
    price: 29,
    originalPrice: null,
    currency: "USD",
    credits: 60,
    ads: 30,
    type: "one-time",
    priceId: "price_abc123",
    isPopular: false,
    badgeLabel: null,
    badgeColor: null,
    features: [
      {
        label: "60 Credits",
        tooltip: "Each ad uses 2 credits. This plan includes 60 credits total.",
      },
      {
        label: "Access All Templates",
        tooltip:
          "Includes all available styles like flat lay, lifestyle, and promo splash.",
      },
      {
        label: "No Watermarks",
        tooltip: "Your ad images are clean and ready to use commercially.",
      },
    ],
    ctaText: "Purchase 60 Credits",
  },
  {
    id: "boost",
    name: "Boost",
    price: 49,
    originalPrice: 59,
    currency: "USD",
    credits: 160,
    ads: 80,
    type: "one-time",
    priceId: "price_def456",
    isPopular: true,
    badgeLabel: "Launch Offer – Save $10",
    badgeColor: "orange",
    features: [
      {
        label: "160 Credits",
        tooltip:
          "Each ad uses 2 credits. This plan includes 160 credits total.",
      },
      {
        label: "Access All Templates",
        tooltip:
          "Includes all available styles like flat lay, lifestyle, and promo splash.",
      },
      {
        label: "No Watermarks",
        tooltip: "Your ad images are clean and ready to use commercially.",
      },
    ],
    ctaText: "Purchase 160 Credits",
  },
  {
    id: "scale",
    name: "Scale",
    price: 99,
    originalPrice: 129,
    currency: "USD",
    credits: 320,
    ads: 160,
    type: "one-time",
    priceId: "price_xyz789",
    isPopular: false,
    badgeLabel: "Best Value",
    badgeColor: "purple",
    features: [
      {
        label: "320 Credits",
        tooltip:
          "Each ad uses 2 credits. This plan includes 320 credits total.",
      },
      {
        label: "Access All Templates",
        tooltip:
          "Includes all available styles like flat lay, lifestyle, and promo splash.",
      },
      {
        label: "No Watermarks",
        tooltip: "Your ad images are clean and ready to use commercially.",
      },
    ],
    ctaText: "Purchase 320 Credits",
  },
].map((plan, index) => ({
  ...plan,
  priceId: formattedPriceIds[index],
}));
