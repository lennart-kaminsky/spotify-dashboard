import { signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import ThemeButton from "./button";

export default function SigninOrOut({ signingIn, theme, onSetTheme }) {
  function signInOrOut() {
    if (signingIn) {
      signIn();
    } else signOut();
  }
  return (
    <StyledSignIn>
      <h2>colours</h2>
      <StyledThemeContainer>
        <ThemeButton
          theme={theme}
          colorTheme={"mainTheme"}
          onSetTheme={onSetTheme}
        ></ThemeButton>
        <ThemeButton
          theme={theme}
          colorTheme={"lightTheme"}
          onSetTheme={onSetTheme}
        ></ThemeButton>
        <ThemeButton
          theme={theme}
          colorTheme={"darkTheme"}
          onSetTheme={onSetTheme}
        ></ThemeButton>
      </StyledThemeContainer>
      <StyledLogInButton onClick={() => signInOrOut()}>
        {signingIn ? "Sign in" : "Sign out"}
      </StyledLogInButton>
      {signingIn && (
        <StyledWarning>
          This app is still in{" "}
          <a
            href="https://developer.spotify.com/documentation/web-api/concepts/quota-modes"
            target="_blank"
          >
            Spotify Development mode
          </a>
          .<br></br> Your spotify mail address must be added manually by the
          developer to enable you to log in.
        </StyledWarning>
      )}
    </StyledSignIn>
  );
}

const StyledSignIn = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-inline: 2rem;
  padding-block-end: 10%;
`;

const StyledThemeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
`;

const StyledLogInButton = styled.button`
  padding: 0.7rem 2rem;
  font-size: 1rem;
  border: ${({ theme }) => "2px solid " + theme.accentColor};
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.accentColor};
  :active {
    color: ${({ theme }) => theme.bgColor};
    background-color: ${({ theme }) => theme.accentColor};
  }
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.bgColor};
      background-color: ${({ theme }) => theme.accentColor};
    }
  }
`;

const StyledWarning = styled.p`
  font-size: 0.7rem;
  margin: 1rem;
`;
