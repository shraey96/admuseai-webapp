const dodoEnv = process.env.DODO_ENV || "test"; // Defaults to "test"

export function getPricingLink(pricingId: string, userId: string): string {
  // Construct the base URL using the dodoEnv
  const baseUrl =
    dodoEnv === "test"
      ? `https://${dodoEnv}.checkout.dodopayments.com/buy/`
      : "https://checkout.dodopayments.com/buy/";

  let suffix = "https://app.admuseai.com/payment-callback";

  if (typeof window !== "undefined") {
    suffix = window.location.origin + "/payment-callback";
  }

  return `${baseUrl}${pricingId}?quantity=1&metadata_user_id=${userId}&redirect_url=${suffix}`;
}
