import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import queryClient from "@/lib/queryClient";
import ReviewsService from "@/services/review.service";
import { Review } from "@/types/review.type";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { toast } from "sonner";
import { NumericFormat } from "react-number-format";

interface ModalDeleteReviewProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteReview: FC<ModalDeleteReviewProps> = ({
  review,
  isOpen,
  onClose,
}) => {
  const { mutate: mutateDeleteReview, isPending } = useMutation({
    mutationFn: ({ reviewId }: { reviewId: string }) =>
      ReviewsService.deleteReview({ reviewId }),
    onSuccess: () => {
      toast.success("Review berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      queryClient.invalidateQueries({ queryKey: ["total-booking-reviewed"] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Gagal menghapus review");
    },
  });

  const handleDelete = () => {
    if (review?._id) {
      mutateDeleteReview({ reviewId: review._id });
    }
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Hapus Review
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Tindakan ini tidak dapat dibatalkan
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700 mb-4">
            Apakah Anda yakin ingin menghapus review ini?
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-start space-x-3">
              <Image
                src={review.service_id.thumbnail || "/placeholder.png"}
                alt={review.service_id.name || ""}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1 truncate">
                  {review.service_id.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Teknisi: {review.partner_id.name}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {review.rating}/5
                  </span>
                </div>

                {/* Comment Preview */}
                <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                  {review.comment}
                </p>

                {/* Price & Date */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>
                    {new Date(
                      review.booking_id.booking_date
                    ).toLocaleDateString("id-ID")}
                  </span>
                  <span className="font-medium">
                    <NumericFormat
                      value={review.service_id.price}
                      prefix="Rp "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1 cursor-pointer"
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 gap-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Hapus Review
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteReview;
