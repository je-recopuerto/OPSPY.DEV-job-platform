import { siteConfig } from "@/config/site";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api",
        "/_next",
        "/static",
        "/settings",
        "/admin",
        "/e/new-job",
      ],
    },
    sitemap: siteConfig.url + "/sitemap.xml",
  };
}
