// import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useState } from "react";
import {
  useGetUserLazyQuery,
  // useSocialAuthMutation
} from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";
import { MainLayout } from "src/pages/_/Layouts/MainLayout";

const IndexPage: any = () => {
  // const [socialAuthMutation] = useSocialAuthMutation();
  const [session] = useSession();
  const [
    authState,
    // setAuthState
  ] = useState<any>();
  const [getUserLazyQuery, { data: userData }] = useGetUserLazyQuery();
  // eslint-disable-next-line no-console
  console.log("IndexPage Session", session);

  const handleClick = async () => {
    getUserLazyQuery({ variables: { id: "VXNlck5vZGU6Mg==" } });
    // const { data } = await socialAuthMutation({
    //   variables: { accessToken: session?.accessToken },
    // });
    // setAuthState(data?.socialAuth?.social?.user.email);
    // console.log("graphql response", data?.socialAuth);
  };
  return (
    <Layout meta={{ pageName: "IndexPage" }}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-5xl">IndexPage</div>
        <ThemeChanger />
        <button className="block py-2 mx-auto rounded border" onClick={handleClick}>
          クエリ実行
        </button>
        <div>auth:{authState}</div>
        <div>user:{userData?.user?.email}</div>

        <div>
          <h3 className="text-lg text-center">クエリ結果</h3>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

IndexPage.getLayout = MainLayout;
