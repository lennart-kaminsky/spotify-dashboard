import { create } from "zustand";

const useScrollPositionStore = create((set) => ({
  artistsTopListPosition: { long_term: 0, medium_term: 0, short_term: 0 },
  tracksTopListPosition: { long_term: 0, medium_term: 0, short_term: 0 },
  setArtistsTopListPosition: (position, range) =>
    set((state) => ({
      artistsTopListPosition: {
        ...state.artistsTopListPosition,
        [range]: position,
      },
    })),
  setTracksTopListPosition: (position, range) =>
    set((state) => ({
      tracksTopListPosition: {
        ...state.tracksTopListPosition,
        [range]: position,
      },
    })),
}));

export default useScrollPositionStore;
