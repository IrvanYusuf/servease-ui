import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Check, Eye } from "lucide-react";
import { statusConfig } from "@/lib/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";
import { PATHS } from "@/lib/paths";
import Link from "next/link";
import SkeletonCardRecentBooking from "./skeleton/skeleton-card-recent-booking";

const CardRecentOrders = () => {
  const { data: dataRecentBookings, isLoading } = useQuery({
    queryKey: ["bookings-recent"],
    queryFn: () =>
      DashboardPartnerBookingService.getAllPartnerBookings({
        status: "pending",
      }),
  });

  const { mutate: mutateConfirmBooking, isPending } = useMutation({
    mutationFn: ({
      bookingId,
      customerId,
    }: {
      customerId: string;
      bookingId: string;
    }) =>
      DashboardPartnerBookingService.confirmBooking({ bookingId, customerId }),
    onSuccess: (res) => {
      toast.success(`Berhasil confirm id #${res.data._id}`);
      queryClient.invalidateQueries({
        queryKey: ["bookings-recent"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-total-pending"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">
            Booking Terbaru
          </CardTitle>
          <Link href={`${PATHS.dashboard.bookings.root}?status=pending`}>
            <Button variant="ghost" size="sm" className="cursor-pointer">
              <Eye className="w-4 h-4 mr-2" />
              Lihat Semua
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonCardRecentBooking />
        ) : dataRecentBookings?.data.data.length === 0 ? (
          <Card className="col-span-3">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum ada pesanan terbaru
              </h3>
              <p className="text-gray-600 mb-4">
                Anda belum memiliki pesanan terbaru saat ini
              </p>
            </CardContent>
          </Card>
        ) : (
          dataRecentBookings?.data.data.map((order) => {
            const statusInfo =
              statusConfig[order.status as keyof typeof statusConfig];

            return (
              <Card
                key={order._id}
                className="p-4 rounded-xl h-full hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={order.user_id.profile_url || "/placeholder.png"}
                      alt={order.user_id.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                      {order.user_id.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900 truncate">
                        {order.user_id.name}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {order.service_id.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={`${statusInfo.color} text-xs`}>
                        {statusInfo.label}
                      </Badge>
                      <span className="text-sm font-semibold text-gray-900">
                        Rp {order.service_id.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(order.booking_date).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}{" "}
                        • {order.booking_time}
                      </div>
                      <div className="flex items-center">
                        {order.address_id.street_name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button
                    type="button"
                    className="flex-1 h-8 text-xs cursor-pointer"
                    onClick={() =>
                      mutateConfirmBooking({
                        bookingId: order._id,
                        customerId: order.user_id._id,
                      })
                    }
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Konfirmasi
                  </Button>
                  <Link href={PATHS.dashboard.bookings.detail(order._id)}>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-8 text-xs bg-transparent cursor-pointer"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Detail
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default CardRecentOrders;
