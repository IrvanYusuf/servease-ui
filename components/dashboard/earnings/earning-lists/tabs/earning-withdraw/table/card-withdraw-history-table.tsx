"use client";
import DashboardPartnerEarningServices from "@/services/dashboard/earningPartner.service";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table-common/data-table";
import { Columns } from "./column";
import { useRouter, useSearchParams } from "next/navigation";

const CardWithdrawHistoryTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const {
    data: dataWithdrawHistory,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["withdraw-history", currentPage],
    queryFn: () =>
      DashboardPartnerEarningServices.getWithdrawHistory({ page: currentPage }),
    staleTime: 5 * 60 * 1000, // Data fresh selama 5 menit
    gcTime: 5 * 60 * 1000, // Cache disimpan 5 menit
  });

  const withdraws = dataWithdrawHistory?.data.data ?? [];
  const {
    page = 1,
    limit = dataWithdrawHistory?.data.pagination?.total ?? 0,
    total = 0,
    totalPages,
  } = dataWithdrawHistory?.data.pagination || {};

  return (
    <DataTable
      title="Riwayat Penarikan"
      data={withdraws}
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

export default CardWithdrawHistoryTable;
