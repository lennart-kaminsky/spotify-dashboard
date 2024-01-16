import useSpotify from "@/hooks/useSpotify";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const mySpotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  // useEffect(() => {
  //   if (mySpotifyApi.getAccessToken()) {
  //     mySpotifyApi.getMyTopArtists({ time_range: "long_term" }).then(
  //       function (data) {
  //         setTopArtists(data.body.items);
  //       },
  //       function (err) {
  //         console.log("Something went wrong!", err);
  //       }
  //     );
  //   }
  // }, [session, mySpotifyApi]);

  useEffect(() => {
    async function getTopArtistsTracks() {
      try {
        if (mySpotifyApi.getAccessToken()) {
          const topArtists = await mySpotifyApi.getMyTopArtists({
            time_range: "long_term",
          });
          setTopArtists(topArtists.body.items);
          const topTracks = await mySpotifyApi.getMyTopTracks({
            time_range: "long_term",
          });
          setTopTracks(topTracks.body.items);
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    getTopArtistsTracks();
  }, [session, mySpotifyApi]);

  return (
    <main>
      <h1>Spotify Dashboard</h1>
      {session ? (
        <>
          <p>Hi {session.user.name}</p>{" "}
          <button onClick={() => signOut()}>Sign Out</button>
          <h2>My Top Artists</h2>
          <ol>
            {topArtists.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ol>
          <h2>My Top Tracks</h2>
          <ol>
            {topTracks.map((tracks) => (
              <li key={tracks.id}>{tracks.name}</li>
            ))}
          </ol>
        </>
      ) : (
        <>
          <p>Please Log in</p>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </main>
  );
}
