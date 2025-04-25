import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/privacy", "/terms"],
        disallow: ["/api/", "/_next/", "/static/"],
        crawlDelay: 10,
      },
    ],
    sitemap: "https://admuseai.com/sitemap.xml",
  };
}
