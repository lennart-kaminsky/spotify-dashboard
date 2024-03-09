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
  StyledListItemLink,
  StyledTopList,
  StyledTopNumber,
  StyledTopNumberContainer,
} from "@/components/top.Styled";

export default function TopArtists() {
  const mySpotifyApi = useSpotify();
  const { topArtists, setTopArtists } = useSpotifyStore();
  const { artistTimeRange, artistLimit, setArtistLimit } = useFilterStore();
  const { artistsTopListPosition, setArtistsTopListPosition } =
    useScrollPositionStore();
  const [loadedArtists, setLoadedArtists] = useState(false);

  const topList = useRef(null);
  const topArtistsLength = topArtists[artistTimeRange].slice(
    0,
    artistLimit
  ).length;

  useEffect(() => {
    async function getTopArtists() {
      setLoadedArtists(false);
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _topArtistsLong = await mySpotifyApi.getMyTopArtists({
            time_range: "long_term",
            limit: 50,
          });
          const _topArtistsMedium = await mySpotifyApi.getMyTopArtists({
            time_range: "medium_term",
            limit: 50,
          });
          const _topArtistsShort = await mySpotifyApi.getMyTopArtists({
            time_range: "short_term",
            limit: 50,
          });
          setTopArtists({
            long_term: _topArtistsLong.body.items,
            medium_term: _topArtistsMedium.body.items,
            short_term: _topArtistsShort.body.items,
          });
          setLoadedArtists(true);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getTopArtists();
  }, []);

  useEffect(() => {
    if (topList.current && loadedArtists) {
      const position = artistsTopListPosition[artistTimeRange];
      topList.current.scrollTop = position;
    }
  }, [topList.current, artistTimeRange, loadedArtists]);

  return (
    <>
      <TimeRange artist />
      <StyledTopList
        ref={topList}
        onScroll={() =>
          handleScroll(topList, setArtistsTopListPosition, artistTimeRange)
        }
      >
        {topArtists[artistTimeRange]
          .slice(0, artistLimit)
          .map((artist, index) => (
            <li key={artist.id}>
              <StyledListItemLink href={`/artists/${artist.id}`}>
                <StyledListImage
                  unoptimized
                  src={artist.images[0].url}
                  alt="Picture of the artist"
                  width={50}
                  height={50}
                />
                <span>{artist.name}</span>
                <StyledTopNumberContainer>
                  <StyledTopNumber>{index + 1}</StyledTopNumber>
                </StyledTopNumberContainer>
              </StyledListItemLink>
            </li>
          ))}

        {topArtistsLength > 20 && (
          <NoStyleListItem>
            <NoStyleButton onClick={() => setArtistLimit(artistLimit - 10)}>
              less
            </NoStyleButton>
          </NoStyleListItem>
        )}
        {topArtistsLength < 50 && topArtistsLength === artistLimit && (
          <NoStyleListItem>
            <NoStyleButton onClick={() => setArtistLimit(artistLimit + 10)}>
              more
            </NoStyleButton>
          </NoStyleListItem>
        )}
      </StyledTopList>
    </>
  );
}
