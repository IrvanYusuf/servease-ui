"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderStats from "./order-stats";
import CardBooking from "@/components/profile/order-history/card-booking";
import { useQuery } from "@tanstack/react-query";
import BookingsServices from "@/services/booking.service";
import CardBookingSkeleton from "@/components/profile/order-history/card-booking-skeleton";

import OrderHistoryPagination from "./order-history-pagination";
import EmptyData from "@/components/empty-data";

export default function OrderHistory() {
  const [selectedTab, setSelectedTab] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [pageMap, setPageMap] = useState<Record<string, number>>({
    "": 1, // semua
    pending: 1,
    confirmed: 1,
    cancelled: 1,
    completed: 1,
  });

  const { data: dataAllBookings, isLoading } = useQuery({
    queryKey: ["bookings", selectedTab, pageMap[selectedTab]],
    queryFn: () =>
      BookingsServices.getAllBookings({
        status: selectedTab,
        page: pageMap[selectedTab],
      }),
  });

  const totalPagesPagination =
    dataAllBookings?.data?.pagination?.totalPages || 1;

  const handlePageChange = (tab: string, page: number) => {
    setPageMap((prev) => ({
      ...prev,
      [tab]: page,
    }));
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Riwayat Pemesanan
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola dan lacak semua pesanan layanan Anda
          </p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48" aria-label="filter-booking">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest" aria-label="filter-booking">
              Terbaru
            </SelectItem>
            <SelectItem value="oldest" aria-label="filter-booking">
              Terlama
            </SelectItem>
            <SelectItem value="price_high" aria-label="filter-booking">
              Harga Tertinggi
            </SelectItem>
            <SelectItem value="price_low" aria-label="filter-booking">
              Harga Terendah
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Order Stats */}
      <OrderStats />

      {/* Order Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <div className="relative rounded-sm overflow-x-auto h-10 bg-muted">
          <TabsList className="absolute flex flex-row w-full min-w-max left-0 top-0 h-10 items-center">
            <div className="w-4 flex-shrink-0" aria-hidden />
            <TabsTrigger
              value=""
              className="h-8 px-4 w-full whitespace-nowrap flex-shrink-0"
            >
              Semua
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="h-8 px-4 w-full whitespace-nowrap flex-shrink-0"
            >
              Menunggu Konfirmasi
            </TabsTrigger>
            <TabsTrigger
              value="confirmed"
              className="h-8 px-4 w-full whitespace-nowrap flex-shrink-0"
            >
              Berlangsung
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="h-8 px-4 w-full whitespace-nowrap flex-shrink-0"
            >
              Dibatalkan
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="h-8 px-4 w-full whitespace-nowrap flex-shrink-0"
            >
              Selesai
            </TabsTrigger>
            <div className="w-4 flex-shrink-0" aria-hidden />
          </TabsList>
        </div>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          {isLoading ? (
            <CardBookingSkeleton />
          ) : dataAllBookings?.data.data.length === 0 ? (
            <EmptyData icon={Calendar} />
          ) : (
            dataAllBookings?.data.data.map((order) => (
              <CardBooking order={order} key={order._id} />
            ))
          )}
          {totalPagesPagination > 1 && (
            <OrderHistoryPagination
              handlePageChange={handlePageChange}
              pageMap={pageMap}
              selectedTab={selectedTab}
              totalPagesPagination={totalPagesPagination}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
