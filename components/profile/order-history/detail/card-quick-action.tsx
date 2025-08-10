"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PATHS } from "@/lib/paths";
import queryClient from "@/lib/queryClient";
import {
  createReviewPayload,
  createReviewSchema,
} from "@/schema/review.schema";
import ReviewsServices from "@/services/review.service";
import { Booking } from "@/types/booking.type";
import { mutationCreateReviewPayload } from "@/types/review.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import {
  Calendar,
  CreditCard,
  MessageCircle,
  RefreshCw,
  Star,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CardQuickActionProps {
  bookingData: Booking;
  bookingId: string;
}

const CardQuickAction: FC<CardQuickActionProps> = ({
  bookingData,
  bookingId,
}) => {
  const form = useForm<createReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
    register,
    setValue,
    formState: { isSubmitting },
  } = form;

  const rating = watch("rating");

  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookingId, payload }: mutationCreateReviewPayload) =>
      ReviewsServices.mutationCreateReview({ bookingId, payload }),
    onSuccess: (res, variables) => {
      toast.success("Review berhasil", {
        description: res.message,
      });
      queryClient.invalidateQueries({
        queryKey: [
          "detail-booking",
          variables.bookingId,
          "total-booking-reviewed",
          "total-booking-not-reviewed",
        ],
      });
      reset();
    },
    onError: (error) => {
      toast.error("Error", { description: error.message });
    },
  });

  const onSubmit = (data: createReviewPayload) => {
    console.log(data);
    const payload = {
      service_id: bookingData.service_id._id,
      owner_id: bookingData.service_id.user_id._id,
      partner_id: bookingData.partner_id._id,
      ...data,
    };
    mutate({ bookingId: bookingId, payload });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bookingData.status === "completed" &&
          bookingData.review_status === "not_reviewed" && (
            <Dialog
            //   open={isReviewDialogOpen}
            //   onOpenChange={setIsReviewDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full cursor-pointer">
                  <Star className="w-4 h-4 mr-2" />
                  Beri Ulasan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Beri Ulasan untuk Layanan</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={24}
                                className={`cursor-pointer transition-colors ${
                                  star <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-400"
                                }`}
                                onClick={() => setValue("rating", star)}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Bagikan pengalaman Anda..."
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-3 justify-end">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="cursor-pointer"
                          disabled={isPending}
                        >
                          Tutup
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="cursor-pointer"
                        disabled={isPending}
                      >
                        {isPending ? "Mengirim..." : "Kirim Ulasan"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}

        <Link
          href={`https://wa.me/${bookingData.service_id.user_id.phone}`}
          target="_blank"
          className="mb-3 block"
        >
          <Button
            variant="outline"
            className="w-full bg-transparent cursor-pointer"
            //   onClick={handleContactTechnician}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat Teknisi
          </Button>
        </Link>
        {bookingData.payment_status === "unpaid" ? (
          <Link href={PATHS.home.booking.payment(bookingData._id)}>
            <Button
              variant="outline"
              className="w-full bg-transparent cursor-pointer"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Bayar Sekarang
            </Button>
          </Link>
        ) : (
          <Link href={PATHS.home.service.detail(bookingData.service_id._id)}>
            <Button
              variant="outline"
              className="w-full bg-transparent cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Pesan Lagi
            </Button>
          </Link>
        )}

        {(bookingData.status === "pending" ||
          bookingData.status === "confirmed") && (
          <Button
            variant="outline"
            className="w-full mt-3 bg-transparent cursor-pointer"
            //   onClick={handleReschedule}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Reschedule
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardQuickAction;
