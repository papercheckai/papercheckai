import { create } from "zustand";

interface LearnMoreDialogStore {
  isOpen: boolean;
  openLearnMore: () => void;
  closeLearnMore: () => void;
}

export const useLearnMoreDialog = create<LearnMoreDialogStore>((set) => ({
  isOpen: false,
  openLearnMore: () => set({ isOpen: true }),
  closeLearnMore: () => set({ isOpen: false }),
}));
