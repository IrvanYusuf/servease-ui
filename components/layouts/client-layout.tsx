"use client";

import { ReactNode, useEffect } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useQuery } from "@tanstack/react-query";
import BookingsServices from "@/services/booking.service";
import { useBookingStatsStore } from "@/store/useBookingStatsStore";
import LocationUserServices from "@/services/locationUser.service";
import { useLocationUserStore } from "@/store/useLocationUserStore";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const setTotalNotReviewed = useBookingStatsStore(
    (state) => state.setTotalNotReviewed
  );
  const setLocationUser = useLocationUserStore(
    (state) => state.setLocationUser
  );
  const setIsLoadingLocationUser = useLocationUserStore(
    (state) => state.setIsLoading
  );

  const {
    data: totalBookingsNotReviewed,
    isLoading: isLoadingTotalBookingNotReviewed,
  } = useQuery({
    queryKey: ["total-booking-not-reviewed"],
    queryFn: BookingsServices.getTotalBookingNotReviewed,
  });

  const { data: dataLocationUser, isLoading: isLoadingDataLocationUser } =
    useQuery({
      queryKey: ["location-user"],
      queryFn: LocationUserServices.fetchProvinceFromCoords,
      enabled: typeof window !== "undefined",
      retry: false,
    });

  useEffect(() => {
    if (totalBookingsNotReviewed?.data !== undefined) {
      setTotalNotReviewed(totalBookingsNotReviewed.data);
    }
  }, [totalBookingsNotReviewed, setTotalNotReviewed]);

  useEffect(() => {
    if (dataLocationUser !== undefined) {
      setLocationUser(dataLocationUser);
      setIsLoadingLocationUser(isLoadingDataLocationUser);
    }
  }, [
    dataLocationUser,
    setLocationUser,
    isLoadingDataLocationUser,
    setIsLoadingLocationUser,
  ]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
