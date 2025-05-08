import mixpanel from "mixpanel-browser";

const isDev = process.env.NODE_ENV === "development";

const MIXPANEL_PROJECT_TOKEN = process.env.MIXPANEL_PROJECT_TOKEN || "";
const MIXPANEL_DEBUG = isDev;

mixpanel.init(MIXPANEL_PROJECT_TOKEN, {
  debug: MIXPANEL_DEBUG,
});

export const ANALYTICS_EVENTS = {
  // Page views - track user journey
  PAGE_VIEWED: "Page Viewed",

  // Navigation and UI interactions - track user journey/intent
  HEADER_LINK_CLICKED: "Header Link Clicked",
  PROMPT_WIZARD_OPENED: "Prompt Wizard Opened",
  PROMPT_WIZARD_TEMPLATE_CLICKED: "Prompt Wizard Template Clicked",
  PROMPT_WIZARD_CTA_CLICKED: "Prompt Wizard CTA Clicked",
  PROMPT_WIZARD_INTENT_CLICKED: "prompt_wizard_intent_clicked",

  // Dashboard interactions - track user journey/intent
  DASHBOARD_CREATE_AD_CLICKED: "Dashboard Create Ad Clicked",
  DASHBOARD_AD_CLICKED: "Dashboard Ad Clicked",

  // Ad interactions - track user journey/intent
  CREATE_AD_CLICKED: "Create Ad Clicked",
  GENERATE_AD_CLICKED: "Generate Ad Clicked",
  DOWNLOAD_AD_CLICKED: "Download Ad Clicked",
  AD_CREATION_INITIATED: "Ad Creation Initiated",
  AD_DELETION_INITIATED: "Ad Deletion Initiated",

  // Search and content discovery - track user intent
  ADS_SEARCH: "Ads Search",
  EXAMPLE_PREVIEW_OPENED: "Example Preview Opened",

  // Result viewing - track user journey
  AD_RESULTS_VIEWED: "Ad Results Viewed",
  RESULT_MODAL_CLOSED: "Result Modal Closed",
  GENERATE_ANOTHER_FROM_RESULTS_CLICKED:
    "Generate Another From Results Clicked",

  // Guidelines and documentation - track user intent
  PROMPT_WRITING_GUIDELINES_CLICKED: "Prompt Writing Guidelines Clicked",
  PROMPT_WRITING_GUIDELINES_TAB_CLICKED:
    "Prompt Writing Guidelines Tab Clicked",

  // Feedback - track user intent
  GIVE_FEEDBACK_CLICKED: "Give Feedback Clicked",

  // Authentication - track user intent
  LOGIN_CLICKED: "Login Clicked",
  SIGNUP_CLICKED: "Signup Clicked",

  // Brand management - track user intent
  CREATE_BRAND_CLICKED: "Create Brand Clicked",
  BRAND_DELETION_INITIATED: "Brand Deletion Initiated",
  BRAND_DELETION_CANCELLED: "Brand Deletion Cancelled",

  // Pricing - track user intent
  PRICING_PLAN_CLICKED: "Pricing Plan Clicked",
  PRICING_PLAN_PURCHASE_CONFIRMED: "Pricing Plan Purchase Confirmed",
};

export const trackAnalytics = (eventName = "", config = {}) => {
  const analyticsPayload = {
    ...config,
    app_config: {
      app_name: "AdMuseAi - Webapp",
    },
  };

  if (isDev) {
    console.log(`[Analytics] ${eventName}`, analyticsPayload);
    return;
  }

  mixpanel.track(eventName, analyticsPayload);
};
