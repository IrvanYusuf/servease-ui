"use client";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Wallet,
  CreditCard,
  Calendar,
  Download,
} from "lucide-react";
import CardStats from "@/components/dashboard/card-stats/card-stats";

import CardEarningHistoryTable from "./tabs/earning-history/table/card-earning-history-table";
import { useQuery } from "@tanstack/react-query";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";
import ModalWithdraw from "./modal/modal-withdraw";
import DashboardPartnerEarningServices from "@/services/dashboard/earningPartner.service";
import CardWithdrawHistoryTable from "./tabs/earning-withdraw/table/card-withdraw-history-table";

export default function DashboardEarningLists() {
  // mengambil total earning dari store zustand
  const { data: totalBalance } = useQuery({
    queryKey: ["total-balance"],
    queryFn: DashboardPartnerEarningServices.getUserBalance,
  });

  const { data: totalEarningsMonthly } = useQuery({
    queryKey: ["earning-monthly"],
    queryFn: DashboardPartnerBookingService.getTotalMonthlyRevenue,
  });

  const { data: totalRevenuePending } = useQuery({
    queryKey: ["total-revenue-pending"],
    queryFn: DashboardPartnerBookingService.getTotalRevenuePending,
  });

  const { data: totalMonthlyWithdraw } = useQuery({
    queryKey: ["total-monthly-withdraw"],
    queryFn: DashboardPartnerEarningServices.getTotalMonthlyWithdraw,
  });

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStats
          title="Saldo Tersedia"
          icon={Wallet}
          colorPrimary="green"
          value={totalBalance?.data ?? 0}
          subtitle="Siap untuk ditarik"
        />
        <CardStats
          title="Total Pendapatan"
          icon={DollarSign}
          colorPrimary="green"
          value={totalEarningsMonthly?.data ?? 0}
          subtitle="Pendapatan satu bulan terakhir"
        />
        <CardStats
          title="Pending"
          icon={Calendar}
          colorPrimary="yellow"
          value={totalRevenuePending?.data ?? 0}
          subtitle="Menunggu pembayaran"
        />
        <CardStats
          title="Total Ditarik"
          icon={CreditCard}
          colorPrimary="blue"
          value={totalMonthlyWithdraw?.data ?? 0}
          subtitle="Penarikan satu bulan terakhir"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex w-full justify-end gap-4">
        <ModalWithdraw totalEarnings={totalBalance?.data ?? 0} />

        <Button variant="outline" className="cursor-pointer">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Tabs for Earnings and Withdrawal History */}
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="earnings" className="cursor-pointer">
            Riwayat Pendapatan
          </TabsTrigger>
          <TabsTrigger value="withdrawals" className="cursor-pointer">
            Riwayat Penarikan
          </TabsTrigger>
        </TabsList>

        {/* Tab content for earning (pendapatan) */}
        <TabsContent value="earnings" className="space-y-4">
          <CardEarningHistoryTable />
        </TabsContent>

        {/* Tab content for withdraw (penarikan) */}
        <TabsContent value="withdrawals" className="space-y-4">
          <CardWithdrawHistoryTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
