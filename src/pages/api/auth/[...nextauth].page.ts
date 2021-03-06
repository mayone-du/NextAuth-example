import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { initializeApollo } from "src/graphql/apollo/client";
import type { SocialAuthMutation, SocialAuthMutationVariables } from "src/graphql/schemas/schema";
import { SocialAuthDocument } from "src/graphql/schemas/schema";

// TODO: 各引数で受け取る値の型の修正

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
    // console.log("refreshedTokens", refreshedTokens);

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      idToken: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("refreshAccessTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

// eslint-disable-next-line import/no-default-export
export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
      // scope: "",
    }),
  ],
  callbacks: {
    // サインイン時の処理
    async signIn(_user, account, _profile) {
      // 初回サインイン時にDBにユーザーを登録し、二回目以降はユーザーが存在すればOKにする
      const apolloClient = initializeApollo(null, account.idToken);
      const { errors } = await apolloClient.mutate<SocialAuthMutation, SocialAuthMutationVariables>(
        {
          mutation: SocialAuthDocument,
          variables: {
            accessToken: account.accessToken,
          },
        },
      );
      // SocialAuthのエラーが無ければOK
      if (errors) {
        console.error(errors);
        return false;
      } else {
        return true;
      }
    },
    // リダイレクト時の処理 普通にページ遷移した時に呼び出されるぽい？
    async redirect(url, baseUrl) {
      // eslint-disable-next-line no-console
      console.log("redirect!", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // TODO: 要チェック
    async jwt(token: any, user, account: any, _profile, _isNewUser) {
      // eslint-disable-next-line no-console
      // console.log("NextAuth jwt fn", token, user, account, _profile, _isNewUser);

      if (account && user) {
        return {
          idToken: account.id_token,
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
      // }
      // return token;
    },
    async session(session: any, token) {
      // eslint-disable-next-line no-console
      // console.log("NextAuth session fn", token);

      if (token) {
        session.user = token.user;
        session.idToken = token.idToken;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
});
