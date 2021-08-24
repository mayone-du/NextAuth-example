import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { getSession } from "next-auth/client";
// import type { AppProps } from "next/dist/next-server/lib/router/router";
// import nookies, { parseCookies } from "nookies";
import { cache } from "src/graphql/apollo/cache";
import { GRAPHQL_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = createUploadLink({
  uri: GRAPHQL_API_ENDPOINT,
});

const authLink = setContext((operation, { headers }) => {
  // const accessToken = useReactiveVar(userInfoVar).accessToken;
  // if (accessToken) {
  //   return { headers: { ...headers, authorization: `Bearer ${accessToken}` } };
  // } else {
  return { headers };
  // }
  // return { headers: { ...headers, authorization: `Bearer token` } };
});

const createApolloClient = (reactiveVar: any) => {
  let accessToken: string;
  (async () => {
    const session = await getSession();
    console.log("async", session);

    accessToken = session?.accessToken as string;
  })();
  console.log("createApolloClient", accessToken);

  const newHttpLink = createUploadLink({
    uri: GRAPHQL_API_ENDPOINT,
    headers: { authorization: reactiveVar.accessToken ?? "" },
  });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: typeof window === "undefined" ? newHttpLink : authLink.concat(newHttpLink),
    cache: cache,
  });
};
export const initializeApollo = (_initialState = null, reactiveVar: any) => {
  const _apolloClient = apolloClient ?? createApolloClient(reactiveVar);
  // SSR時は新しいclientを作成
  if (typeof window === "undefined") return _apolloClient;
  // CSR時は同じクライアントを使い回す
  // if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  // pageProps: AppProps["pageProps"],
  pageProps: any,
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
};
