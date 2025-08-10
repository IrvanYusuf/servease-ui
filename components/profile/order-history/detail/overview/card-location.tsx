import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/types/booking.type";
import { MapPin } from "lucide-react";
import { FC } from "react";

interface CardLocationProps {
  bookingData: Booking;
}

const CardLocation: FC<CardLocationProps> = ({ bookingData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <MapPin className="w-5 h-5 mr-2" />
          Lokasi Layanan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start">
          <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1" />
          <div>
            <p className="font-medium mb-1">
              {bookingData.address_id.label_alamat ?? ""}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {bookingData.address_id.street_name ?? ""}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-x-1 leading-relaxed">
              <span>{bookingData.address_id.district ?? ""},</span>
              <span>{bookingData.address_id.city ?? ""},</span>
              <span>{bookingData.address_id.province ?? ""}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardLocation;
