import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
];

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export async function getTopArtists() {
  const topArtists = await spotifyApi.getMyTopArtists();
  console.log(topArtists);
}

export async function getSavedTracks() {
  try {
    const response = await spotifyApi.getMySavedTracks({
      limit: 10, // Adjust the limit as needed
    });
    const tracks = response.body.items.map((item) => item.track);
    return tracks;
  } catch (error) {
    console.error("Error fetching saved tracks:", error.message);
    return [];
  }
}

// export default spotifyApi;
