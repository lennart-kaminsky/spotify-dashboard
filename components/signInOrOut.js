import { signIn, signOut } from "next-auth/react";
import styled from "styled-components";

export default function SigninOrOut({ signingIn }) {
  function signInOrOut() {
    if (signingIn) {
      signIn();
    } else signOut();
  }
  return (
    <StyledSignIn>
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
`;

const StyledLogInButton = styled.button`
  padding: 0.7rem 2rem;
  font-size: 1rem;
  border: 2px solid var(--accentColor);
  border-radius: 0.5rem;
  background-color: transparent;
  color: var(--accentColor);
  &:hover,
  :active {
    color: var(--bgColor);
    background-color: var(--accentColor);
  }
`;

const StyledWarning = styled.p`
  font-size: 0.7rem;
  margin: 1rem;
`;
