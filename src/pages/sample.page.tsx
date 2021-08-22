import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import { Layout } from "src/components/layouts/Layout";

const SamplePage: NextPage = () => {
  const [session, isLoading] = useSession();
  return (
    <Layout meta={{ pageName: "SamplePage" }}>
      <div>
        {!session && (
          <>
            {isLoading ? (
              <>Loading ...</>
            ) : (
              <>
                Not signed in <br />
                <button
                  className="block p-2 mx-auto rounded border"
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
            {console.log(session)}
            <button
              className="block p-2 mx-auto rounded border"
              // eslint-disable-next-line react/jsx-handler-names
              onClick={() => {
                return signOut();
              }}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SamplePage;
