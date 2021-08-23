import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// eslint-disable-next-line import/no-default-export
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      // scope: "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(_user, _account, _profile) {
      // eslint-disable-next-line no-console
      console.log("signIn!");
      // 初回サインイン時にDBにユーザーを登録し、二回目以降はユーザーが存在すればOKにする
      return true;
    },
    async redirect(url, baseUrl) {
      // eslint-disable-next-line no-console
      console.log("redirect!", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt(token, _user, account, _profile, _isNewUser) {
      // eslint-disable-next-line no-console
      console.log("jwt!");
      // console.log("jwt!", token, _user, account, _profile, _isNewUser);
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      // eslint-disable-next-line no-console
      console.log("session!");
      // Add property to session, like an access_token from a provider.
      session.accessToken = (token as any).accessToken;
      return session;
    },
  },
});
