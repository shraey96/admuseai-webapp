export interface PurchaseOption {
  id: string;
  title: string;
  description: string;
  priceId: string;
  price: number;
  credits: number;
}

export const purchaseOptions: PurchaseOption[] = [
  {
    id: "small",
    title: "Small Pack",
    description: "Quick top-up for immediate needs",
    priceId: "price_small",
    price: 4.99,
    credits: 20,
  },
  {
    id: "medium",
    title: "Medium Pack",
    description: "Best value for regular usage",
    priceId: "price_medium",
    price: 9.99,
    credits: 50,
  },
];
