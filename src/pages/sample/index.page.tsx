// import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import { fixDateFormat } from "src/libs/fixDateFormat";
import { MainLayout } from "src/pages/_/Layouts/MainLayout";

const SamplePage: any = () => {
  // const SamplePage: NextPage = () => {
  const [session, isLoading] = useSession();

  // eslint-disable-next-line no-console
  console.log("session", session);

  return (
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
        <div>
          <p>ログインしているユーザー：{session.user?.name}</p>
          <p>Email：{session.user?.email}</p>
          <p>ログイン期間：{session.expires ? fixDateFormat(session.expires) : "なし"}</p>
          <div>
            <img src={session?.user?.image ?? ""} width="50px" alt={"alt"} />{" "}
          </div>
          {/* eslint-disable-next-line no-console */}
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
        </div>
      )}
    </div>
  );
};

export default SamplePage;

SamplePage.getLayout = MainLayout;
