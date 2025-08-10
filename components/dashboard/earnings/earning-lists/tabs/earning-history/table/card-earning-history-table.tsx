"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table-common/data-table";
import { Columns } from "./column";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardPartnerEarningServices from "@/services/dashboard/earningPartner.service";

const CardEarningHistoryTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const {
    data: dataEarningHistory,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["earning-history", currentPage],
    queryFn: () =>
      DashboardPartnerEarningServices.getEarningHistory({ page: currentPage }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // Data fresh selama 5 menit
    gcTime: 5 * 60 * 1000, // Cache disimpan 5 menit
  });

  const earnings = dataEarningHistory?.data.data ?? [];
  const {
    page = 1,
    limit = dataEarningHistory?.data.pagination?.total ?? 0,
    total = 0,
    totalPages,
  } = dataEarningHistory?.data.pagination || {};

  return (
    <DataTable
      title="Riwayat Pendapatan"
      data={earnings}
      columns={Columns}
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

export default CardEarningHistoryTable;
