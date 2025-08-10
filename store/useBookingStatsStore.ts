import { create } from "zustand";

interface BookingStatsState {
  totalBooking: number;
  totalBookingCompleted: number;
  totalNotReviewed: number;
  totalReviewed: number;
  setTotalBooking: (value: number) => void;
  setTotalBookingCompleted: (value: number) => void;
  setTotalNotReviewed: (value: number) => void;
  setTotalReviewed: (value: number) => void;
}

export const useBookingStatsStore = create<BookingStatsState>((set) => ({
  totalBooking: 0,
  totalBookingCompleted: 0,
  totalNotReviewed: 0,
  totalReviewed: 0,
  setTotalBooking: (value) => set({ totalBooking: value }),
  setTotalBookingCompleted: (value) => set({ totalBookingCompleted: value }),
  setTotalNotReviewed: (value) => set({ totalNotReviewed: value }),
  setTotalReviewed: (value) => set({ totalReviewed: value }),
}));

export const getTotalNotReviewed = () =>
  useBookingStatsStore.getState().totalNotReviewed;
