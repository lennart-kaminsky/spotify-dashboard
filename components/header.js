import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import useSettingsStore from "@/stores/settingsStore";
import Icon from "@/components/icons";

export default function Header() {
  const { data: session } = useSession();
  const { showUserInfo, toggleShowUserInfo } = useSettingsStore();

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
              <StyledSlogan>i still skip over songs</StyledSlogan>
            </Link>
          </StyledHeadlineContainer>
        )}
        {session && (
          <NoStylesButton onClick={() => toggleShowUserInfo()}>
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
  @media (hover: hover) {
    &:hover p {
      letter-spacing: 0.4rem;
    }
  }
`;

const StyledSlogan = styled.p`
  position: absolute;
  bottom: -0.5rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.hColor};
  margin: 0;
  padding: 0;
  transition: letter-spacing 1s;
`;

const NoStylesButton = styled.button`
  all: unset;
  display: flex;
  transition: transform 2s;
  @media (hover: hover) {
    &:hover {
      transform: rotate(360deg);
    }
  }
`;

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
  transition: border 0.5s;
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
