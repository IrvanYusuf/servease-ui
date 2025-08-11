import { Button } from "@/components/ui/button";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
import { Star } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

interface ModalCreateReviewProps {
  booking: Booking;
}

const ModalCreateReview: FC<ModalCreateReviewProps> = ({ booking }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: createNewReview, isPending } = useMutation({
    mutationFn: ({ bookingId, payload }: mutationCreateReviewPayload) =>
      ReviewsServices.mutationCreateReview({ bookingId, payload }),
    onSuccess: (res) => {
      toast.success("Berhasil buat review");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["bookings-not-reviewed"] });
      queryClient.invalidateQueries({
        queryKey: ["total-booking-not-reviewed"],
      });
      queryClient.invalidateQueries({ queryKey: ["total-booking-reviewed"] });

      form.reset();
      setSelectedRating(0);
      setHoverRating(0);
      setIsOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const form = useForm<createReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue("rating", rating);
  };

  const onSubmit = (data: createReviewPayload) => {
    console.log(data);
    const payload = {
      service_id: booking.service_id._id,
      owner_id: booking.service_id.user_id._id,
      partner_id: booking.partner_id._id,
      ...data,
    };
    createNewReview({ bookingId: booking._id, payload });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer w-full md:w-auto"
          onClick={() => setIsOpen(true)}
        >
          <Star className="w-4 h-4 mr-2" />
          Tulis Ulasan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create Review
          </DialogTitle>
        </DialogHeader>

        {/* Service Info */}
        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <div className="flex items-start space-x-4">
            <Image
              src={booking.service_id.thumbnail || "/placeholder.png"}
              alt={booking.service_id.name || ""}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {booking.service_id.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Teknisi: {booking.partner_id.name}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Tanggal:{" "}
                {new Date(booking.booking_date).toLocaleDateString("id-ID")}
              </p>
              <div className="text-lg font-bold text-blue-600">
                <NumericFormat
                  value={booking.service_id.price}
                  prefix="Rp "
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Rating*
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            className="p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                            onMouseEnter={() => setHoverRating(rating)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRatingClick(rating)}
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                rating <= (hoverRating || selectedRating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {selectedRating > 0 && (
                          <>
                            {selectedRating} dari 5 bintang
                            {selectedRating === 1 && " - Sangat Buruk"}
                            {selectedRating === 2 && " - Buruk"}
                            {selectedRating === 3 && " - Cukup"}
                            {selectedRating === 4 && " - Baik"}
                            {selectedRating === 5 && " - Sangat Baik"}
                          </>
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Komentar*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Bagikan pengalaman Anda dengan layanan ini..."
                      className="resize-none min-h-[120px]"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <FormMessage />
                    <span className="text-xs text-gray-500">
                      {field.value?.length || 0}/500 karakter
                    </span>
                  </div>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                type="button"
                disabled={isPending}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isPending || selectedRating === 0}
                className="min-w-[120px] cursor-pointer"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateReview;
