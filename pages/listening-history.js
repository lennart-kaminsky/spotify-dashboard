import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import useSpotify from "@/hooks/useSpotify";
import { devices } from "@/styles/devices";
import BackLink from "@/components/backLink";
import {
  StyledArtist,
  StyledListImage,
  StyledListItemLink,
  StyledTopList,
  StyledTrackInfo,
} from "@/components/top.Styled";

export default function ListeningHistory({ onSetPrevPage }) {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [recentTracksInfo, setRecentTracksInfo] = useState([]);

  onSetPrevPage("/listening-history");

  useEffect(() => {
    async function getRecentTracks() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _recentTracks = await mySpotifyApi.getMyRecentlyPlayedTracks({
            limit: 50,
          });
          setRecentTracksInfo(_recentTracks.body.items);
        }
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    }
    getRecentTracks();
  }, [session, mySpotifyApi]);

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
      <StyledRecentlyList>
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
    </StyledFlexContainer>
  );
}

const StyledFlexContainer = styled.div`
  @media screen and (min-width: ${devices.desktop + "px"}) {
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
  @media screen and (min-width: ${devices.desktop + "px"}) {
    position: static;
    width: auto;
  }
`;

const StyledRecentlyListItemLink = styled(StyledListItemLink)`
  width: 100%;
  margin-block-end: 0.8rem;
  padding-inline-end: 0.5rem;
`;

const StyledRecentlyImage = styled(StyledListImage)`
  width: 70px;
  height: 70px;
`;

const StyledPlayedAt = styled.span`
  color: ${({ theme }) => theme.hColor};
  font-size: 0.8rem;
`;
