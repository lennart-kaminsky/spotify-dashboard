import { create } from "zustand";

const useScrollPositionStore = create((set) => ({
  artistsTopListPosition: 0,
  tracksTopListPosition: 0,
  recentTracksListPosition: 0,
  setArtistsTopListPosition: (position) =>
    set(() => ({ artistsTopListPosition: position })),
  setTracksTopListPosition: (position) =>
    set(() => ({ tracksTopListPosition: position })),
}));

export default useScrollPositionStore;
