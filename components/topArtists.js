import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { StyledTopContainer } from "@/components/top.Styled";

export default function TopArtists() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    async function getTopArtists() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _topArtists = await mySpotifyApi.getMyTopArtists({
            time_range: "long_term",
          });
          setTopArtists(_topArtists.body.items);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getTopArtists();
  }, [session, mySpotifyApi]);

  return (
    <StyledTopContainer>
      <h2>You{"'"}re Top Artists</h2>
      <ol>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ol>
    </StyledTopContainer>
  );
}
