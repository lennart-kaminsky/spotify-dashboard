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
import styled from "styled-components";

export default function TopTracks() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState([]);
  const [timeRange, setTimeRange] = useState("long_term");
  const [limit, setLimit] = useState(20);

  function handleTimeRange(range) {
    setTimeRange(range);
  }

  useEffect(() => {
    async function getTopTracks() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _topTracks = await mySpotifyApi.getMyTopTracks({
            time_range: timeRange,
            limit: limit,
          });
          setTopTracks(_topTracks.body.items);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getTopTracks();
  }, [session, mySpotifyApi, timeRange, limit]);

  return (
    <>
      <TimeRange timeRange={timeRange} onTimeRange={handleTimeRange} />
      <StyledTopList>
        {topTracks.map((track, index) => (
          <TopListItem key={track.id}>
            <StyledListImage
              src={track.album.images[0].url}
              alt="Record cover"
              width={50}
              height={50}
            />
            <StyledTrackInfo>
              <span>{track.name + " "}</span>
              <StyledArtist>
                {track?.artists.map((artist, index) => {
                  if (index === 0) {
                    return artist.name;
                  } else {
                    return ", " + artist.name;
                  }
                })}
              </StyledArtist>
            </StyledTrackInfo>
            <StyledTopNumberContainer>
              <StyledTopNumber>{index + 1}</StyledTopNumber>
            </StyledTopNumberContainer>
          </TopListItem>
        ))}
        {topTracks.length > 20 && (
          <NoStyleListItem>
            <NoStyleButton onClick={() => setLimit(limit - 10)}>
              less
            </NoStyleButton>
          </NoStyleListItem>
        )}
        {topTracks.length < 50 && topTracks.length === limit && (
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

const StyledTrackInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledArtist = styled.span`
  color: ${({ theme }) => theme.accentColor};
  font-size: 0.8rem;
`;
