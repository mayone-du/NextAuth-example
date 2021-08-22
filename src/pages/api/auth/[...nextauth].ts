import NextAuth from "next-auth";
// import type { GenericObject } from "next-auth/_utils";
import Providers from "next-auth/providers";

// eslint-disable-next-line import/no-default-export
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      scope: "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(_user, _account, _profile) {
      console.log("signIn!");
      return true;
    },
    async redirect(url, baseUrl) {
      console.log("redirect!");
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt(token, _user, account, _profile, _isNewUser) {
      console.log("jwt!");
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      console.log("session!");
      // Add property to session, like an access_token from a provider.
      session.accessToken = (token as any).accessToken;
      return session;
    },
  },
});
