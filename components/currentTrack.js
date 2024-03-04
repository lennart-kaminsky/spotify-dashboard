import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import useSpotify from "@/hooks/useSpotify";
import styled, { css, keyframes } from "styled-components";
import { devices } from "@/styles/devices";
import Icon from "@/components/icons";
import useHorizontalOverflow from "@/hooks/useHorizontalOverflow";
import useScreenSize from "@/hooks/useScreenSize";

export default function CurrentTrack() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useState({});
  const [playbackState, setCurrentlyPlayingType] = useState({});
  const [recentlyPlayedTrack, setRecentlyPlayedTrack] = useState({});
  const screenSize = useScreenSize();

  // const trackArtistRef = useRef(null);
  // const trackArtistHorizontalOverflow = useHorizontalOverflow(
  //   trackArtistRef,
  //   playbackState
  // );
  const trackRef = useRef(null);
  const trackHorizontalOverflow = useHorizontalOverflow(
    trackRef,
    playbackState
  );
  // const trackScrollerRef = useRef(null);
  // const trackScrollerHorizontalOverflow = useHorizontalOverflow(
  //   trackScrollerRef,
  //   playbackState
  // );
  // const artistRef = useRef(null);
  // const artistHorizontalOverflow = useHorizontalOverflow(
  //   artistRef,
  //   playbackState
  // );

  // console.log("trackArtsit", trackArtistHorizontalOverflow);
  console.log("track", trackHorizontalOverflow);
  // console.log("trackScoller", trackScrollerHorizontalOverflow);
  // console.log("artist", artistHorizontalOverflow);

  useEffect(() => {
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
    }

    getCurrentTrack();

    const intervalId = setInterval(getCurrentTrack, 5000);
    return () => clearInterval(intervalId);
  }, [session, mySpotifyApi]);

  const isReady = Object.keys(recentlyPlayedTrack).length;

  const isPlayingTrack =
    playbackState &&
    playbackState.is_playing &&
    playbackState.currently_playing_type === "track";

  console.log("AAAAAAAA", trackRef.current?.scrollWidth);

  return (
    <StyledPlayer>
      {isReady && (
        <StyledPlayerLink
          href={`/tracks/${
            isPlayingTrack ? currentTrack.id : recentlyPlayedTrack.id
          }`}
        >
          <StyledImage
            src={
              isPlayingTrack
                ? currentTrack?.album.images[0].url
                : recentlyPlayedTrack?.album.images[0].url
            }
            alt="album cover"
            width={640}
            height={640}
            priority
          />
          <StyledInnerPlayerLinkContainer>
            <h2>{isPlayingTrack ? "playing " : "recently "}</h2>
            <StyledTrackArtistContainer
            // ref={trackArtistRef}
            >
              <StyledScroller
                // ref={trackScrollerRef}
                $hasOverflow={trackHorizontalOverflow}
                $elementwidth={trackRef.current?.scrollWidth}
              >
                {/* <StyledTrack
                  ref={trackRef}
                  $elementwidth={trackRef.current?.scrollWidth}
                >
                  {isPlayingTrack ? (
                    trackHorizontalOverflow ? (
                      <>
                        <StyledTrackSpan>
                          {currentTrack.name + " "}
                        </StyledTrackSpan>
                        <StyledTrackSpan>
                          {currentTrack.name + " "}
                        </StyledTrackSpan>
                      </>
                    ) : (
                      <StyledTrackSpan>
                        {currentTrack.name + " "}
                      </StyledTrackSpan>
                    )
                  ) : trackHorizontalOverflow ? (
                    <>
                      <StyledTrackSpan>
                        {recentlyPlayedTrack.name + " "}
                      </StyledTrackSpan>
                      <StyledTrackSpan>
                        {recentlyPlayedTrack.name + " "}
                      </StyledTrackSpan>
                    </>
                  ) : (
                    <StyledTrackSpan>
                      {recentlyPlayedTrack.name + " "}
                    </StyledTrackSpan>
                  )}
                </StyledTrack> */}

                <StyledAnimatedTrack $hasOverflow={trackHorizontalOverflow}>
                  {isPlayingTrack ? (
                    <>
                      <StyledTrackSpan>{currentTrack.name}</StyledTrackSpan>
                      <StyledTrackSpan>{currentTrack.name}</StyledTrackSpan>
                    </>
                  ) : (
                    <>
                      <StyledTrackSpan>
                        {recentlyPlayedTrack.name}
                      </StyledTrackSpan>
                      <StyledTrackSpan>
                        {recentlyPlayedTrack.name}
                      </StyledTrackSpan>
                    </>
                  )}
                </StyledAnimatedTrack>

                <StyledTrack
                  ref={trackRef}
                  // $elementwidth={trackRef.current?.scrollWidth}
                  $hasOverflow={trackHorizontalOverflow}
                >
                  {isPlayingTrack
                    ? currentTrack.name + " "
                    : recentlyPlayedTrack.name + " "}
                </StyledTrack>

                {/* //--------- */}
                {/* {trackHorizontalOverflow && (
                  <StyledTrack $elementwidth={trackRef.current?.scrollWidth}>
                    {isPlayingTrack
                      ? currentTrack.name + " "
                      : recentlyPlayedTrack.name + " "}
                  </StyledTrack>
                )} */}
              </StyledScroller>
              <StyledScroller
              // ref={artistRef}
              // $hasOverflow={artistHorizontalOverflow}
              // elemWidth={artistRef.current?.scrollWidth}
              >
                <StyledArtist>
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
                {/* {artistHorizontalOverflow && (
                  <StyledArtist>
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
                )} */}
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
  /* border: 1px solid red; */
  width: 100%;
  height: 70px;
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
  /* max-width: 100%; */
  overflow: hidden;
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
  gap: 2%;
`;

const StyledImage = styled(Image)`
  width: 55px;
  height: 55px;
  border-radius: 5px;
`;

const StyledInnerPlayerLinkContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  /* border: 1px solid red; */
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
  /* overflow: hidden; */
  /* border: 3px solid lightblue; */
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
  /* display: inline-block; */
  /* width: 100%; */
  /* max-width: 100%; */
  /* overflow: hidden; //DAS HIER IST GEFÄHRLICH */
  /* display: flex; */
  /* background-color: purple; */
  white-space: nowrap;
  animation: ${({ $hasOverflow, $elementwidth }) =>
    $hasOverflow && css`12s ${slide($elementwidth)} infinite linear`};
`;

const StyledTrack = styled.div`
  /* overflow: hidden; */
  /* max-width: ${({ $elementwidth }) => $elementwidth && 2 * $elementwidth}; */
  max-width: 100%;
  /* width: auto; */
  display: inline-block;
  /* background-color: limegreen; */
  white-space: nowrap;
  font-size: 1rem;
  color: ${({ theme }) => theme.fontColor};
  padding-inline-end: 2rem;

  /* visibility: hidden; */
  visibility: ${({ $hasOverflow }) => ($hasOverflow ? "hidden" : "visible")};
`;

const StyledAnimatedTrack = styled(StyledTrack)`
  position: absolute;
  visibility: ${({ $hasOverflow }) => ($hasOverflow ? "visible" : "hidden")};
`;

const StyledTrackSpan = styled.span`
  padding-inline-end: 4rem;
`;

const StyledArtist = styled.div`
  /* overflow: hidden; */
  /* max-width: 100%; */
  /* width: auto; */
  display: inline-block;
  /* background-color: limegreen; */
  font-size: 0.7rem;
  color: ${({ theme }) => theme.accentColor};
  white-space: nowrap;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    font-size: 0.9rem;
  }
`;

const StyledRecentlyLink = styled(Link)`
  margin-inline-start: auto;
`;
