import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/types/booking.type";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { NumericFormat } from "react-number-format";
import ModalCreateReview from "./modal/modal-create-review";

interface CardPendingReviewProps {
  reviewPending: Booking;
}

const CardPendingReview: FC<CardPendingReviewProps> = ({ reviewPending }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-4">
            <Image
              src={reviewPending.service_id.thumbnail || "/placeholder.png"}
              alt={reviewPending.service_id.name || ""}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
            <div>
              <Badge className="mb-2 text-xs bg-blue-100 text-blue-800">
                {reviewPending.service_id.category_id.name}
              </Badge>
              <div>
                <span>ID Pesanan: #{reviewPending._id}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {reviewPending.service_id.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Teknisi: {reviewPending.partner_id.name}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(reviewPending.booking_date).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 mb-2">
              <NumericFormat
                value={reviewPending.service_id.price}
                prefix="Rp "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </div>
            <ModalCreateReview booking={reviewPending} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPendingReview;
