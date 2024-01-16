import { useSession, signOut, signIn } from "next-auth/react";
import useSWR from "swr";
import { getTopArtists, getSavedTracks } from "@/lib/spotify";

export default function Home() {
  const { data: session } = useSession();

  const { data: topArtists, isLoading: isLoadingTopArtists } = useSWR(
    "/api/spotify/top-artists"
  );
  if (isLoadingTopArtists) return;
  getTopArtists();
  // getSavedTracks();
  console.log(session);
  return (
    <main>
      <h1>Spotify Dashboard</h1>
      {session ? (
        <>
          <p>Hi {session.user.name}</p>{" "}
          <button onClick={() => signOut()}>Sign Out</button>
          <h2>My Top Artists</h2>
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
