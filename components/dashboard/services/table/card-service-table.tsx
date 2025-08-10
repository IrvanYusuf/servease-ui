"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Columns } from "./column";
import { DataTable } from "@/components/table-common/data-table";
import DashboardPartnerServicesService from "@/services/dashboard/servicePartner.service";

const CardServiceTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);

  const search = searchParams.get("search") || "";

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const {
    data: dataServices,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard-services-list", currentPage, search],
    queryFn: () =>
      DashboardPartnerServicesService.getAllPartnerServices({
        page: currentPage,
        limit: 10,
        search,
      }),
    staleTime: 5 * 60 * 1000, // Data fresh selama 5 menit
    gcTime: 5 * 60 * 1000, // Cache disimpan 5 menit
  });

  const services = dataServices?.data.data ?? [];
  const {
    page = 1,
    limit = dataServices?.data.pagination?.total ?? 0,
    total = 0,
    totalPages,
  } = dataServices?.data.pagination || {};

  return (
    <DataTable
      title="Data Layanan"
      data={services}
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

export default CardServiceTable;
