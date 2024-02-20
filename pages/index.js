import { useState } from "react";
import { useSession } from "next-auth/react";
import useScreenSize from "@/hooks/useScreenSize";
import CurrentTrack from "@/components/currentTrack";
import SigninOrOut from "@/components/signInOrOut";
import TopArtists from "@/components/topArtists";
import TopTracks from "@/components/topTracks";
import { devices } from "@/styles/devices";
import styled, { css } from "styled-components";

export default function Home({ showUserInfo, theme, onSetTheme }) {
  const { data: session } = useSession();
  const [showArtists, setShowArtists] = useState(true);
  const screenSize = useScreenSize();

  return (
    <main>
      {session ? (
        showUserInfo ? (
          <SigninOrOut theme={theme} onSetTheme={onSetTheme} />
        ) : (
          <>
            <StyledTopContainer>
              {screenSize.width < devices.desktop ? (
                <>
                  <h2>
                    Your Top{" "}
                    <StyledArtistTrackButton
                      $active={!showArtists}
                      onClick={() => setShowArtists(true)}
                    >
                      Artists
                    </StyledArtistTrackButton>{" "}
                    <StyledArtistTrackButton
                      $active={showArtists}
                      onClick={() => setShowArtists(false)}
                    >
                      Tracks
                    </StyledArtistTrackButton>{" "}
                  </h2>
                  {showArtists ? <TopArtists /> : <TopTracks />}
                </>
              ) : (
                <>
                  <StyledTopWrapper>
                    <h2>Your Top Artists</h2>
                    <TopArtists />
                  </StyledTopWrapper>
                  <StyledTopWrapper>
                    <h2>Your Top Tracks</h2>
                    <TopTracks />
                  </StyledTopWrapper>
                </>
              )}
            </StyledTopContainer>
            <CurrentTrack />
          </>
        )
      ) : (
        <SigninOrOut signingIn theme={theme} onSetTheme={onSetTheme} />
      )}
    </main>
  );
}

const StyledTopContainer = styled.section`
  padding-block-start: 2rem;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    display: flex;
    justify-content: space-evenly;
  }
`;
const StyledTopWrapper = styled.div`
  width: 50%;
  padding-inline: 10%;
`;

const StyledArtistTrackButton = styled.button`
  all: unset;
  color: ${({ theme }) => theme.hColor};
  ${({ $active }) =>
    $active &&
    css`
      font-size: 1rem;
      color: ${({ theme }) => theme.accentColor};
      text-decoration: ${({ theme }) => "line-through 2px " + theme.hColor};
    `}
  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.hColor};
      text-decoration: none;
    }
  }
`;
