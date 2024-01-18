import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import GlobalStyle from "@/styles/styles";
import Header from "@/components/header";

export default function App({ Component, pageProps }) {
  const [showUserInfo, setShowUserInfo] = useState(false);
  function handleToggleUserInfo() {
    setShowUserInfo(!showUserInfo);
  }

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={pageProps.session}>
        <Header
          showUserInfo={showUserInfo}
          onToggleUserInfo={handleToggleUserInfo}
        />
        <Component {...pageProps} showUserInfo={showUserInfo} />
      </SessionProvider>
    </>
  );
}
