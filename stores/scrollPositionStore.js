import { create } from "zustand";

const useScrollPositionStore = create((set) => ({
  artistsTopListPosition: 0,
  tracksTopListPosition: { long_term: 0, medium_term: 0, short_term: 0 },
  recentTracksListPosition: 0,
  setArtistsTopListPosition: (position) =>
    set(() => ({ artistsTopListPosition: position })),
  setTracksTopListPosition: (position, range) =>
    set((state) => ({
      tracksTopListPosition: {
        ...state.tracksTopListPosition,
        [range]: position,
      },
    })),
}));

export default useScrollPositionStore;
