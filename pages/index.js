import styled, { css } from "styled-components";
import useScreenSize from "@/hooks/useScreenSize";
import useFilterStore from "@/stores/filterStore";
import { devices } from "@/styles/devices";
import CurrentTrack from "@/components/currentTrack";
import TopArtists from "@/components/topArtists";
import TopTracks from "@/components/topTracks";

export default function Home({ onSetPrevPage }) {
  const screenSize = useScreenSize();
  const { showArtists, setShowArtists } = useFilterStore();

  onSetPrevPage("/");

  return (
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
  );
}

const StyledTopContainer = styled.section`
  @media screen and (min-width: ${devices.desktop + "px"}) {
    display: flex;
    justify-content: space-evenly;
  }
`;

const StyledTopWrapper = styled.div`
  width: 50%;
`;

const StyledArtistTrackButton = styled.button`
  all: unset;
  transition: font-size 0.5s;
  ${({ $active }) =>
    $active &&
    css`
      font-size: 1rem;
      color: ${({ theme }) => theme.hColor};
      @media (hover: hover) {
        &:hover {
          cursor: pointer;
          color: ${({ theme }) => theme.accentColor};
          text-decoration: none;
        }
      }
    `}
`;
