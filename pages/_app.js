import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/styles";
import Header from "@/components/header";
import getTheme from "@/utils/getTheme";

export default function App({ Component, pageProps }) {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [theme, setTheme] = useLocalStorageState("theme", {
    defaultValue: "darkTheme",
  });

  function handleToggleUserInfo() {
    setShowUserInfo(!showUserInfo);
  }

  function handleSetTheme(theme) {
    setTheme(theme);
  }

  return (
    <>
      <ThemeProvider theme={getTheme(theme)}>
        <GlobalStyle />
        <SessionProvider session={pageProps.session}>
          <Header
            showUserInfo={showUserInfo}
            onToggleUserInfo={handleToggleUserInfo}
          />
          <Component
            {...pageProps}
            showUserInfo={showUserInfo}
            theme={theme}
            onSetTheme={handleSetTheme}
          />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
