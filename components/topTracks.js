import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { StyledTopContainer } from "@/components/top.Styled";

export default function TopTracks() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    async function getTopTracks() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _topTracks = await mySpotifyApi.getMyTopTracks({
            time_range: "long_term",
          });
          setTopTracks(_topTracks.body.items);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getTopTracks();
  }, [session, mySpotifyApi]);

  return (
    <StyledTopContainer>
      <h2>Your Top Tracks</h2>
      <ol>
        {topTracks.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ol>
    </StyledTopContainer>
  );
}
