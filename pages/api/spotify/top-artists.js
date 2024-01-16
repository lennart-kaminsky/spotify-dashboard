// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";

import spotifyApi from "@/lib/spotify";

export default async function hanlder(request, response) {
  //   const session = await getServerSession(request, response, authOptions);

  //   if (session) {
  if (request.method === "GET") {
    try {
      const topArtists = await spotifyApi.getMyTopArtists();
      return response.status(200).json(topArtists);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  //   }
  //   else {
  //     response.status(401).json({ message: "User not signed in" });
  //   }
}
