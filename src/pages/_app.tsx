import { api } from "../utils/api";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MainLayout } from "../components/MainLayout";
import SSRProvider from "react-bootstrap/SSRProvider";

import "../styles/globals.css";

/**
 * Create a custom app in the new Next.js 13 style.
 * @see https://nextjs.org/docs/advanced-features/custom-app
 * */
const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SSRProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
