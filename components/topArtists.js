import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { NoStyleButton, NoStyleListItem } from "@/components/top.Styled";
import TimeRange from "./timeRange";

export default function TopArtists() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState("long_term");
  const [limit, setLimit] = useState(20);

  function handleTimeRange(range) {
    setTimeRange(range);
  }

  useEffect(() => {
    async function getTopArtists() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _topArtists = await mySpotifyApi.getMyTopArtists({
            time_range: timeRange,
            limit: limit,
          });
          setTopArtists(_topArtists.body.items);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getTopArtists();
  }, [session, mySpotifyApi, timeRange, limit]);

  return (
    <>
      <TimeRange timeRange={timeRange} onTimeRange={handleTimeRange} />
      <ol>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}

        {topArtists.length > 20 && (
          <NoStyleListItem>
            <NoStyleButton onClick={() => setLimit(limit - 10)}>
              less
            </NoStyleButton>
          </NoStyleListItem>
        )}
        {topArtists.length < 50 && topArtists.length === limit && (
          <NoStyleListItem>
            <NoStyleButton onClick={() => setLimit(limit + 10)}>
              more
            </NoStyleButton>
          </NoStyleListItem>
        )}
      </ol>
    </>
  );
}
