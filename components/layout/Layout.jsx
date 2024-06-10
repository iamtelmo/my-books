// Libraries
import React from "react";
import Head from "next/head";
import { ScaleFade, Box, Container } from "@chakra-ui/react";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, title = "Ebook Deals" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    <Container
      minW={{ sm: "container.xs", md: "container.sm", xl: "container.lg" }}
      minH="100vh"
      p={0}
      overflow="hidden"
    >
      <Box p={16} minH="100vh" overflow="hidden" background="transparent">
        <ScaleFade initialScale={0.9} in={true}>
          {children}
        </ScaleFade>
      </Box>
      <Footer />
    </Container>
  </div>
);

export default Layout;
