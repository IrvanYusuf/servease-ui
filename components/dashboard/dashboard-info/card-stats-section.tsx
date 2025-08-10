"use client";

import { Calendar, CheckCircle, Star, Wallet } from "lucide-react";
import CardStats from "@/components/dashboard/card-stats/card-stats";
import { useQuery } from "@tanstack/react-query";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";
import { useDashboardBookingStats } from "@/store/dashboard/useDashboardBookingStats";

const CardStatsSection = () => {
  const dashbordTotalBookingCompleted = useDashboardBookingStats(
    (state) => state.totalBookingCompleted
  );
  const dashboardTotalRevenue = useDashboardBookingStats(
    (state) => state.totalAllRevenue
  );

  const { data: totalBooking, isLoading: isLoadingTotalBooking } = useQuery({
    queryKey: ["total-bookings"],
    queryFn: () =>
      DashboardPartnerBookingService.getTotalBooking({
        range_date: "all",
      }),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <CardStats
        title="Total Pendapatan Keseluruhan"
        value={dashboardTotalRevenue ?? 0}
        colorPrimary="green"
        icon={Wallet}
      />
      <CardStats
        title="Total Booking Keseluruhan"
        value={totalBooking?.data ?? 0}
        colorPrimary="blue"
        icon={Calendar}
        isCurrency={false}
      />
      <CardStats
        title="Total Pesanan Selesai Keseluruhan"
        value={dashbordTotalBookingCompleted ?? 0}
        colorPrimary="purple"
        icon={CheckCircle}
        isCurrency={false}
      />
      <CardStats
        title="Rating Rata-rata"
        value={4.8}
        colorPrimary="yellow"
        icon={Star}
        isCurrency={false}
      />
    </div>
  );
};

export default CardStatsSection;
