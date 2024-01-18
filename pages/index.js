import { useSession } from "next-auth/react";
import CurrentTrack from "@/components/currentTrack";
import SigninOrOut from "@/components/signInOrOut";
import TopArtists from "@/components/topArtists";
import TopTracks from "@/components/topTracks";
import { useState } from "react";
import styled from "styled-components";

export default function Home({ showUserInfo }) {
  const { data: session } = useSession();
  const [showArtists, setShowArtists] = useState(true);

  return (
    <main>
      {session ? (
        showUserInfo ? (
          <SigninOrOut />
        ) : (
          <StyledTopContainer>
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
            <CurrentTrack />
          </StyledTopContainer>
        )
      ) : (
        <SigninOrOut signingIn />
      )}
    </main>
  );
}

export const StyledTopContainer = styled.section`
  padding-block-start: 2rem;
`;

const StyledArtistTrackButton = styled.button`
  all: unset;
  text-decoration: ${({ $active }) =>
    $active ? "line-through 3px var(--hColor)" : "none"};
  &:hover {
    color: var(--hColor);
    text-decoration: none;
  }
`;
