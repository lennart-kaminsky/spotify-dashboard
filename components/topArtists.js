import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import {
  NoStyleButton,
  NoStyleListItem,
  StyledListImage,
  StyledTopList,
  StyledTopNumber,
  StyledTopNumberContainer,
  TopListItem,
} from "@/components/top.Styled";
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
      <StyledTopList>
        {topArtists.map((artist, index) => (
          <TopListItem key={artist.id}>
            <StyledListImage
              src={artist.images[0].url}
              alt="Picture of the artist"
              width={50}
              height={50}
            />
            <span>{artist.name}</span>
            <StyledTopNumberContainer>
              <StyledTopNumber>{index + 1}</StyledTopNumber>
            </StyledTopNumberContainer>
          </TopListItem>
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
      </StyledTopList>
    </>
  );
}
