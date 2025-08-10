import { User } from "@/types/user.type";
import { create } from "zustand";

interface UserStoreState {
  user: User | null;
  isLoading?: boolean;
  setUser: (user: User) => void;
  setIsLoading?: (value: boolean) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (value) => set({ user: value }),
  setIsLoading: (value) => set({ isLoading: value }),
}));
