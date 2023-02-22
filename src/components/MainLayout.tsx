import Head from "next/head";
import { NavBar } from "./NavBar";
import { Container } from "react-bootstrap";
import type { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Note Taker</title>
        <link rel="icon" href={"/favicon.ico"} />
        <meta name="description" content="Note Taker" />
        <meta name="og:title" content="Note Taker" />
      </Head>

      <Container>
        <NavBar />
        <main>{children}</main>
      </Container>
    </>
  );
};
