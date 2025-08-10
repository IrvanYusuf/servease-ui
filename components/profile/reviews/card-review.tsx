import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/types/review.type";
import { Star, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { NumericFormat } from "react-number-format";

interface CardReviewProps {
  review: Review;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CardReview: FC<CardReviewProps> = ({ review, onEdit, onDelete }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex md:items-center md:flex-row flex-col justify-between">
          <div className="flex items-start flex-col w-full md:w-auto md:flex-row space-x-4">
            <div className="relative w-full h-[180px] md:h-16 md:w-16">
              <Image
                src={review.service_id.thumbnail || "/placeholder.png"}
                alt={review.service_id.name || ""}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="mt-4 md:mt-0">
              <Badge className="mb-2 text-xs bg-blue-100 text-blue-800">
                {review.service_id.category_id.name}
              </Badge>
              <div>
                <span>ID Pesanan: #{review._id}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {review.service_id.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Teknisi: {review.partner_id.name}
              </p>
              <div className="flex items-center gap-4 mb-3">
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
                  {new Date(review.booking_id.booking_date).toLocaleDateString(
                    "id-ID"
                  )}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                {review.comment}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 mb-2">
              <NumericFormat
                value={review.service_id.price}
                prefix="Rp "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </div>
            {/* Edit & Delete buttons */}
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-sm cursor-pointer"
                onClick={() => onEdit?.(review._id)}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="text-sm cursor-pointer"
                onClick={() => onDelete?.(review._id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Hapus
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardReview;
