"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Columns } from "./column";
import { DataTable } from "@/components/table-common/data-table";
import { RowSelectionState } from "@tanstack/react-table";
import DashboardPartnerReviewService from "@/services/dashboard/reviewPartner.service";

const CardReviewTable = () => {
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("review_status") || "";
  const rating = searchParams.get("rating") || "";
  const dateFrom = searchParams.get("from") || "";
  const dateTo = searchParams.get("to") || "";

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const {
    data: dataDashboardReviews,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "dashboard-partner-review",
      currentPage,
      search,
      status,
      rating,
      dateFrom,
      dateTo,
    ],
    queryFn: () =>
      DashboardPartnerReviewService.getAllPartnerReviews({
        page: currentPage,
        status,
        limit: 10,
        search,
        rating,
        date_from: dateFrom,
        date_to: dateTo,
      }),
  });

  const reviews = dataDashboardReviews?.data.data ?? [];
  const {
    page = 1,
    limit = dataDashboardReviews?.data.pagination?.total ?? 0,
    total = 0,
    totalPages,
  } = dataDashboardReviews?.data.pagination || {};

  console.log(dataDashboardReviews);

  return (
    <DataTable
      title="Booking Data"
      data={reviews}
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

export default CardReviewTable;
