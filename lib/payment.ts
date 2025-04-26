// Default Paddle price for ad generation
export const PADDLE_PRICE = {
  quantity: 1,
  priceId: "pri_01jsmq96512pwbkw443g0s2aef",
};

/**
 * Initialize payment process using Paddle
 * @param email - User's email address
 * @param userId - User's ID (can be anonymous)
 * @returns Promise that resolves with payment details on success
 */
export function initPayment(
  email: string,
  userId: string = "anonymous"
): Promise<{ transactionId: string; email: string }> {
  return new Promise((resolve, reject) => {
    // Check if Paddle is loaded
    if (!window.Paddle) {
      reject(new Error("Payment system not initialized"));
      return;
    }

    // Initialize Paddle
    window.Paddle.Initialize({
      token: process.env.PADDLE_CLIENT_ID,
      eventCallback: (result) => {
        const data = result.data;

        if (result.name === "checkout.completed" && data?.transaction_id) {
          // Resolve with payment info
          resolve({
            transactionId: data.transaction_id,
            email: data.customer.email,
          });

          setTimeout(() => {
            // Close the checkout window
            window.Paddle.Checkout.close();
          }, 0);
        } else if (
          data.event === "checkout.closed" &&
          !data.checkout?.completed
        ) {
          // User closed the checkout without completing
          reject(new Error("Payment cancelled"));
        }
      },
    });

    // Open the checkout
    window.Paddle.Checkout.open({
      items: [PADDLE_PRICE],
      customer: { email },
      customData: { email, user_id: userId },
    });
  });
}
