import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { userInfoVar } from "src/graphql/apollo/cache";

/* eslint-disable @typescript-eslint/naming-convention */
const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (token: any) => {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();
    console.log("refreshedTokens", refreshedTokens);

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log("refreshAccessTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

// eslint-disable-next-line import/no-default-export
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
      // scope: "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(_user, _account, _profile) {
      // eslint-disable-next-line no-console
      console.log("signIn!", _user, _account, _profile);
      // 初回サインイン時にDBにユーザーを登録し、二回目以降はユーザーが存在すればOKにする
      return true;
    },
    async redirect(url, baseUrl) {
      // eslint-disable-next-line no-console
      console.log("redirect!", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt(token, user, account, _profile, _isNewUser) {
      // eslint-disable-next-line no-console
      console.log("NextAuth jwt fn", token, user, account, _profile, _isNewUser);
      console.log("refresh token", account);

      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);

      // // Add access_token to the token right after signin
      // if (account?.accessToken) {
      //   token.accessToken = account.accessToken;
      //   userInfoVar({ accessToken: account.accessToken });
      // }
      // return token;
    },
    async session(session, token) {
      // eslint-disable-next-line no-console
      console.log("NextAuth session fn", token);

      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;

      // Add property to session, like an access_token from a provider.
      session.accessToken = (token as any).accessToken;
      return session;
    },
  },
});
