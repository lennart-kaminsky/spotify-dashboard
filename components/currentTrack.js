import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import styled from "styled-components";
import { devices } from "@/styles/devices";
import Icon from "@/components/icons";
import useHorizontalOverflow from "@/hooks/useHorizontalOverflow";

export default function CurrentTrack() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useState({});
  const [playbackState, setCurrentlyPlayingType] = useState({});
  const [recentlyPlayedTrack, setRecentlyPlayedTrack] = useState({});

  const ref = useRef();
  const horizontalOverflow = useHorizontalOverflow(ref, playbackState);
  console.log(horizontalOverflow);

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

  return (
    <StyledPlayer>
      {isReady && (
        <StyledPlayerLink href={`/tracks/${currentTrack.id}`}>
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
          <StyledSongContainer>
            <h2>{isPlayingTrack ? "playing " : "recently "}</h2>
            <StyledTrack ref={ref}>
              {isPlayingTrack
                ? currentTrack.name + " "
                : recentlyPlayedTrack.name + " "}
            </StyledTrack>
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
          </StyledSongContainer>
        </StyledPlayerLink>
      )}
      <StyledRecentlyLink href="/listening-history">
        <Icon variant="recently" size={30} />
      </StyledRecentlyLink>
    </StyledPlayer>
  );
}

const StyledPlayer = styled.section`
  position: fixed;
  bottom: 0;
  width: 100%;
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
  display: flex;
  align-items: center;
  gap: 2%;
  width: 100%;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  width: 55px;
  height: 55px;
  border-radius: 5px;
`;

const StyledSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  overflow: hidden;
  h2 {
    text-transform: none;
    font-size: 0.7rem;
    padding-block-end: 0.1rem;
  }

  @media screen and (min-width: ${devices.desktop + "px"}) {
    flex-direction: row;
    align-items: flex-end;
    gap: 0.5rem;
  }
`;

const StyledTrack = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.fontColor};
  white-space: nowrap;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    font-size: 1.6rem;
  }
`;

const StyledArtist = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.accentColor};
  @media screen and (min-width: ${devices.desktop + "px"}) {
    font-size: 1.6rem;
  }
`;

const StyledRecentlyLink = styled(Link)`
  margin-inline-start: auto;
`;
