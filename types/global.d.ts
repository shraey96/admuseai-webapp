// Global TypeScript declarations for the application

// Paddle API Types
interface PaddleCheckoutData {
  completed?: boolean;
  id?: string;
  transaction_id?: string;
}

interface PaddleEventData {
  event: string;
  checkout?: PaddleCheckoutData;
}

interface PaddleCheckout {
  open: (options: {
    items: { quantity: number; priceId: string }[];
    customer: { email: string };
    customData: { email: string; user_id: string };
  }) => void;
  close: () => void;
}

interface PaddleEnvironment {
  set: (env: string | undefined) => void;
}

interface PaddleInitialize {
  token: string | undefined;
  eventCallback: (data: PaddleEventData) => void;
}

interface Paddle {
  Checkout: PaddleCheckout;
  Environment: PaddleEnvironment;
  Initialize: (options: PaddleInitialize) => void;
}

// Extend Window interface
interface Window {
  Paddle: Paddle;
}
