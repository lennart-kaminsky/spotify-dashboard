import { create } from "zustand";

const useFilterStore = create((set) => ({
  artistTimeRange: "long_term",
  artistLimit: 20,
  trackTimeRange: "long_term",
  trackLimit: 20,
  showArtists: true,
  setArtistTimeRange: (range) => set(() => ({ artistTimeRange: range })),
  setArtistLimit: (limit) => set(() => ({ artistLimit: limit })),
  setTrackTimeRange: (range) => set(() => ({ trackTimeRange: range })),
  setTrackLimit: (limit) => set(() => ({ trackLimit: limit })),
  setShowArtists: (value) => set(() => ({ showArtists: value })),
}));

export default useFilterStore;
