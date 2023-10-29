import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
    })
  ],
  // pages: {
  //   signIn: "/login"
  // }
})

export { handler as GET, handler as POST }