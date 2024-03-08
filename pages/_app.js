import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/styles";
import getTheme from "@/utils/getTheme";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useLocalStorageState("theme", {
    defaultValue: "darkTheme",
  });

  function handleSetTheme(theme) {
    setTheme(theme);
  }

  return (
    <>
      <ThemeProvider theme={getTheme(theme)}>
        <GlobalStyle />
        <SessionProvider session={pageProps.session}>
          <Layout theme={theme} onSetTheme={handleSetTheme}>
            <Component
              {...pageProps}
              theme={theme}
              // prevPage={prevPage}
              onSetTheme={handleSetTheme}
              // onSetPrevPage={handleSetPrevPage}
            />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
