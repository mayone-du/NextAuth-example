import "tailwindcss/tailwind.css";
import "nprogress/nprogress.css";

import { ApolloProvider } from "@apollo/client";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "next-themes";
import nprogress from "nprogress";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { initializeApollo } from "src/graphql/apollo/client";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

const App = (props: AppProps, context: NextPageContext) => {
  const apolloClient = initializeApollo(null, context);

  if (process.browser) {
    nprogress.start();
  }
  useEffect(() => {
    nprogress.done();
  });

  return (
    <div>
      <Provider session={props.pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider attribute="class">
            <props.Component {...props.pageProps} />
            <Toaster toastOptions={{ duration: 2500 }} />
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </div>
  );
};

export default App;
