import { LocationUser } from "@/types/location-user";
import { create } from "zustand";

interface LocationUserState {
  address: LocationUser | null;
  isLoading: boolean;
  setLocationUser: (location: LocationUser) => void;
  setIsLoading: (value: boolean) => void;
}

export const useLocationUserStore = create<LocationUserState>((set) => ({
  address: null,
  isLoading: false,
  setLocationUser: (value) => set({ address: value }),
  setIsLoading: (value) => set({ isLoading: value }),
}));
