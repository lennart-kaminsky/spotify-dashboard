import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import useSettingsStore from "@/stores/settingsStore";
import useScrollPositionStore from "@/stores/scrollPositionStore";
import handleScroll from "@/utils/handleScroll";
import { devices } from "@/styles/devices";
import styled from "styled-components";
import BackLink from "@/components/backLink";
import {
  StyledArtist,
  StyledListImage,
  StyledListItemLink,
  StyledTopList,
  StyledTrackInfo,
} from "@/components/top.Styled";

export default function ListeningHistory() {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();

  const [recentTracksInfo, setRecentTracksInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const recentlyList = useRef(null);

  const { prevPage, setPrevPage } = useSettingsStore();
  const { recentlyListPosition, setRecentlyListPosition } =
    useScrollPositionStore();

  useEffect(() => {
    setPrevPage("/listening-history");
  }, []);

  useEffect(() => {
    async function getRecentTracks() {
      setLoading(true);
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _recentTracks = await mySpotifyApi.getMyRecentlyPlayedTracks({
            limit: 50,
          });
          setRecentTracksInfo(_recentTracks.body.items);
        }
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    }
    getRecentTracks();
  }, [session, mySpotifyApi]);

  useEffect(() => {
    if (prevPage === "/") {
      setRecentlyListPosition(0);
    }
    if (recentlyList.current && !loading) {
      recentlyList.current.scrollTop = recentlyListPosition;
    }
  }, [recentlyList.current, loading, prevPage]);

  function playedAt(played_at) {
    const year = played_at.slice(0, 4);
    const month = played_at.slice(5, 7);
    const day = played_at.slice(8, 10);
    const time = played_at.slice(11, 16);

    return time + " " + month + "-" + day + "-" + year;
  }

  return (
    <StyledFlexContainer>
      <StyledFixedHeadline>Listening History</StyledFixedHeadline>
      <BackLink>Back to Dashboard</BackLink>
      {loading ? (
        <StyledRecentlyList>
          {Array.from({ length: 20 }, (_, index) => (
            <StyledRecentlyListItemLink as="li" key={index}>
              <StyledImageSkeleton />
              <StyledTextSkeleton />
            </StyledRecentlyListItemLink>
          ))}
        </StyledRecentlyList>
      ) : (
        <StyledRecentlyList
          ref={recentlyList}
          onScroll={() => handleScroll(recentlyList, setRecentlyListPosition)}
        >
          {recentTracksInfo.map((info) => (
            <li key={info.played_at}>
              <StyledRecentlyListItemLink href={`/tracks/${info.track.id}`}>
                <StyledRecentlyImage
                  src={info.track.album.images[0].url}
                  alt="Record Cover"
                  width={50}
                  height={50}
                />
                <StyledTrackInfo>
                  <StyledPlayedAt>{playedAt(info.played_at)}</StyledPlayedAt>
                  <span>{info.track.name + " "}</span>
                  <StyledArtist>
                    {info.track?.artists.map((artist, index) => {
                      if (index === 0) {
                        return artist.name;
                      } else {
                        return ", " + artist.name;
                      }
                    })}
                  </StyledArtist>
                </StyledTrackInfo>
              </StyledRecentlyListItemLink>
            </li>
          ))}
        </StyledRecentlyList>
      )}
    </StyledFlexContainer>
  );
}

const StyledFlexContainer = styled.div`
  @media screen and (min-width: ${devices.desktop + "px"}) {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
`;

const StyledFixedHeadline = styled.h2`
  @media screen and (min-width: ${devices.desktop + "px"}) {
    position: fixed;
    left: 2%;
  }
`;

const StyledRecentlyList = styled(StyledTopList)`
  padding-inline-end: 4%;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    padding-inline: 300px;
  }
`;

const StyledRecentlyListItemLink = styled(StyledListItemLink)`
  width: 100%;
  margin-block-end: 0.8rem;
  padding-inline-end: 0.5rem;
  margin-inline: 0;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    margin-inline: auto;
  }
`;

const StyledRecentlyImage = styled(StyledListImage)`
  width: 70px;
  height: 70px;
`;

const StyledPlayedAt = styled.span`
  color: ${({ theme }) => theme.hColor};
  font-size: 0.8rem;
`;

const StyledImageSkeleton = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${({ theme }) => theme.hColor};
  opacity: 20%;
  border-radius: 5px;
`;
const StyledTextSkeleton = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.fontColor};
  opacity: 20%;
  border-radius: 5px;
  margin-inline-end: 2%;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    min-width: 400px;
  }
`;
