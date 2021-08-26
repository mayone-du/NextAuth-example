import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { Footer } from "src/components/layouts/Footer";
import { Header } from "src/components/layouts/Header";
import { userInfoVar } from "src/graphql/apollo/cache";
import { LayoutErrorBoundary } from "src/pages/_/Layouts/LayoutErrorBoundary";

// メインレイアウト
export const MainLayout = (page: NextPage) => {
  const userInfo = useReactiveVar(userInfoVar);

  // 初回マウント時にユーザー情報を取得し、ReactiveVariablesでグローバル管理
  useEffect(() => {
    if (!userInfo.idToken) {
      (async () => {
        const session = await getSession();
        const idToken = session?.idToken as string;
        userInfoVar({
          idToken: idToken,
          // username: session?.user?.name ?? "",
          // email: session?.user?.email ?? "",
          // imagePath: session?.user?.image ?? "",
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {}, []);

  return (
    <div>
      <Header />
      <main>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};
