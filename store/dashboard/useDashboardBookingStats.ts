import { create } from "zustand";

interface DashboardBookingStats {
  totalBookingPending: number | null;
  totalBookingCompleted: number | null;
  totalBookingConfirmed: number | null;
  totalAllRevenue: number | null;
  setTotalBookingPending: (value: number) => void;
  setTotalBookingCompleted: (value: number) => void;
  setTotalBookingConfirmed: (value: number) => void;
  setTotalAllRevenue: (value: number) => void;
}

export const useDashboardBookingStats = create<DashboardBookingStats>(
  (set) => ({
    totalBookingPending: null,
    totalBookingCompleted: null,
    totalBookingConfirmed: null,
    totalAllRevenue: null,
    setTotalBookingPending: (value: number) =>
      set({ totalBookingPending: value }),
    setTotalBookingCompleted: (value: number) =>
      set({ totalBookingCompleted: value }),
    setTotalBookingConfirmed: (value: number) =>
      set({ totalBookingConfirmed: value }),
    setTotalAllRevenue: (value: number) => set({ totalAllRevenue: value }),
  })
);
