import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  pages: {
    signIn: "/auth",
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
    // LinkedinProvider({
    //   clientId: process.env.LINKEDIN_ID,
    //   clientSecret: process.env.LINKEDIN_SECRET,
    //   userinfo: {
    //     url: "https://api.linkedin.com/v2/userinfo",
    //   },
    //   authorization: {
    //     url: "https://www.linkedin.com/oauth/v2/authorization",
    //     params: {
    //       scope: "profile email openid",
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    //   token: {
    //     url: "https://www.linkedin.com/oauth/v2/accessToken",
    //   },
    //   issuer: "https://www.linkedin.com",
    //   jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
    //   async profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       firstname: profile.given_name,
    //       lastname: profile.family_name,
    //       email: profile.email,
    //     };
    //   },
    // }),
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
