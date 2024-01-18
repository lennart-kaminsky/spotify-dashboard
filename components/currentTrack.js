import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
import useSpotify from "@/hooks/useSpotify";

export default function CurrentTrack() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useState({});
  const [playbackState, setCurrentlyPlayingType] = useState({});
  const [recentlyPlayedTrack, setRecentlyPlayedTrack] = useState({});

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

  console.log("currentTrack", currentTrack);
  console.log("playbackState", playbackState);
  console.log("recentlyPlayed", recentlyPlayedTrack);

  const isReady =
    Object.keys(playbackState).length > 0 &&
    Object.keys(recentlyPlayedTrack).length;

  return (
    <>
      {/* <h2>
        {playbackState.currently_playing_type === "track" &&
        Object.keys(currentTrack).length !== 0
          ? "You're listening to"
          : playbackState.currently_playing_type === "episode"
          ? "You're listening to a podcast"
          : "You're not listening to any song"}
      </h2> */}
      <StyledPlayer>
        {playbackState.currently_playing_type === "track" &&
        Object.keys(currentTrack).length !== 0 ? (
          <>
            <StyledImage
              src={currentTrack?.album.images[0].url}
              alt="album cover"
              width={640}
              height={640}
              priority
            />
            <StyledSongContainer>
              <h2>Listening to</h2>
              <span>
                {currentTrack.name + " "}
                <StyledArtist>
                  {currentTrack.artists.map((artist) => artist.name)}
                </StyledArtist>
              </span>
            </StyledSongContainer>
          </>
        ) : playbackState.currently_playing_type == "episode" ? (
          <h2>Listening to a podcast</h2>
        ) : (
          <h2>Not listening to anything</h2>
        )}
      </StyledPlayer>
    </>
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
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
`;

const StyledSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  h2 {
    font-size: 1rem;
  }
`;

const StyledArtist = styled.span`
  font-size: 0.9rem;
  color: var(--accentColor);
`;
