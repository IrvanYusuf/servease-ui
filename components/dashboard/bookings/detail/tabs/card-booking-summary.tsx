import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CircleCheck,
  Copy,
  MapPin,
  Wrench,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/booking.type";
import { FC, useState } from "react";
import { copyToClipboard, formatDate } from "@/lib/utils";
import { APP_FEE } from "@/constants/constants";
import Image from "next/image";

interface CardBookingCustomerProps {
  bookingData: Booking;
}

const CardBookingSummary: FC<CardBookingCustomerProps> = ({ bookingData }) => {
  const [copy, setCopy] = useState<boolean>(false);

  const handleCopy = (payload: string | number) => {
    setCopy(true);
    copyToClipboard(payload);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Ringkasan Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Informasi Dasar</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Booking ID:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{bookingData._id}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(bookingData._id)}
                        className="h-6 px-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {copy ? (
                          <CircleCheck className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Booking ID</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dibuat:</span>
                <span className="font-medium">
                  {formatDate({
                    date: new Date(bookingData.createdAt),
                    show: "",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimasi Durasi:</span>
                <span className="font-medium">2-3 jam</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pembayaran:</span>
                <span className="font-bold text-green-600 text-lg">
                  Rp{bookingData.total_price.toLocaleString("id")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 flex flex-col md:items-end">
            <h4 className="font-semibold text-gray-900">Jadwal & Lokasi</h4>
            <div className="space-y-4 flex flex-col md:items-end">
              <div className="flex items-start md:text-right space-x-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formatDate({
                      date: new Date(bookingData.booking_date),
                      show: "",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Pukul {bookingData.booking_time}
                  </p>
                </div>
              </div>
              <div className="flex items-start md:text-right">
                <div>
                  <div className="flex md:justify-end space-x-3">
                    <MapPin className="w-5 h-5 text-right text-red-600 mt-0.5" />
                    <p className="font-medium text-gray-900">
                      {bookingData.address_id.label_alamat}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {bookingData.address_id.street_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {bookingData.address_id.district},{" "}
                    {bookingData.address_id.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <CardTitle className="flex items-center">
          <Wrench className="w-5 h-5 mr-2" />
          Detail Layanan
        </CardTitle>
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-24 h-24 relative">
            <Image
              src={bookingData.service_id.thumbnail || "/placeholder.png"}
              alt={bookingData.service_id.name}
              fill
              className="w-full h-full rounded-lg object-cover border"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-blue-100 text-blue-800">
                {bookingData.service_id.category_id.name}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {bookingData.service_id.name}
            </h3>
            <span className="font-bold text-gray-900 mb-1">
              {bookingData.partner_id.name}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Harga:</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Harga Dasar:</span>
                <span className="font-medium">
                  Rp{bookingData.service_id.price.toLocaleString("id")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Biaya Aplikasi:</span>
                <span className="font-medium">
                  Rp{APP_FEE.toLocaleString("id")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Harga Final:</span>
                <span className="text-xl font-bold text-green-600">
                  Rp{bookingData.total_price.toLocaleString("id")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Catatan
          </h4>
          <p className="text-amber-800 text-sm">{bookingData?.notes ?? "-"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBookingSummary;
