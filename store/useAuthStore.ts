import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/auth.type";

interface AuthState {
  token: string | null;
  decodedToken: DecodedToken | null;
  setToken: (token: string) => void;
  logout: () => void;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      decodedToken: null,
      setToken: (token) => {
        const decoded = jwtDecode<DecodedToken>(token);
        set({ token, decodedToken: decoded });
      },
      logout: () => {
        set({ token: null, decodedToken: null });
      },
      hasHydrated: false,
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "token", // key di localStorage
      partialize: (state) => ({ token: state.token }), // hanya simpan token
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        if (state?.token) {
          const decoded = jwtDecode<DecodedToken>(state.token);

          state.decodedToken = decoded;
        }
      },
    }
  )
);

export const getAuthToken = () => useAuthStore.getState().token;
