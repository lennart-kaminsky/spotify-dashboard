import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";
import useSessionStorageState from "use-session-storage-state";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/styles";
import Header from "@/components/header";
import getTheme from "@/utils/getTheme";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [theme, setTheme] = useLocalStorageState("theme", {
    defaultValue: "darkTheme",
  });
  const [prevPage, setPrevPage] = useSessionStorageState("prevPage", {
    defaultValue: "/",
  });

  function handleToggleUserInfo() {
    setShowUserInfo(!showUserInfo);
  }

  function handleSetTheme(theme) {
    setTheme(theme);
  }

  function handleSetPrevPage(page) {
    setPrevPage(page);
  }

  return (
    <>
      <ThemeProvider theme={getTheme(theme)}>
        <GlobalStyle />
        <SessionProvider session={pageProps.session}>
          {/* <Header
            showUserInfo={showUserInfo}
            onToggleUserInfo={handleToggleUserInfo}
          /> */}
          <Layout
            showUserInfo={showUserInfo}
            onToggleUserInfo={handleToggleUserInfo}
            theme={theme}
            onSetTheme={handleSetTheme}
          >
            <Component
              {...pageProps}
              showUserInfo={showUserInfo}
              theme={theme}
              prevPage={prevPage}
              onSetTheme={handleSetTheme}
              onSetPrevPage={handleSetPrevPage}
            />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
