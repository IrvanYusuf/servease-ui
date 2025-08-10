import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, warrantyGenerate } from "@/lib/utils";
import { Booking } from "@/types/booking.type";
import { CheckCircle, MessageCircle, Phone, Shield } from "lucide-react";
import { FC } from "react";

interface CardWarrantyProps {
  bookingData: Booking;
}

const warrantyTerms = [
  "Garansi berlaku untuk kerusakan yang sama",
  "Tidak berlaku untuk kerusakan akibat pemakaian yang salah",
  "Hubungi customer service untuk klaim garansi",
];

const CardWarranty: FC<CardWarrantyProps> = ({ bookingData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Informasi Garansi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center text-green-700 mb-2">
            <Shield className="w-5 h-5 mr-2" />
            <span className="font-medium">Garansi Aktif</span>
          </div>
          <p className="text-green-600">
            Berlaku hingga{" "}
            {formatDate({
              date: new Date(
                warrantyGenerate({ date: new Date(bookingData.createdAt) })
              ),
              show: "",
            })}
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-3">Syarat & Ketentuan Garansi</h4>
          <ul className="space-y-2">
            {warrantyTerms.map((term, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                {term}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Cara Klaim Garansi</h4>
          <p className="text-blue-800 text-sm mb-3">
            Jika mengalami masalah yang sama dalam masa garansi, hubungi
            customer service kami:
          </p>
          <div className="flex gap-3">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-4 h-4 mr-1" />
              Telepon
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-blue-600 text-blue-600 bg-transparent"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardWarranty;
