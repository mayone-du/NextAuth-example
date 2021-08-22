import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";

const SamplePage: NextPage = () => {
  return (
    <Layout meta={{ pageName: "SamplePage" }}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-5xl bg-gray-100">SamplePage</div>
        <ThemeChanger />
      </div>
    </Layout>
  );
};

export default SamplePage;
