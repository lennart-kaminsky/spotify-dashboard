import { useState, useEffect, useRef } from "react";
import useSpotify from "@/hooks/useSpotify";
import useFilterStore from "@/stores/filterStore";
import useSpotifyStore from "@/stores/spotifyStore";
import useScrollPositionStore from "@/stores/scrollPositionStore";
import handleScroll from "@/utils/handleScroll";
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
import TopListSkeleton from "./topListSkeleton";

export default function TopTracks() {
  const mySpotifyApi = useSpotify();
  const { topTracks, setTopTracks } = useSpotifyStore();
  const { trackTimeRange, trackLimit, setTrackLimit } = useFilterStore();
  const { tracksTopListPosition, setTracksTopListPosition } =
    useScrollPositionStore();
  const [loading, setLoading] = useState(true);

  const topList = useRef(null);
  const topTracksLength = topTracks[trackTimeRange].slice(0, trackLimit).length;

  useEffect(() => {
    async function getTopTracks() {
      setLoading(true);
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _topTracksLong = await mySpotifyApi.getMyTopTracks({
            time_range: "long_term",
            limit: 50,
          });
          const _topTracksMedium = await mySpotifyApi.getMyTopTracks({
            time_range: "medium_term",
            limit: 50,
          });
          const _topTracksShort = await mySpotifyApi.getMyTopTracks({
            time_range: "short_term",
            limit: 50,
          });
          setTopTracks({
            long_term: _topTracksLong.body.items,
            medium_term: _topTracksMedium.body.items,
            short_term: _topTracksShort.body.items,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    if (topTracks.long_term.length === 0) {
      getTopTracks();
    } else setLoading(false);
  }, []);

  useEffect(() => {
    if (topList.current && loading) {
      const position = tracksTopListPosition[trackTimeRange];
      topList.current.scrollTop = position;
    }
  }, [topList.current, trackTimeRange, loading]);

  return (
    <>
      <TimeRange track />
      {loading ? (
        <TopListSkeleton />
      ) : (
        <StyledTopList
          ref={topList}
          onScroll={() =>
            handleScroll(topList, setTracksTopListPosition, trackTimeRange)
          }
        >
          {topTracks[trackTimeRange]
            .slice(0, trackLimit)
            .map((track, index) => (
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
          {topTracksLength > 20 && (
            <NoStyleListItem>
              <NoStyleButton onClick={() => setTrackLimit(trackLimit - 10)}>
                less
              </NoStyleButton>
            </NoStyleListItem>
          )}
          {topTracksLength < 50 && topTracksLength === trackLimit && (
            <NoStyleListItem>
              <NoStyleButton onClick={() => setTrackLimit(trackLimit + 10)}>
                more
              </NoStyleButton>
            </NoStyleListItem>
          )}
        </StyledTopList>
      )}
    </>
  );
}
