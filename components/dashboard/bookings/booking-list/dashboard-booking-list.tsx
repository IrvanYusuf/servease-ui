"use client";

import CardFilter from "./filter/card-filter";
import CardBookingTable from "./table/card-booking-table";
import CardBookingListStats from "./stats/card-stats";

export function DashboardBookingList() {
  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <CardBookingListStats />

      {/* Filters */}
      <CardFilter />

      {/* Data Table */}
      <CardBookingTable />
    </div>
  );
}
