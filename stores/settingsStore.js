import { create } from "zustand";

const useSettingsStore = create((set) => ({
  showUserInfo: false,
  prevPage: "/",
  toggleShowUserInfo: () =>
    set((state) => ({ showUserInfo: !state.showUserInfo })),
  setPrevPage: (page) => set(() => ({ prevPage: page })),
}));

export default useSettingsStore;
