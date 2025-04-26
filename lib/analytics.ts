import mixpanel from "mixpanel-browser";

const isDev = process.env.NODE_ENV === "development";

const MIXPANEL_PROJECT_TOKEN = process.env.MIXPANEL_PROJECT_TOKEN;
const MIXPANEL_DEBUG = isDev;

mixpanel.init(MIXPANEL_PROJECT_TOKEN, {
  debug: MIXPANEL_DEBUG,
});

export const ANALYTICS_EVENTS = {
  PAGE_VIEWED: "Page Viewed",

  HEADER_LINK_CLICKED: "Header Link Clicked",

  PROMPT_WIZARD_OPENED: "Prompt Wizard Opened",

  PROMPT_WIZARD_TEMPLATE_CLICKED: "Prompt Wizard Template Clicked",

  PROMPT_WIZARD_CTA_CLICKED: "Prompt Wizard CTA Clicked",

  GENERATE_AD_CLICKED: "Generate Ad Clicked",

  GENERATE_AD_CLICKED_AGAIN: "Generate Ad Again Clicked",

  DOWNLOAD_AD_CLICKED: "Download Ad Clicked",

  EXAMPLE_PREVIEW_OPENED: "Example Preview Opened",

  PROMPT_WRITING_GUIDELINES_CLICKED: "Prompt Writing Guidelines Clicked",

  PROMPT_WRITING_GUIDELINES_TAB_CLICKED:
    "Prompt Writing Guidelines Tab Clicked",
};

export const trackAnalytics = (eventName = "", config = {}) => {
  const analyticsPayload = {
    ...config,
    app_config: {
      app_name: "AdMuseAi",
    },
  };

  if (isDev) {
    console.log(`[Analytics] ${eventName}`, analyticsPayload);
    return;
  }

  mixpanel.track(eventName, analyticsPayload);
};
