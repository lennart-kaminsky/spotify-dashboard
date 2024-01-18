import { useState } from "react";
import { useSession } from "next-auth/react";
import useScreenSize from "@/hooks/useScreenSize";
import CurrentTrack from "@/components/currentTrack";
import SigninOrOut from "@/components/signInOrOut";
import TopArtists from "@/components/topArtists";
import TopTracks from "@/components/topTracks";
import { devices } from "@/styles/devices";
import styled from "styled-components";

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
  text-decoration: ${({ $active }) =>
    $active ? "line-through 3px var(--hColor)" : "none"};

  :tap {
    color: var(--hColor);
    text-decoration: none;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--hColor);
      text-decoration: none;
    }
  }
`;
