import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/src/utils/theme";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";

// always import core styles first
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const PageHead = () => {
  return (
    <Head>
      <title>APP NAME</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      {/* REPLACE THIS ONE WITH LOGO LATER */}
      <link rel="shortcut icon" href="/favicon.svg" />
    </Head>
  )
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <MantineProvider theme={theme}>
      <PageHead />

      {/* to display notifications everywhere in the app (mantine specific configurations) */}
      <Notifications />

      {/* Main */}
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}
