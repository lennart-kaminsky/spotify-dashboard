import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
import useSpotify from "@/hooks/useSpotify";

export default function CurrentTrack() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentlyPlayingType, setCurrentlyPlayingType] = useState("");

  useEffect(() => {
    async function getCurrentTrack() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const playbackState = await mySpotifyApi.getMyCurrentPlaybackState();

          if (playbackState.body?.currently_playing_type) {
            setCurrentlyPlayingType(playbackState.body.currently_playing_type);
          } else {
            setCurrentlyPlayingType("");
          }

          if (playbackState.body?.is_playing) {
            setCurrentTrack(playbackState.body.item);
          } else {
            setCurrentTrack({});
          }
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getCurrentTrack();

    const intervalId = setInterval(getCurrentTrack, 5000);
    return () => clearInterval(intervalId);
  }, [session, mySpotifyApi]);

  return (
    <StyledPlayer>
      <h2>
        {currentlyPlayingType === "track" &&
        Object.keys(currentTrack).length !== 0
          ? "You're listening to"
          : currentlyPlayingType === "episode"
          ? "You're listening to a podcast"
          : "You're not listening to any song"}
      </h2>
      {currentlyPlayingType === "track" &&
        Object.keys(currentTrack).length !== 0 && (
          <StyledPlayerContainer>
            <StyledImage
              src={currentTrack?.album.images[0].url}
              alt="album cover"
              width={640}
              height={640}
              priority
            />
            <p>
              {currentTrack.artists.map((artist) => artist.name) +
                " - " +
                currentTrack.name}
            </p>
          </StyledPlayerContainer>
        )}
    </StyledPlayer>
  );
}

const StyledPlayer = styled.section`
  position: fixed;
  bottom: 0;
  background-color: var(--bgColor);
  width: 100%;
  padding-block-start: 0.7rem;
  h2 {
    font-size: 1rem;
  }
`;

const StyledPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 0.5rem;
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
`;
