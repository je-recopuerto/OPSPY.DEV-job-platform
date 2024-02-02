export const siteConfig = {
  name: "opspy",
  description:
    "With opspy, you can find the best opportunities for you from our wide array of opportunities. Try today for free!",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // Ensure the base URL does not have a trailing slash before appending /og.jpg
  ogImage: new URL(
    "/og.png",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ).toString(),
};
