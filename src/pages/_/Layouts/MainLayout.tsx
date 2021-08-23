// import { Footer } from "./Footer";
// import { Header } from "./Header";
import type { NextPage } from "next";
// import { useSession } from "next-auth/client";

// メインレイアウト
export const MainLayout = (page: NextPage) => {
  // const [session, isLoading] = useSession();
  // eslint-disable-next-line no-console
  // console.log("MainLayout", session, isLoading);

  return (
    <div>
      <header>headerです</header>
      <main>
        {/* <div>{isLoading ? "Loading" : session?.user?.email}</div> */}
        <div>
          {/* <LayoutErrorBoundary>{page}</LayoutErrorBoundary> */}
          {page}
        </div>
      </main>
      <footer>footerです</footer>
    </div>
  );
};
