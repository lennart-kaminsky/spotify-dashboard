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
  border: 2px solid var(--fontColor);
  border-radius: 0.5rem;
  background-color: transparent;
  color: var(--fontColor);
  &:hover,
  :active {
    border: none;
    color: var(--bgColor);
    background-color: var(--fontColor);
  }
`;
