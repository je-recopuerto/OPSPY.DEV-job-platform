import { env } from "@/env.mjs";

export const siteConfig = {
  name: "Opspy",
  description:
    "With opspy, you can find the best opportunities for you from our wide array of opportunities. Try today for free!",
  url: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // Ensure the base URL does not have a trailing slash before appending /og.jpg
  ogImage: new URL(
    "/og.png",
    env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ).toString(),
};
