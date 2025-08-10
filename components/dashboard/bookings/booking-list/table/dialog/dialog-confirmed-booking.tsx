// DialogConfirmedBooking.tsx
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import queryClient from "@/lib/queryClient";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";
import { Booking } from "@/types/booking.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DialogConfirmedBooking = ({
  children,
  bookingData,
}: {
  children: React.ReactNode;
  bookingData: Booking;
}) => {
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
        queryKey: ["dashboard-partner-booking"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-total-pending"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-booking-confirmed"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Booking</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin mengonfirmasi booking ini? Setelah
            dikonfirmasi, pengguna akan diberi tahu bahwa layanan telah
            dijadwalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            disabled={isPending}
            onClick={() =>
              mutateConfirmBooking({
                bookingId: bookingData._id,
                customerId: bookingData.user_id._id,
              })
            }
          >
            {isPending ? "Memproses..." : "Ya, Konfirmasi"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogConfirmedBooking;
