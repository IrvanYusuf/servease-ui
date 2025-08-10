"use client";

import { Clock, RefreshCcw, Wallet, X } from "lucide-react";
import CardStats from "@/components/dashboard/card-stats/card-stats";
import { useDashboardBookingStats } from "@/store/dashboard/useDashboardBookingStats";
import { useQuery } from "@tanstack/react-query";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";

const CardBookingListStats = () => {
  const dashboardTotalBookingPending = useDashboardBookingStats(
    (state) => state.totalBookingPending
  );
  const totalBookingRevenue = useDashboardBookingStats(
    (state) => state.totalAllRevenue
  );

  const dataBookingConfirmed = useDashboardBookingStats(
    (state) => state.totalBookingConfirmed
  );

  const { data: dataBookingCancelled } = useQuery({
    queryKey: ["dashboard-booking-cancelled"],
    queryFn: DashboardPartnerBookingService.getTotalCancelledBooking,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardStats
        title="Total Pendapatan"
        value={totalBookingRevenue ?? 0}
        colorPrimary="green"
        icon={Wallet}
      />
      <CardStats
        title="Booking Pending"
        colorPrimary="yellow"
        icon={Clock}
        value={dashboardTotalBookingPending ?? 0}
        isCurrency={false}
      />
      <CardStats
        title="Booking Berlangsung"
        colorPrimary="purple"
        icon={RefreshCcw}
        value={dataBookingConfirmed ?? 0}
        isCurrency={false}
      />
      <CardStats
        title="Booking Dibatalkan"
        colorPrimary="red"
        icon={X}
        value={dataBookingCancelled?.data ?? 0}
        isCurrency={false}
      />
    </div>
  );
};

export default CardBookingListStats;
