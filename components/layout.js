import Header from "@/components/header";
import { useSession } from "next-auth/react";
import SigninOrOut from "./signInOrOut";

export default function Layout({
  children,
  theme,
  onSetTheme,
  showUserInfo,
  onToggleUserInfo,
}) {
  const { data: session } = useSession();

  if (!session)
    return (
      <>
        <Header></Header>
        <main>
          <SigninOrOut
            signingIn
            theme={theme}
            onSetTheme={onSetTheme}
          ></SigninOrOut>
        </main>
      </>
    );

  if (showUserInfo)
    return (
      <>
        <Header
          showUserInfo={showUserInfo}
          onToggleUserInfo={onToggleUserInfo}
        ></Header>
        <main>
          <SigninOrOut theme={theme} onSetTheme={onSetTheme}></SigninOrOut>
        </main>
      </>
    );

  return (
    <>
      <Header
        showUserInfo={showUserInfo}
        onToggleUserInfo={onToggleUserInfo}
      ></Header>
      <main>{children}</main>
    </>
  );
}
