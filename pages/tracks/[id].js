import BackLink from "@/components/backLink";
import Icon from "@/components/icons";
import {
  StyledHeadlineContainer,
  StyledInfoContainer,
  StyledInfoImage,
  StyledOpenIcon,
  StyledTable,
} from "@/components/info.Styled";
import SigninOrOut from "@/components/signInOrOut";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Track({ showUserInfo, theme, onSetTheme }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const mySpotifyApi = useSpotify();

  const [track, setTrack] = useState({});
  const [trackLoaded, setTrackLoaded] = useState(false);

  useEffect(() => {
    async function getTrack() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _track = await mySpotifyApi.getTrack(id);
          setTrack(_track.body);
          console.log(_track.body);
          setTrackLoaded(true);
        }
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    }
    getTrack();
  }, [router, isReady, session, mySpotifyApi, id, trackLoaded]);

  function msToMin(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  if (isReady && trackLoaded) {
    return (
      <main>
        {session ? (
          showUserInfo ? (
            <SigninOrOut theme={theme} onSetTheme={onSetTheme} />
          ) : (
            <StyledInfoContainer>
              <StyledInfoImage
                $record
                src={track.album.images[0].url}
                alt={`Picture of ${track.artists[0].name}`}
                width={300}
                height={300}
              />

              <StyledHeadlineContainer
                href={track.external_urls.spotify}
                target="_blank"
              >
                <h2>{track.name}</h2>
                <StyledOpenIcon variant="openInNew" size="1rem" />
              </StyledHeadlineContainer>

              <StyledTable>
                <tbody>
                  <tr>
                    <th>Artists</th>
                    <td>
                      <ul>
                        {track.artists.map((artist) => (
                          <li key={artist.id}>
                            <StyledExternalLink
                              href={artist.external_urls.spotify}
                              target="_blank"
                            >
                              <span>{artist.name + " "}</span>
                              <Icon variant="openInNew" size="0.8rem" />
                            </StyledExternalLink>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>Popularity</th>
                    <td>{track.popularity}</td>
                  </tr>
                  <tr>
                    <th>Album</th>
                    <td>
                      <StyledExternalLink
                        href={track.album.external_urls.spotify}
                        target="_blank"
                      >
                        <span>{track.album.name + " "}</span>
                        <StyledReleaseDate>
                          {` (${track.album.release_date}) `}
                        </StyledReleaseDate>
                        <Icon variant="openInNew" size="0.8rem" />
                      </StyledExternalLink>
                    </td>
                  </tr>
                  <tr>
                    <th>Duration</th>
                    <td>{`${msToMin(track.duration_ms)} Min`}</td>
                  </tr>
                </tbody>
              </StyledTable>
              <BackLink infoPage>Back To Dashboard</BackLink>
            </StyledInfoContainer>
          )
        ) : (
          <SigninOrOut signingIn theme={theme} onSetTheme={onSetTheme} />
        )}
      </main>
    );
  }
}

const StyledExternalLink = styled.a`
  color: ${({ theme }) => theme.fontColor};
  @media (hover: hover) {
    &:hover * {
      color: ${({ theme }) => theme.hColor};
      fill: ${({ theme }) => theme.hColor};
    }
  }
`;

const StyledReleaseDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.hColor};
`;
