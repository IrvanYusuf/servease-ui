// components/earning/FinancialDetailModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { statusConfig, statusPaymentConfig } from "@/lib/config";
import { formatDate, formatPaymentMethod } from "@/lib/utils";
import BookingsServices from "@/services/booking.service";
import { Earning } from "@/types/dashboard/earning-dashboard.type";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { ReactNode, useState } from "react";

interface ModalEarningHistoryDetailProps {
  data: Earning;
  children: ReactNode;
}

export function ModalEarningHistoryDetail({
  data,
  children,
}: ModalEarningHistoryDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  const statusBooking = statusConfig[data.status];
  const StatusBookingIcon = statusConfig[data.status].icon;

  const { data: dataDetailBooking, isLoading } = useQuery({
    queryKey: ["dashboard-earning-history-detail", data._id],
    queryFn: () => BookingsServices.getDetailBooking(data._id),
  });

  const statusPayment =
    statusPaymentConfig[dataDetailBooking?.data.payment_status ?? "paid"];
  const StatusPaymentIcon =
    statusPaymentConfig[dataDetailBooking?.data.payment_status ?? "paid"].icon;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Rincian Keuangan</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Harga Layanan</span>
              <span className="text-sm font-medium">
                Rp
                {dataDetailBooking?.data.service_id.price.toLocaleString(
                  "id"
                ) ?? 0}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-medium">Total Pembayaran</span>
              <span className="font-bold">
                Rp
                {dataDetailBooking?.data.total_price.toLocaleString("id") ?? 0}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <h4 className="font-medium text-blue-900">Potongan Platform</h4>
            <div className="flex justify-between">
              <span className="text-sm text-blue-800">Biaya Aplikasi</span>
              <span className="text-sm font-medium text-red-600">
                -Rp{dataDetailBooking?.data.app_cost.toLocaleString("id") ?? 0}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-medium text-blue-900">
                Pendapatan Bersih
              </span>
              <span className="font-bold text-green-600">
                Rp
                {(
                  (dataDetailBooking?.data.total_price ?? 0) -
                  (dataDetailBooking?.data.app_cost ?? 0)
                ).toLocaleString("id")}
              </span>
            </div>
          </div>

          <div className={`${statusPayment.color} p-4 rounded-lg`}>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Status Pembayaran</h4>
                <p className="text-sm">
                  Dibayar pada
                  <span className="ml-1">
                    {formatDate({
                      date: new Date(
                        dataDetailBooking?.data.timelinetracker?.tracker
                          .payment_at ?? new Date()
                      ),
                    })}
                  </span>
                </p>
              </div>
              <StatusPaymentIcon />
            </div>
            <div className="mt-2 text-sm">
              <p>Metode: {formatPaymentMethod(data.payment_method_id.type)}</p>
            </div>
          </div>
          <div className={`${statusBooking.color} p-4 rounded-lg`}>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">
                  Status Booking {statusBooking.label}
                </h4>
                <p className="text-sm">
                  Melakukan booking pada
                  <span className="ml-1">
                    {formatDate({
                      date: new Date(
                        dataDetailBooking?.data.createdAt ?? new Date()
                      ),
                    })}
                  </span>
                </p>
              </div>
              <StatusBookingIcon
                className={data.status === "confirmed" ? "animate-spin" : ""}
              />
            </div>
          </div>
        </div>
        {/* Close Button */}
        <div className="flex justify-end pt-4">
          <Button
            className="cursor-pointer"
            variant="outline"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
