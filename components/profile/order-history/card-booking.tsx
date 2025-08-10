import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import {
  Clock,
  Eye,
  MapPin,
  MessageCircle,
  RefreshCw,
  Calendar,
} from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { FC } from "react";
import { Booking } from "@/types/booking.type";
import { PATHS } from "@/lib/paths";
import {
  statusConfig,
  statusPaymentConfig,
  statusReviewConfig,
} from "@/lib/config";

interface CardBookingProps {
  order: Booking;
}

const CardBooking: FC<CardBookingProps> = ({ order }) => {
  return (
    <Card key={order._id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Order Image & Info */}
          <div className="flex items-start space-x-4 flex-1">
            <Image
              src={order.service_id.thumbnail || "/placeholder.png"}
              alt={order.service_id.name}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="text-xs bg-blue-100 text-blue-800">
                  {order.service_id.category_id.name}
                </Badge>
                <Badge
                  className={`text-xs ${statusConfig[order.status].color}`}
                >
                  {statusConfig[order.status].label}
                </Badge>
                <Badge
                  className={`text-xs ${
                    statusPaymentConfig[order.payment_status].color
                  }`}
                >
                  {statusPaymentConfig[order.payment_status].label}
                </Badge>
              </div>
              <span className="font-semibold text-xl text-gray-900 mb-1">
                {order.service_id.name}
              </span>
              <p className="text-sm text-gray-600 mb-2">
                Teknisi: {order.partner_id.name}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(order.booking_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {order.booking_time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="truncate max-w-xs">
                    {order.address_id.street_name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex flex-col items-end space-y-3">
            <Badge className={`text-xs`} variant={"secondary"}>
              {order.payment_method_id.name}
            </Badge>
            <Badge
              className={`text-xs ${
                statusReviewConfig[order.review_status].color
              }`}
            >
              {statusReviewConfig[order.review_status].label}
            </Badge>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                Rp {order.total_price.toLocaleString("id-ID")}
              </div>
              <div className="text-sm text-gray-500">ID: #{order._id}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link href={PATHS.profile.booking.detail(order._id)}>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Eye className="w-4 h-4 mr-1" />
                  Detail
                </Button>
              </Link>

              {order.status === "completed" && (
                <Link href={PATHS.home.service.detail(order.service_id._id)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Booking Lagi
                  </Button>
                </Link>
              )}

              {order.status === "confirmed" && (
                <Link
                  href={`https://wa.me/${order.service_id.user_id.phone}`}
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBooking;
