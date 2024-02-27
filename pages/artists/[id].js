import BackLink from "@/components/backLink";
import Icon from "@/components/icons";
import SigninOrOut from "@/components/signInOrOut";
import useSpotify from "@/hooks/useSpotify";
import { devices } from "@/styles/devices";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Artist({ showUserInfo, theme, onSetTheme }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const mySpotifyApi = useSpotify();

  const [artist, setArtist] = useState({});
  const [artistLoaded, setArtistLoaded] = useState(false);

  useEffect(() => {
    async function getArtist() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const _artist = await mySpotifyApi.getArtist(id);
          setArtist(_artist.body);
          setArtistLoaded(true);
        }
      } catch (error) {
        console.log("Something went wront!", error);
      }
    }
    getArtist();
  }, [isReady, session, mySpotifyApi, id, router, artistLoaded]);

  if (isReady && artistLoaded) {
    return (
      <main>
        {session ? (
          showUserInfo ? (
            <SigninOrOut theme={theme} onSetTheme={onSetTheme} />
          ) : (
            <StyledArtistContainer>
              <StyledArtistImage
                src={artist.images[0].url}
                alt={`Picture of ${artist.name}`}
                width={300}
                height={300}
              />

              <StyledHeadlineContainer
                href={artist.external_urls.spotify}
                target="_blank"
              >
                <h2>{artist.name}</h2>
                <StyledOpenIcon variant="openInNew" size="1rem" />
              </StyledHeadlineContainer>

              <StyledTable>
                <tbody>
                  <tr>
                    <th>Follower</th>
                    <td>{artist.followers.total}</td>
                  </tr>
                  <tr>
                    <th>Popularity</th>
                    <td>{artist.popularity}</td>
                  </tr>
                  <tr>
                    <th>Genres</th>
                    <td>
                      <ul>
                        {artist.genres.map((genre) => (
                          <li key={genre}>{genre}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
              <BackLink artistpage>Back To Dashboard</BackLink>
            </StyledArtistContainer>
          )
        ) : (
          <SigninOrOut signingIn theme={theme} onSetTheme={onSetTheme} />
        )}
      </main>
    );
  }
}

const StyledArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-block-start: 2rem;
`;

const StyledArtistImage = styled(Image)`
  border-radius: 100%;
  width: 150px;
  height: 150px;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    width: 300px;
    height: 300px;
  }
`;

const StyledHeadlineContainer = styled.a`
  position: relative;
  @media (hover: hover) {
    &:hover * {
      color: ${({ theme }) => theme.hColor};
      fill: ${({ theme }) => theme.hColor};
    }
  }
`;

const StyledOpenIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: -1.5rem;
`;

const StyledTable = styled.table`
  table-layout: fixed;
  th {
    font-family: var(--fontBold);
    color: ${({ theme }) => theme.accentColor};
    text-align: start;
    vertical-align: top;
  }
  td {
    padding-inline: 1rem;
    padding-block: 0 1rem;
  }
  ul {
    all: unset;
    max-width: 400px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  li {
    padding-inline: 0.2rem;
  }
`;
