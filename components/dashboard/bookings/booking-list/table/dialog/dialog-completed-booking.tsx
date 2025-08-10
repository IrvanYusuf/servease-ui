// DialogCompletedBooking.tsx
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
import BookingsServices from "@/services/booking.service";
import { Booking } from "@/types/booking.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DialogCompletedBooking = ({
  children,
  bookingData,
}: {
  children: React.ReactNode;
  bookingData: Booking;
}) => {
  const { mutate: mutateCompletedBooking, isPending } = useMutation({
    mutationFn: BookingsServices.completeBooking,
    onSuccess: (res) => {
      toast.success(`Berhasil selesaikan id #${res.data._id}`);
      queryClient.invalidateQueries({
        queryKey: ["dashboard-partner-booking"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-booking-confirmed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-completed-bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-revenue"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah Anda yakin ingin menyelesaikan booking ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini akan menandai booking sebagai selesai dan tidak dapat
            dibatalkan. Pastikan semua layanan telah diselesaikan dengan benar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isPending}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            disabled={isPending}
            onClick={() =>
              mutateCompletedBooking({
                bookingId: bookingData._id,
                paymentStatus: "paid",
              })
            }
          >
            {isPending ? "Memproses..." : " Ya, Selesaikan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogCompletedBooking;
