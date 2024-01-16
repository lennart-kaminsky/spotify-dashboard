import { useSession, signOut, signIn } from "next-auth/react";
import spotifyApi from "@/lib/spotify";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("status", status);
  if (status === "authenticated") {
    console.log("session", session);
  }

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
