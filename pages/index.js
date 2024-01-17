import { useSession } from "next-auth/react";
import CurrentTrack from "@/components/currentTrack";
import SigninOrOut from "@/components/signInOrOut";
import TopArtists from "@/components/topArtists";
import TopTracks from "@/components/topTracks";

export default function Home({ showUserInfo }) {
  const { data: session } = useSession();

  return (
    <main>
      {session ? (
        showUserInfo ? (
          <SigninOrOut />
        ) : (
          <>
            <TopArtists />
            <TopTracks />
            <CurrentTrack />
          </>
        )
      ) : (
        <SigninOrOut signingIn />
      )}
    </main>
  );
}
