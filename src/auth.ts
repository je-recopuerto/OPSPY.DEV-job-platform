import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  // Required for Cypress to work with NextAuth
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      authorization: {
        params: {
          prompt: "login",
        },
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    // @ts-ignore
    session: async ({ session, token }) => {
      // @ts-ignore
      // session.user = token.user;

      // @ts-ignore
      session.user.id = token.sub;

      // params.session.user?.id = params.token.user?.id;

      return session;
    },
  },
});
