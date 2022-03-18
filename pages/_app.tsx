import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import AccountLayout from "../layouts/AccountLayout";
import '../styles/globals.css';
config.autoAddCss = false; 

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AccountLayout>
        <Component {...pageProps} />
      </AccountLayout>
    </SessionProvider>
  )
}

export default App
