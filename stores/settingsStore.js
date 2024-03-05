import { create } from "zustand";

const useSettingsStore = create((set) => ({
  showUserInfo: false,
  toggleShowUserInfo: () =>
    set((state) => ({ showUserInfo: !state.showUserInfo })),
}));

export default useSettingsStore;
