import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSpotify from "@/hooks/useSpotify";
import SigninOrOut from "@/components/signInOrOut";
import BackLink from "@/components/backLink";
import {
  StyledHeadlineContainer,
  StyledInfoContainer,
  StyledInfoImage,
  StyledOpenIcon,
  StyledTable,
} from "@/components/info.Styled";

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
            <StyledInfoContainer>
              <StyledInfoImage
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