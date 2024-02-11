import { env } from "@/env.mjs";
import { defineConfig } from "cypress";

require("dotenv").config();

export default defineConfig({
  projectId: "hh8ngv",
  env: {
    auth0_talent_test_username: process.env.AUTH0_TALENT_TEST_USERNAME,
    auth0_talent_test_password: process.env.AUTH0_TALENT_TEST_PASSWORD,
    auth0_domain: env.AUTH0_ISSUER,
    auth0_audience: env.AUTH0_AUDIENCE,
    auth0_scope: env.AUTH0_SCOPE,
    auth0_client_id: env.AUTH0_ID,
    // auth0_client_secret: env.AUTH0_CLIENT_SECRET,
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
