import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styled, { css, keyframes } from "styled-components";
import useSpotify from "@/hooks/useSpotify";
import useHorizontalOverflow from "@/hooks/useHorizontalOverflow";
import { devices } from "@/styles/devices";
import Icon from "@/components/icons";

export default function CurrentTrack() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useState({});
  const [playbackState, setCurrentlyPlayingType] = useState({});
  const [recentlyPlayedTrack, setRecentlyPlayedTrack] = useState({});
  const [loading, setLoading] = useState(true);

  const trackRef = useRef(null);
  const trackHorizontalOverflow = useHorizontalOverflow(
    trackRef,
    playbackState
  );

  const artistRef = useRef(null);
  const artistHorizontalOverflow = useHorizontalOverflow(
    artistRef,
    playbackState
  );

  useEffect(() => {
    setLoading(true);
    async function getCurrentTrack() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _playbackState = await mySpotifyApi.getMyCurrentPlaybackState();

          if (_playbackState) {
            setCurrentlyPlayingType(_playbackState.body);
          } else {
            setCurrentlyPlayingType({});
          }
          if (_playbackState.body?.is_playing) {
            setCurrentTrack(_playbackState.body.item);
          } else {
            setCurrentTrack({});
          }
          const recentlyPlayed = await mySpotifyApi.getMyRecentlyPlayedTracks({
            limit: 1,
          });
          setRecentlyPlayedTrack(recentlyPlayed.body.items[0].track);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
      setLoading(false);
    }
    getCurrentTrack();
    const intervalId = setInterval(getCurrentTrack, 5000);
    return () => clearInterval(intervalId);
  }, [session, mySpotifyApi]);

  const isPlayingTrack =
    playbackState &&
    playbackState.is_playing &&
    playbackState.currently_playing_type === "track";

  return (
    <StyledPlayer>
      {loading ? (
        <StyledLoadingSkeleton>
          <StyledImageSkeleton />
          <StyledTextSkeleton />
        </StyledLoadingSkeleton>
      ) : (
        <StyledPlayerLink
          href={`/tracks/${
            isPlayingTrack ? currentTrack.id : recentlyPlayedTrack.id
          }`}
        >
          <StyledImage
            src={
              isPlayingTrack
                ? currentTrack?.album.images[2].url
                : recentlyPlayedTrack?.album.images[2].url
            }
            alt="album cover"
            width={50}
            height={50}
            priority
          />
          <StyledInnerPlayerLinkContainer>
            <h2>{isPlayingTrack ? "playing " : "recently "}</h2>
            <StyledTrackArtistContainer>
              <StyledScroller
                $hasOverflow={trackHorizontalOverflow}
                $elementwidth={trackRef.current?.scrollWidth}
              >
                <StyledAnimatedTrack $hasOverflow={trackHorizontalOverflow}>
                  {isPlayingTrack ? (
                    <>
                      <StyledSpan>{currentTrack.name}</StyledSpan>
                      <StyledSpan>{currentTrack.name}</StyledSpan>
                    </>
                  ) : (
                    <>
                      <StyledSpan>{recentlyPlayedTrack.name}</StyledSpan>
                      <StyledSpan>{recentlyPlayedTrack.name}</StyledSpan>
                    </>
                  )}
                </StyledAnimatedTrack>

                <StyledTrack
                  ref={trackRef}
                  $hasOverflow={trackHorizontalOverflow}
                >
                  {isPlayingTrack
                    ? currentTrack.name + " "
                    : recentlyPlayedTrack.name + " "}
                </StyledTrack>
              </StyledScroller>
              <StyledScroller
                $hasOverflow={artistHorizontalOverflow}
                $elementwidth={artistRef.current?.scrollWidth}
              >
                <StyledAnimatedArtist $hasOverflow={artistHorizontalOverflow}>
                  {isPlayingTrack ? (
                    <>
                      <StyledSpan>
                        {currentTrack.artists.map((artist, index) => {
                          if (index === 0) {
                            return artist.name;
                          } else {
                            return ", " + artist.name;
                          }
                        })}
                      </StyledSpan>
                      <StyledSpan>
                        {currentTrack.artists.map((artist, index) => {
                          if (index === 0) {
                            return artist.name;
                          } else {
                            return ", " + artist.name;
                          }
                        })}
                      </StyledSpan>
                    </>
                  ) : (
                    <>
                      <StyledSpan>
                        {recentlyPlayedTrack.artists.map((artist, index) => {
                          if (index === 0) {
                            return artist.name;
                          } else {
                            return ", " + artist.name;
                          }
                        })}
                      </StyledSpan>
                      <StyledSpan>
                        {recentlyPlayedTrack.artists.map((artist, index) => {
                          if (index === 0) {
                            return artist.name;
                          } else {
                            return ", " + artist.name;
                          }
                        })}
                      </StyledSpan>
                    </>
                  )}
                </StyledAnimatedArtist>
                <StyledArtist
                  ref={artistRef}
                  $hasOverflow={artistHorizontalOverflow}
                >
                  {isPlayingTrack
                    ? currentTrack.artists.map((artist, index) => {
                        if (index === 0) {
                          return artist.name;
                        } else {
                          return ", " + artist.name;
                        }
                      })
                    : recentlyPlayedTrack.artists.map((artist, index) => {
                        if (index === 0) {
                          return artist.name;
                        } else {
                          return ", " + artist.name;
                        }
                      })}
                </StyledArtist>
              </StyledScroller>
            </StyledTrackArtistContainer>
          </StyledInnerPlayerLinkContainer>
        </StyledPlayerLink>
      )}
      <StyledRecentlyLink href="/listening-history">
        <Icon variant="recently" size={30} />
      </StyledRecentlyLink>
    </StyledPlayer>
  );
}

