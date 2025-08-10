"use client";

import CardRecentOrders from "./card-recent-orders";
import OverviewWelcome from "./overview-welcome";
import CardStatsSection from "./card-stats-section";
import CardPerformanceMetrics from "./card-performance-metrics";
import CardConfirmedOrders from "./card-confirmed-orders";

export default function DashboardInfo() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <OverviewWelcome />

      {/* Stats Cards */}
      <CardStatsSection />

      {/* Recent Orders */}
      <div className="grid lg:grid-cols-1 gap-8">
        {/* Recent Orders */}
        <CardRecentOrders />

        {/* Confirmed/ongoing jobs/bookings */}
        <CardConfirmedOrders />
      </div>

      {/* Performance Metrics */}
      <CardPerformanceMetrics />
    </div>
  );
}
