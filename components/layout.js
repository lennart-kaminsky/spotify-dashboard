import { useSession } from "next-auth/react";
import useSettingsStore from "@/stores/settingsStore";
import Header from "@/components/header";
import SigninOrOut from "@/components/signInOrOut";

export default function Layout({ children, theme, onSetTheme }) {
  const { data: session } = useSession();
  const { showUserInfo } = useSettingsStore();

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
        <Header></Header>
        <main>
          <SigninOrOut theme={theme} onSetTheme={onSetTheme}></SigninOrOut>
        </main>
      </>
    );

  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
}
