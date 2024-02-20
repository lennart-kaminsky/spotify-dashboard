import { useState } from "react";
import { useSession } from "next-auth/react";
import useScreenSize from "@/hooks/useScreenSize";
import CurrentTrack from "@/components/currentTrack";
import SigninOrOut from "@/components/signInOrOut";
import TopArtists from "@/components/topArtists";
import TopTracks from "@/components/topTracks";
import { devices } from "@/styles/devices";
import styled, { css } from "styled-components";

export default function Home({ showUserInfo }) {
  const { data: session } = useSession();
  const [showArtists, setShowArtists] = useState(true);
  const screenSize = useScreenSize();

  return (
    <main>
      {session ? (
        showUserInfo ? (
          <SigninOrOut />
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
        <SigninOrOut signingIn />
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
  color: var(--hColor);
  ${({ $active }) =>
    $active &&
    css`
      font-size: 1rem;
      color: var(--accentColor);
      text-decoration: line-through 2px var(--hColor);
    `}
  @media (hover: hover) {
    &:hover {
      color: var(--hColor);
      text-decoration: none;
    }
  }
`;
