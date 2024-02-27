import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSpotify from "@/hooks/useSpotify";
import styled from "styled-components";
import { devices } from "@/styles/devices";
import SigninOrOut from "@/components/signInOrOut";
import Icon from "@/components/icons";
import {
  StyledArtist,
  StyledListImage,
  StyledTopList,
  StyledTrackInfo,
  TopListItem,
} from "@/components/top.Styled";

export default function ListeningHistory({ showUserInfo, theme, onSetTheme }) {
  const { data: session } = useSession();
  const mySpotifyApi = useSpotify();
  const [recentTracksInfo, setRecentTracksInfo] = useState([]);

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
    <main>
      {session ? (
        showUserInfo ? (
          <SigninOrOut theme={theme} onSetTheme={onSetTheme} />
        ) : (
          <StyledFlexContainer>
            <StyledFixedHeadline>Listening History</StyledFixedHeadline>
            <StyledLink href="/">
              <StyledInnerLinkContainer>
                <StyledIcon variant="back" size="1rem" />
                Back to Dashboard
              </StyledInnerLinkContainer>
            </StyledLink>
            <StyledRecentlyList>
              {recentTracksInfo.map((info) => (
                <StyledRecentlyListItem key={info.played_at}>
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
                </StyledRecentlyListItem>
              ))}
            </StyledRecentlyList>
          </StyledFlexContainer>
        )
      ) : (
        <SigninOrOut signingIn theme={theme} onSetTheme={onSetTheme} />
      )}
    </main>
  );
}

const StyledFlexContainer = styled.div`
  @media screen and (min-width: ${devices.desktop + "px"}) {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.hColor};
  @media screen and (min-width: ${devices.desktop + "px"}) {
    position: fixed;
    left: 2%;
    top: 130px;
  }
  @media (hover: hover) {
    &:hover {
      letter-spacing: 0.1rem;
    }
  }
`;
const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.hColor};
`;

const StyledInnerLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
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

const StyledRecentlyListItem = styled(TopListItem)`
  margin-block-end: 0.8rem;
`;

const StyledRecentlyImage = styled(StyledListImage)`
  width: 70px;
  height: 70px;
`;

const StyledPlayedAt = styled.span`
  color: ${({ theme }) => theme.hColor};
  font-size: 0.8rem;
`;
