import type { NextPage } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { GetNewsCountDocument } from "src/apollo/schema";
import { initializeApollo } from "src/graphql/apollo/client";
import { LayoutErrorBoundary } from "src/pages/_/Layouts/LayoutErrorBoundary";

// メインレイアウト
export const MainLayout = (page: NextPage) => {
  const [userInfo, setUserInfo] = useState<Session | null>(null);
  const apolloClient = initializeApollo(null);

  // 初回マウント時にユーザー情報を取得
  useEffect(() => {
    (async () => {
      const session = await getSession();
      setUserInfo(session);

      const { data: newsCount, error } = await apolloClient.query({ query: GetNewsCountDocument });
      // eslint-disable-next-line no-console
      console.log(newsCount, error);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header>headerです</header>
      {/* <div>{data?.newsCount}件</div> */}
      <main>
        <div>{userInfo === null ? "Loading" : userInfo?.user?.email}</div>
        <div>
          <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
        </div>
      </main>
      <footer>footerです</footer>
    </div>
  );
};
