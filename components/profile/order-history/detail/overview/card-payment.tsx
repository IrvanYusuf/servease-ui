import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { APP_FEE } from "@/constants/constants";
import { Booking } from "@/types/booking.type";
import { CheckCircle, CreditCard } from "lucide-react";
import { FC } from "react";
import { NumericFormat } from "react-number-format";

interface CardPaymentProps {
  bookingData: Booking;
}

const CardPayment: FC<CardPaymentProps> = ({ bookingData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <CreditCard className="w-5 h-5 mr-2" />
          Informasi Pembayaran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Harga Dasar</span>
            <span>
              <NumericFormat
                value={bookingData.sub_total ?? 0}
                displayType="text"
                prefix="Rp "
                thousandSeparator={"."}
                decimalSeparator=","
              />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Biaya Aplikasi</span>
            <span>
              <NumericFormat
                value={APP_FEE}
                displayType="text"
                prefix="Rp "
                thousandSeparator={"."}
                decimalSeparator=","
              />
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total</span>
            <span>
              <NumericFormat
                value={bookingData.total_price ?? 0}
                displayType="text"
                prefix="Rp "
                thousandSeparator={"."}
                decimalSeparator=","
              />
            </span>
          </div>
          {bookingData.payment_status === "paid" ? (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center text-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="font-medium">Pembayaran Berhasil • </span>
                <p className="text-sm text-green-600 ms-1">
                  {bookingData.payment_method_id.name ?? ""}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center text-red-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  Pembayaran Belum Dilakukan •
                </span>
                <p className="text-sm text-red-600 ms-1">
                  {bookingData.payment_method_id.name ?? ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPayment;
