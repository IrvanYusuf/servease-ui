"use client";

import { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PATHS } from "@/lib/paths";
import CardBookingDetailStatus from "./card-booking-detail-status";
import BookingDetailQuickAction from "./booking-detail-quick-action";
import CardBookingSummary from "./tabs/card-booking-summary";
import BookingDetailHeader from "./booking-detail-header";
import CardBookingCustomer from "./tabs/card-booking-customer";
import CardBookingPayment from "./tabs/card-booking-payment";
import CardBookingTimeline from "./tabs/card-booking-timeline";
import { useQuery } from "@tanstack/react-query";
import BookingsServices from "@/services/booking.service";
import SkeletonBookingDetailHeader from "./skeleton/skeleton-booking-detail-header";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonBookingCustomerTab from "./skeleton/skeleton-booking-customer-tab";
import SkeletonCardTimeline from "@/components/profile/order-history/detail/skeleton/skeleton-card-timeline";
import SkeletonBookingPaymentTab from "./skeleton/skeleton-booking-payment-tab";

export default function BookingDetailContent({
  bookingId,
}: {
  bookingId: string;
}) {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { data: dataDetailBooking, isLoading } = useQuery({
    queryKey: ["dashboard-booking-detail", bookingId],
    queryFn: () => BookingsServices.getDetailBooking(bookingId),
  });

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  <Link href={PATHS.dashboard.root}>Beranda</Link>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={PATHS.dashboard.bookings.root}>List Bookings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 font-medium">
                Detail Booking
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Header */}
        {isLoading ? (
          <SkeletonBookingDetailHeader />
        ) : (
          <BookingDetailHeader bookingData={dataDetailBooking!.data} />
        )}

        {/* Status Banner */}
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <CardBookingDetailStatus bookingData={dataDetailBooking!.data} />
        )}

        {/* Quick Actions */}
        <BookingDetailQuickAction />

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="cursor-pointer">
              Overview
            </TabsTrigger>
            <TabsTrigger value="customer" className="cursor-pointer">
              Customer
            </TabsTrigger>
            <TabsTrigger value="payment" className="cursor-pointer">
              Payment
            </TabsTrigger>
            <TabsTrigger value="timeline" className="cursor-pointer">
              Timeline
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Booking Summary */}
            {isLoading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <CardBookingSummary bookingData={dataDetailBooking!.data} />
            )}
          </TabsContent>

          {/* Customer Tab */}
          <TabsContent value="customer" className="space-y-6">
            {isLoading ? (
              <SkeletonBookingCustomerTab />
            ) : (
              <CardBookingCustomer bookingData={dataDetailBooking!.data} />
            )}
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            {isLoading ? (
              <SkeletonBookingPaymentTab />
            ) : (
              <CardBookingPayment bookingData={dataDetailBooking!.data} />
            )}
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            {isLoading ? (
              <SkeletonCardTimeline />
            ) : (
              <CardBookingTimeline bookingData={dataDetailBooking!.data} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
