// import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useGetUserLazyQuery } from "src/graphql/schemas/schema";
import { MainLayout } from "src/pages/_/Layouts/MainLayout";

const IndexPage: any = () => {
  const [session] = useSession();
  const [getUserLazyQuery, { data: userData }] = useGetUserLazyQuery({
    fetchPolicy: "network-only",
  });
  // eslint-disable-next-line no-console
  console.log("IndexPage Session", session);

  const handleClick = async () => {
    getUserLazyQuery({ variables: { id: "VXNlck5vZGU6Mg==" } });
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-5xl">IndexPage</div>
      <ThemeChanger />
      <button className="block py-2 mx-auto rounded border" onClick={handleClick}>
        クエリ実行
      </button>
      <div>user:{userData?.user?.email}</div>

      <div>
        <h3 className="text-lg text-center">クエリ結果</h3>
      </div>
    </div>
  );
};

export default IndexPage;

IndexPage.getLayout = MainLayout;
