import type { NextPage } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";

// メインレイアウト
export const MainLayout = (page: NextPage) => {
  const [userInfo, setUserInfo] = useState<Session | null>(null);

  // 初回マウント時にユーザー情報を取得
  useEffect(() => {
    (async () => {
      const session = await getSession();
      setUserInfo(session);
    })();
  }, []);

  return (
    <div>
      <header>headerです</header>
      <main>
        <div>{userInfo === null ? "Loading" : userInfo?.user?.email}</div>
        <div>
          {/* <LayoutErrorBoundary>{page}</LayoutErrorBoundary> */}
          {page}
        </div>
      </main>
      <footer>footerです</footer>
    </div>
  );
};
