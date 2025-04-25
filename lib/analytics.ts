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

  GENERATE_AD_CLICKED: "Generate Ad Clicked",

  GENERATE_AD_CLICKED_AGAIN: "Generate Ad Again Clicked",

  DOWNLOAD_AD_CLICKED: "Download Ad Clicked",
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
