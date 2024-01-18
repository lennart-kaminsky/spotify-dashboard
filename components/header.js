import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

export default function Header({ showUserInfo, onToggleUserInfo }) {
  const { data: session } = useSession();

  return (
    <>
      <header>
        {showUserInfo ? (
          <>
            <h1>{session.user.name}</h1>
          </>
        ) : (
          <h1>Spotify Dashboard</h1>
        )}
        {session && (
          <NoStylesButton onClick={() => onToggleUserInfo()}>
            {showUserInfo ? (
              <StyledSVG
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="50"
                fill="var(--accentColor)"
              >
                <title>cancel</title>
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </StyledSVG>
            ) : session.user.image ? (
              <StyledImage src={session.user.image} alt="account photo" />
            ) : (
              <StyledAccountDiv>
                <span>{Array.from(session.user.name)[0]}</span>
              </StyledAccountDiv>
            )}
          </NoStylesButton>
        )}
      </header>
    </>
  );
}

const NoStylesButton = styled.button`
  all: unset;
`;

const StyledSVG = styled.svg`
  :hover,
  :active {
    fill: var(--hColor);
  }
`;

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  &:hover,
  :active {
    border: 4px solid var(--hColor);
  }
`;

const StyledAccountDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: var(--accentColor);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: var(--fontBold);
  color: var(--hColor);
  &:hover,
  :active {
    background-color: var(--hColor);
    color: var(--accentColor);
  }
`;
