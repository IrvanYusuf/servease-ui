import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Booking } from "@/types/booking.type";
import { Star } from "lucide-react";
import Image from "next/image";
import { FC, ReactNode, useState } from "react";
import { NumericFormat } from "react-number-format";

interface ModalDetailReviewProps {
  booking: Booking;
  children: ReactNode;
}

const ModalDetailReview: FC<ModalDetailReviewProps> = ({
  booking,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const review = booking.review_id;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detail Review
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

        {/* customer section */}
        <p className="text-base font-medium">Customer:</p>
        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <div className="flex items-start space-x-4">
            <Image
              src={booking.user_id.profile_url || "/placeholder.png"}
              alt={booking.user_id.name || ""}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {booking.user_id.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Email: {booking.user_id.email}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Phone: {booking.user_id.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Review Section */}
        {review ? (
          <div className="space-y-4">
            {/* Rating Display */}
            <div>
              <p className="text-base font-medium mb-1">Rating:</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {review.rating} / 5
                </span>
              </div>
            </div>

            {/* Comment Display */}
            <div>
              <p className="text-base font-medium mb-1">Komentar:</p>
              <Textarea
                value={review.comment}
                readOnly
                className="resize-none min-h-[120px] bg-gray-100"
              />
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            Belum ada review untuk booking ini.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetailReview;