const StyledPlayer = styled.section`
  width: 100%;
  height: 65px;
  position: fixed;
  bottom: 0;
  margin-inline: -2%;
  padding: 0.6rem 2% 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.bgDarker};

  @media (hover: hover) {
    &:hover *,
    &:hover {
      color: ${({ theme }) => theme.hColor};
    }
  }
`;

const StyledPlayerLink = styled(Link)`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const StyledInnerPlayerLinkContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  h2 {
    text-transform: none;
    font-size: 0.7rem;
    padding-block-end: 0.1rem;
    width: auto;
  }

  @media screen and (min-width: ${devices.desktop + "px"}) {
    flex-direction: row;
    align-items: flex-end;
    gap: 0.5rem;
  }
`;

const StyledTrackArtistContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    flex-direction: row;
    align-items: flex-end;
    gap: 0.5rem;
  }
`;

const slide = (elementWidth) => keyframes`
0% {
  transform: translate(0);
}
100% {
  transform: translate(calc(-${elementWidth}px - 4rem));
}
`;

const StyledScroller = styled.div`
  position: relative;
  white-space: nowrap;
  animation: ${({ $hasOverflow, $elementwidth }) =>
    $hasOverflow && css`13s ${slide($elementwidth)} infinite linear`};
`;

const StyledTrack = styled.div`
  max-width: 100%;
  display: inline-block;
  white-space: nowrap;
  font-size: 1rem;
  color: ${({ theme }) => theme.fontColor};

  visibility: ${({ $hasOverflow }) => ($hasOverflow ? "hidden" : "visible")};
`;

const StyledAnimatedTrack = styled(StyledTrack)`
  position: absolute;
  visibility: ${({ $hasOverflow }) => ($hasOverflow ? "visible" : "hidden")};
`;

const StyledSpan = styled.span`
  padding-inline-end: 4rem;
`;

const StyledArtist = styled.div`
  max-width: 100%;
  display: inline-block;
  white-space: nowrap;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.accentColor};
  visibility: ${({ $hasOverflow }) => ($hasOverflow ? "hidden" : "visible")};

  @media screen and (min-width: ${devices.desktop + "px"}) {
    font-size: 0.9rem;
  }
`;

const StyledAnimatedArtist = styled(StyledArtist)`
  position: absolute;
  bottom: 1px;
  visibility: ${({ $hasOverflow }) => ($hasOverflow ? "visible" : "hidden")};
`;

const StyledRecentlyLink = styled(Link)`
  margin-inline-start: auto;
`;

const StyledLoadingSkeleton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledImageSkeleton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.hColor};
  opacity: 20%;
`;

const StyledTextSkeleton = styled.div`
  width: 100%;
  max-width: 700px;
  height: 25px;
  background-color: ${({ theme }) => theme.fontColor};
  opacity: 20%;
  border-radius: 5px;
  margin-inline-end: 1rem;
`;
