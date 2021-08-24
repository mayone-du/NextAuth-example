import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
// import { GetNewsCountDocument } from "src/apollo/schema";
// import { initializeApollo } from "src/graphql/apollo/client";
import { LayoutErrorBoundary } from "src/pages/_/Layouts/LayoutErrorBoundary";

// メインレイアウト
export const MainLayout = (page: NextPage) => {
  const userInfo = useReactiveVar(userInfoVar);
  // const apolloClient = initializeApollo(null);

  // 初回マウント時にユーザー情報を取得
  useEffect(() => {
    if (!userInfo.accessToken) {
      (async () => {
        const session = await getSession();
        const accessToken = session?.accessToken as string;
        userInfoVar({ accessToken: accessToken });
        // const { data: newsCount, error } = await apolloClient.query({ query: GetNewsCountDocument });
        // eslint-disable-next-line no-console
        // console.log(newsCount, error);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header>headerです</header>
      {/* <div>{data?.newsCount}件</div> */}
      <main>
        {/* <div>{userInfo === null ? "Loading" : userInfo?.user?.email}</div> */}
        <div>
          <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
        </div>
      </main>
      <footer>footerです</footer>
    </div>
  );
};
