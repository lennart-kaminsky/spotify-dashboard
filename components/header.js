import { useSession } from "next-auth/react";
import Head from "next/head";
import styled from "styled-components";
import Icon from "./icons";
import Link from "next/link";

export default function Header({ showUserInfo, onToggleUserInfo }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>i still skip over songs</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="This is a Spotify dashboard that shows your listening habits like top artists and songs for different time ranges or the songs you currently listened to."
        />
        <meta property="og:title" content="i still skip over songs" />
        <meta
          property="og:description"
          content="This is a Spotify dashboard that shows your listening habits like top artists and songs for different time ranges or the songs you currently listened to."
        />
        <meta
          property="og:image"
          content={process.env.NEXTAUTH_URL + "images/istillskipoversongs.png"}
        />
      </Head>
      <header>
        {showUserInfo ? (
          <>
            <h1>{session.user.name}</h1>
          </>
        ) : (
          <StyledHeadlineContainer>
            <Link href="/">
              <h1>Spotify Dashboard</h1>
            </Link>
            <StyledSlogan>i still skip over songs</StyledSlogan>
          </StyledHeadlineContainer>
        )}
        {session && (
          <NoStylesButton onClick={() => onToggleUserInfo()}>
            {showUserInfo ? (
              <Icon variant="cancel" />
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

const StyledHeadlineContainer = styled.hgroup`
  position: relative;
`;

const StyledSlogan = styled.p`
  position: absolute;
  bottom: -0.5rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.hColor};
  margin: 0;
  padding: 0;
`;

const NoStylesButton = styled.button`
  all: unset;
  display: flex;
`;

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
  &:active {
    border: ${({ theme }) => "4px solid " + theme.hColor};
  }
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      border: ${({ theme }) => "4px solid " + theme.hColor};
    }
  }
`;

const StyledAccountDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: var(--fontBold);
  color: ${({ theme }) => theme.bgColor};
  &:active {
    background-color: ${({ theme }) => theme.hColor};
    color: ${({ theme }) => theme.accentColor};
  }
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.hColor};
      color: ${({ theme }) => theme.accentColor};
    }
  }
`;
