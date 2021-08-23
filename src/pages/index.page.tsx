// import type { NextPage } from "next";
import { useGetNewsCountLazyQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";
import { MainLayout } from "src/pages/_/Layouts/MainLayout";

const IndexPage: any = () => {
  const [getNewsCountLazyQuery, { data, loading: isLoading, error }] = useGetNewsCountLazyQuery();
  const handleClick = () => {
    getNewsCountLazyQuery();
  };
  return (
    <Layout meta={{ pageName: "IndexPage" }}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-5xl">IndexPage</div>
        <ThemeChanger />
        <button className="block py-2 mx-auto rounded border" onClick={handleClick}>
          クエリ実行
        </button>

        <div>
          <h3 className="text-lg text-center">クエリ結果</h3>
          <div>
            {data && data.newsCount}
            {isLoading && "Loading..."}
            {error && error.message}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

IndexPage.getLayout = MainLayout;
