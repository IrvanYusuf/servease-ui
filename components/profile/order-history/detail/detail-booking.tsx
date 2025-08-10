"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Download,
  Share2,
  ChevronRight,
  Home,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import BookingsServices from "@/services/booking.service";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import CardWarranty from "./warranty/card-warranty";
import CardCustomerTechnician from "./overview/card-customer-technician";
import CardPayment from "./overview/card-payment";
import CardQuickAction from "./card-quick-action";
import CardSupport from "./card-support";
import CardTimeline from "../../../timeline-common/card-timeline";
import { PATHS } from "@/lib/paths";
import SkeletonBadgeStatus from "./skeleton/skeleton-badge-status";
import SkeletonImageService from "./skeleton/skeleton-image-service";
import CardLocation from "./overview/card-location";
import SkeletonCardLocation from "./skeleton/skeleton-card-location";
import SkeletonCardCustomerTechnician from "./skeleton/skeleton-card-customer-technician";
import SkeletonCardPayment from "./skeleton/skeleton-card-payment";
import SkeletonCardQuickAction from "./skeleton/skeleton-card-quick-action";
import SkeletonCardTimeline from "./skeleton/skeleton-card-timeline";
import SkeletonCardWarranty from "./skeleton/skeleton-card-warranty";
import CardBookingTimeline from "@/components/dashboard/bookings/detail/tabs/card-booking-timeline";

const statusConfig = {
  pending: {
    label: "Menunggu Konfirmasi",
    color: "bg-yellow-100 text-yellow-800",
    icon: AlertCircle,
  },
  confirmed: {
    label: "Dikonfirmasi",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  in_progress: {
    label: "Sedang Berlangsung",
    color: "bg-purple-100 text-purple-800",
    icon: RefreshCw,
  },
  completed: {
    label: "Selesai",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Dibatalkan",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function DetailBooking({ bookingId }: { bookingId: string }) {
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleDownloadInvoice = () => {
    console.log("Download invoice");
  };

  const handleShareBooking = () => {
    console.log("Share booking");
  };

  const { data: dataDetailBooking, isLoading } = useQuery({
    queryKey: ["detail-booking", bookingId],
    queryFn: () => BookingsServices.getDetailBooking(bookingId),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link
          href={PATHS.profile.booking.root}
          className="flex items-center hover:text-blue-600"
        >
          <Home className="w-4 h-4 mr-1" />
          Riwayat Pesanan
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Detail Pesanan</span>
      </nav>

      {/* <pre>{JSON.stringify(dataDetailBooking, null, 2)}</pre> */}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Pesanan #{dataDetailBooking?.data._id || ""}
              </h3>
              <div className="flex items-start justify-between mb-4 mt-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {isLoading ? (
                      <SkeletonBadgeStatus />
                    ) : (
                      <>
                        <Badge
                          className={
                            statusConfig[dataDetailBooking!.data.status].color
                          }
                        >
                          {/* <StatusIcon className="w-4 h-4 mr-1" /> */}
                          {statusConfig[dataDetailBooking!.data.status].label}
                        </Badge>
                        <Badge className={`text-xs`} variant={"outline"}>
                          {dataDetailBooking!.data.payment_method_id.name}
                        </Badge>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600">
                    Dibuat pada{" "}
                    {formatDate({
                      date: new Date(
                        dataDetailBooking?.data.createdAt ?? new Date()
                      ),
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadInvoice}
                    className="cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Invoice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareBooking}
                    className="cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Bagikan
                  </Button>
                </div>
              </div>

              {/* Service Info */}
              <div className="flex items-start space-x-4">
                {isLoading ? (
                  <SkeletonImageService />
                ) : (
                  <>
                    <Image
                      src={
                        dataDetailBooking?.data.service_id.thumbnail ||
                        "/placeholder.png"
                      }
                      alt={dataDetailBooking?.data.service_id.name ?? ""}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <Badge className="mb-2 text-xs bg-blue-100 text-blue-800">
                        {dataDetailBooking!.data.service_id.category_id.name ??
                          ""}
                      </Badge>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {dataDetailBooking!.data.service_id.name ?? ""}
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="cursor-pointer">
                Ringkasan
              </TabsTrigger>
              <TabsTrigger value="timeline" className="cursor-pointer">
                Timeline
              </TabsTrigger>
              <TabsTrigger value="warranty" className="cursor-pointer">
                Garansi
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Schedule & Location */}
              <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                  <SkeletonCardLocation />
                ) : (
                  <CardLocation bookingData={dataDetailBooking!.data} />
                )}
              </div>

              {/* Customer & Technician Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {isLoading ? (
                  <SkeletonCardCustomerTechnician />
                ) : (
                  <CardCustomerTechnician
                    bookingData={dataDetailBooking!.data}
                  />
                )}
              </div>

              {/* Payment Info */}
              {isLoading ? (
                <SkeletonCardPayment />
              ) : (
                <CardPayment bookingData={dataDetailBooking!.data} />
              )}
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Pesanan</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <SkeletonCardTimeline />
                  ) : (
                    <CardBookingTimeline
                      bookingData={dataDetailBooking!.data}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Warranty Tab */}
            <TabsContent value="warranty">
              {isLoading ? (
                <SkeletonCardWarranty />
              ) : (
                <CardWarranty bookingData={dataDetailBooking!.data} />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Quick Actions */}
            {isLoading ? (
              <SkeletonCardQuickAction />
            ) : (
              <CardQuickAction
                bookingData={dataDetailBooking!.data}
                bookingId={bookingId}
              />
            )}

            {/* Support */}
            <CardSupport />
          </div>
        </div>
      </div>
    </div>
  );
}
