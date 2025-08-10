"use client";

import { MessageSquare, Reply, Clock } from "lucide-react";
import CardStats from "@/components/dashboard/card-stats/card-stats";
import CardFilter from "./filter/card-filter";
import CardReviewTable from "./table/card-review-table";
import { useQuery } from "@tanstack/react-query";
import DashboardPartnerReviewService from "@/services/dashboard/reviewPartner.service";

export default function DashboardReviewLists() {
  const { data: totalNotReviewedPartner } = useQuery({
    queryKey: ["total-not-reviewed-partner"],
    queryFn: DashboardPartnerReviewService.getTotalNotReviewedPartner,
  });

  const { data: totalAllReviewPartner } = useQuery({
    queryKey: ["total-all-review-partner"],
    queryFn: DashboardPartnerReviewService.getTotalAllReviewPartner,
  });
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CardStats
          title="Total All Reviews"
          colorPrimary="green"
          icon={MessageSquare}
          value={totalAllReviewPartner?.data ?? 0}
          isCurrency={false}
        />
        <CardStats
          title="Response Rate"
          colorPrimary="purple"
          icon={Reply}
          value={"87%"}
          isCurrency={false}
        />
        <CardStats
          title="Pending Reviews"
          colorPrimary="yellow"
          icon={Clock}
          value={totalNotReviewedPartner?.data ?? 0}
          isCurrency={false}
        />
      </div>

      {/* Reviews Table */}
      {/* filter */}
      <CardFilter />

      {/* datatables */}
      <CardReviewTable />
    </div>
  );
}
