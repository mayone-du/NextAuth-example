import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import { Layout } from "src/components/layouts/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";

const SamplePage: NextPage = () => {
  const [session, isLoading] = useSession();
  return (
    <Layout meta={{ pageName: "SamplePage" }}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-5xl bg-gray-100">SamplePage</div>
        <ThemeChanger />
      </div>
      <>
        {!session && (
          <>
            {isLoading ? (
              <>Loading ...</>
            ) : (
              <>
                Not signed in <br />
                <button
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={() => {
                    return signIn();
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </>
        )}
        {session && (
          <>
            Signed in as <img src={session?.user?.image ?? ""} width="50px" alt={"alt"} />{" "}
            {session?.user?.name}
            <br />
            AccessToken : {session.accessToken} <br />
            <button
              // eslint-disable-next-line react/jsx-handler-names
              onClick={() => {
                return signOut();
              }}
            >
              Sign out
            </button>
          </>
        )}
      </>
    </Layout>
  );
};

export default SamplePage;
