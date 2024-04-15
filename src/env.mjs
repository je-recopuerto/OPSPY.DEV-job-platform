import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    AUTH_SECRET: z.string().min(1),

    AUTH0_ID: z.string().min(1),
    AUTH0_SECRET: z.string().min(1),
    AUTH0_ISSUER: z.string().min(1),
    AUTH0_SCOPE: z.string().min(1),
    AUTH0_AUDIENCE: z.string().min(1),

    POSTGRES_PRISMA_URL: z.string().min(1),

    KNOCK_SECRET_API_KEY: z.string().min(1),

    AZURE_STORAGE_ACCOUNT_NAME: z.string().min(1),
    AZURE_STORAGE_ACCOUNT_KEY: z.string().min(1),

    OPENAI_API_KEY: z.string().min(1),

    STRIPE_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_KNOCK_API_KEY: z.string().min(1),

    NEXT_PUBLIC_MAX_CV_FILE_SIZE: z.string().min(1),
    NEXT_PUBLIC_MAX_PROFILE_PICTURE_SIZE: z.string().min(1),

    NEXT_PUBLIC_STRIPE_TALENT_PRO_MONTHLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_TALENT_PRO_YEARLY_PLAN_ID: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH0_ID: process.env.AUTH0_ID,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    KNOCK_SECRET_API_KEY: process.env.KNOCK_SECRET_API_KEY,
    AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
    AZURE_STORAGE_ACCOUNT_KEY: process.env.AZURE_STORAGE_ACCOUNT_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_TALENT_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_TALENT_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_KNOCK_API_KEY: process.env.NEXT_PUBLIC_KNOCK_API_KEY,
    NEXT_PUBLIC_MAX_CV_FILE_SIZE: process.env.NEXT_PUBLIC_MAX_CV_FILE_SIZE,
    NEXT_PUBLIC_MAX_PROFILE_PICTURE_SIZE: process.env.NEXT_PUBLIC_MAX_PROFILE_PICTURE_SIZE,
    NEXT_PUBLIC_STRIPE_TALENT_PRO_MONTHLY_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_TALENT_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_TALENT_PRO_YEARLY_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_TALENT_PRO_YEARLY_PLAN_ID,
  },
});