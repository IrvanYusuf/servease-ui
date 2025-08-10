import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleCheck,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Booking } from "@/types/booking.type";
import { FC, useState } from "react";
import { copyToClipboard, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";

interface CardBookingCustomerProps {
  bookingData: Booking;
}

const CardBookingCustomer: FC<CardBookingCustomerProps> = ({ bookingData }) => {
  const [copyPhone, setCopyPhone] = useState<boolean>(false);
  const { data: dataTotalUserCompletedBooking } = useQuery({
    queryKey: ["total-user-completed-booking", bookingData.user_id._id],
    queryFn: () =>
      DashboardPartnerBookingService.getTotalCompletedBookingUser({
        userId: bookingData.user_id._id,
      }),
  });
  const handleCallCustomer = () => {
    window.open(`https://wa.me/${bookingData.user_id.phone}`);
  };

  const handleWhatsAppCustomer = () => {
    const message = `Halo ${bookingData.user_id.name}, terkait pesanan ${bookingData._id}. Ada yang bisa saya bantu?`;
    window.open(
      `https://wa.me/${bookingData.user_id.phone.replace(
        "+",
        ""
      )}?text=${encodeURIComponent(message)}`
    );
  };

  const handleCopy = (payload: string | number) => {
    setCopyPhone(true);
    copyToClipboard(payload);
    setTimeout(() => {
      setCopyPhone(false);
    }, 1500);
  };
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Informasi Customer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={bookingData.user_id.profile_url || "/placeholder.png"}
                alt={bookingData.user_id.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                {bookingData.user_id.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {bookingData.user_id.name}
                </h3>
                {bookingData.user_id.isVerified && (
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span>
                  {dataTotalUserCompletedBooking?.data ?? 0} booking selesai
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Telepon
                </label>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-900">{bookingData.user_id.phone}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(bookingData.user_id.phone)}
                    className="h-6 w-6 p-0 cursor-pointer"
                  >
                    {copyPhone ? (
                      <CircleCheck className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Member Sejak
                </label>
                <p className="text-gray-900">
                  {formatDate({
                    date: new Date(bookingData.user_id.createdAt),
                  })}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex space-x-3">
            <Button
              onClick={handleCallCustomer}
              className="flex-1 cursor-pointer"
            >
              <Phone className="w-4 h-4 mr-2" />
              Telepon
            </Button>
            <Button
              onClick={handleWhatsAppCustomer}
              variant="outline"
              className="flex-1 bg-transparent cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Detail Lokasi Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <h4 className="font-semibold text-gray-900">
                {bookingData.address_id.label_alamat}
              </h4>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-gray-900 font-medium">
                {bookingData.user_id.name}
              </p>
              <p className="text-gray-700">
                {bookingData.address_id.street_name}
              </p>
              <p className="text-gray-600">
                {bookingData.address_id.district}, {bookingData.address_id.city}
              </p>
              <p className="text-gray-600">
                {bookingData.address_id.province}{" "}
              </p>
              {bookingData.address_id.description && (
                <p className="text-blue-600 text-xs">
                  📍 {bookingData.address_id.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardBookingCustomer;
