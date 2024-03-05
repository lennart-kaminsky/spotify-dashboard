import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import useFilterStore from "@/stores/filterStore";
import TimeRange from "@/components/timeRange";
import {
  NoStyleButton,
  NoStyleListItem,
  StyledListImage,
  StyledTopList,
  StyledTopNumber,
  StyledTopNumberContainer,
  StyledTrackInfo,
  StyledArtist,
  StyledListItemLink,
} from "@/components/top.Styled";

export default function TopTracks() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState([]);
  const { trackTimeRange, trackLimit, setTrackLimit } = useFilterStore();

  useEffect(() => {
    async function getTopTracks() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _topTracks = await mySpotifyApi.getMyTopTracks({
            time_range: trackTimeRange,
            limit: trackLimit,
          });
          setTopTracks(_topTracks.body.items);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getTopTracks();
  }, [session, mySpotifyApi, trackTimeRange, trackLimit]);

  return (
    <>
      <TimeRange track />
      <StyledTopList>
        {topTracks.map((track, index) => (
          <li key={track.id}>
            <StyledListItemLink href={`/tracks/${track.id}`}>
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
            </StyledListItemLink>
          </li>
        ))}
        {topTracks.length > 20 && (
          <NoStyleListItem>
            <NoStyleButton onClick={() => setTrackLimit(trackLimit - 10)}>
              less
            </NoStyleButton>
          </NoStyleListItem>
        )}
        {topTracks.length < 50 && topTracks.length === trackLimit && (
          <NoStyleListItem>
            <NoStyleButton onClick={() => setTrackLimit(trackLimit + 10)}>
              more
            </NoStyleButton>
          </NoStyleListItem>
        )}
      </StyledTopList>
    </>
  );
}
