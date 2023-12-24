import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
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
    session: async ({ session, token }) => {
      // @ts-ignore
      session.user = token.user;
      return session;
    },
    // jwt: async ({ token, user, account, profile }) => {
    //   //  "user" parameter is the object received from "authorize"
    //   //  "token" is being send below to "session" callback...
    //   //  ...so we set "user" param of "token" to object from "authorize"...
    //   //  ...and return it...
    //   user && (token.user = user);
    //   return Promise.resolve(token); // ...here
    // },
    // session: async ({ session, token }) => {
    //   // Add user_id to session. This is because Auth0 uses user_id instead of id
    //   if (token.sub) {
    //     if (session && session.user) {
    //       console.log(
    //         "Changing session user id from",
    //         session.user.id,
    //         "to",
    //         token.sub,
    //       );
    //     }
    //
    //     session && session.user && (session.user.id = token.sub);
    //   }
    //
    //   return session;
    // },
  },
});
