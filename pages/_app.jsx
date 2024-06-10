// Providers
import { SessionProvider } from "next-auth/react";
import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import { UserProvider } from "providers/userProvider";

// Layout
import Layout from "components/layout/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const theme = extendTheme({
    fonts: {
      heading: "Noto Serif, serif",
      body: "Noto Serif, serif",
    },
  });
  return (
    <SessionProvider session={session}>
      <ChakraBaseProvider theme={theme}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ChakraBaseProvider>
    </SessionProvider>
  );
}

export default MyApp;
