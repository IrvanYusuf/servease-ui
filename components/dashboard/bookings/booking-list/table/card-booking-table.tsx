"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Columns } from "./column";
import { DataTable } from "@/components/table-common/data-table";
import { RowSelectionState } from "@tanstack/react-table";

const CardBookingTable = () => {
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const paymentStatus = searchParams.get("payment_status") || "";
  const dateFrom = searchParams.get("from") || "";
  const dateTo = searchParams.get("to") || "";

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const {
    data: dataDashboardBookings,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "dashboard-partner-booking",
      currentPage,
      status,
      paymentStatus,
      dateFrom,
      dateTo,
      search,
    ],
    queryFn: () =>
      DashboardPartnerBookingService.getAllPartnerBookings({
        page: currentPage,
        status,
        limit: 10,
        payment_status: paymentStatus,
        date_from: dateFrom,
        date_to: dateTo,
        search,
      }),
  });

  const bookings = dataDashboardBookings?.data.data ?? [];
  const {
    page = 1,
    limit = dataDashboardBookings?.data.pagination?.total ?? 0,
    total = 0,
    totalPages,
  } = dataDashboardBookings?.data.pagination || {};

  return (
    <DataTable
      title="Booking Data"
      data={bookings}
      columns={Columns}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      onPageChange={handlePageChange}
      currentPage={currentPage}
      page={page}
      limit={limit}
      total={total}
      totalPages={totalPages ?? 1}
      columnsLength={Columns.length}
      isLoading={isLoading || isFetching}
    />
  );
};

export default CardBookingTable;
