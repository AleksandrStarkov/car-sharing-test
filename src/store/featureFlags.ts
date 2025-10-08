import { create } from "zustand";
import { getFlags } from "../api/mock-api";

interface Flags {
  passengerRouteMap: boolean;
  driverRouteMapPreview: boolean;
}

interface FeatureFlagState {
  flags: Flags;
  isLoading: boolean;
  error: string | null;
  loadFlags: () => Promise<void>;
  enable: (key: keyof Flags) => void;
  disable: (key: keyof Flags) => void;
  isEnabled: (key: keyof Flags) => boolean;
}

export const useFeatureFlags = create<FeatureFlagState>((set, get) => ({
  flags: {
    passengerRouteMap: false,
    driverRouteMapPreview: false,
  },
  isLoading: false,
  error: null,

  loadFlags: async () => {
    set({ isLoading: true, error: null });
    try {
      const flags = await getFlags();
      set({ flags, isLoading: false });
    } catch (err) {
      set({ error: "Failed to load flags", isLoading: false });
    }
  },

  enable: (key) =>
    set((state) => ({
      flags: { ...state.flags, [key]: true },
    })),

  disable: (key) =>
    set((state) => ({
      flags: { ...state.flags, [key]: false },
    })),

  isEnabled: (key) => get().flags[key],
}));
