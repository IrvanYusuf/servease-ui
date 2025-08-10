import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/types/booking.type";
import { Phone, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment } from "react";

interface CardCustomerTechnicianProps {
  bookingData: Booking;
}

const CardCustomerTechnician: FC<CardCustomerTechnicianProps> = ({
  bookingData,
}) => {
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <User className="w-5 h-5 mr-2" />
            Informasi Pelanggan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium">{bookingData.user_id.name}</p>
            <p className="text-sm text-gray-500">Nama pelanggan</p>
          </div>
          <div>
            <p className="font-medium">{bookingData.user_id.phone}</p>
            <p className="text-sm text-gray-500">Nomor telepon</p>
          </div>
          <div>
            <p className="font-medium">{bookingData.user_id.email}</p>
            <p className="text-sm text-gray-500">Email</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <User className="w-5 h-5 mr-2" />
            Teknisi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-full relative object-cover">
              <Image
                src={bookingData.partner_id.profile_image || "/placeholder.png"}
                alt={bookingData.partner_id.name}
                fill
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{bookingData.partner_id.name}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">
                    {bookingData.service_id.rating}
                  </span>
                </div>
              </div>
              <Link
                href={`https://wa.me/${bookingData.service_id.user_id.phone}`}
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full cursor-pointer"
                  // onClick={handleContactTechnician}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Hubungi
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default CardCustomerTechnician;
