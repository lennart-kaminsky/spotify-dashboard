import { create } from "zustand";

const useSpotifyStore = create((set) => ({
  topTracks: { long_term: [], medium_term: [], short_term: [] },
  topArtitst: { long_term: [], medium_term: [], short_term: [] },
  setTopTracks: (tracks) => set(() => ({ topTracks: tracks })),
  setTopArtists: (artists) => set(() => ({ topArtists: artists })),
}));

export default useSpotifyStore;
