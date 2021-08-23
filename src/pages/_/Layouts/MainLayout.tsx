// import { Footer } from "./Footer";
// import { Header } from "./Header";

import type { NextPage } from "next";

// メインレイアウト
export const MainLayout = (page: NextPage) => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <header>headerです</header>
      <main className="bg-red-300">
        {/* <LayoutErrorBoundary>{page}</LayoutErrorBoundary> */}
        {page}
      </main>
      <footer>footerです</footer>
    </div>
  );
};
