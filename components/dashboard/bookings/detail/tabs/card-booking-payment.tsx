import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Download, Receipt } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Booking } from "@/types/booking.type";
import { statusPaymentConfig } from "@/lib/config";
import { formatDate, formatPaymentMethod } from "@/lib/utils";

interface CardBookingPaymentProps {
  bookingData: Booking;
}

const CardBookingPayment = ({ bookingData }: CardBookingPaymentProps) => {
  const paymentStatus =
    statusPaymentConfig[
      bookingData.payment_status as keyof typeof statusPaymentConfig
    ];
  const PaymentIcon = paymentStatus.icon;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Informasi Pembayaran
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`flex items-center justify-between p-4 bg-${
              bookingData.payment_status === "paid" ? "green" : "yellow"
            }-50 border border-${
              bookingData.payment_status === "paid" ? "green" : "yellow"
            }-200 rounded-lg`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 bg-${
                  bookingData.payment_status === "paid" ? "green" : "yellow"
                }-100 rounded-full flex items-center justify-center`}
              >
                <PaymentIcon
                  className={`w-5 h-5 text-${
                    bookingData.payment_status === "paid" ? "green" : "yellow"
                  }-600`}
                />
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    bookingData.payment_status === "paid"
                      ? "text-green-900"
                      : "text-yellow-900"
                  }`}
                >
                  Status Pembayaran
                </p>
                <p
                  className={`text-sm ${
                    bookingData.payment_status === "paid"
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  {paymentStatus.label}
                </p>
              </div>
            </div>
            <Badge className={paymentStatus.color}>
              <PaymentIcon className="w-3 h-3 mr-1" />
              {paymentStatus.label}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Metode Pembayaran
                </label>
                <p className="text-gray-900 font-medium">
                  {formatPaymentMethod(bookingData.payment_method_id.type)}
                </p>
                {bookingData.payment_method_id.type === "bank_transfer" && (
                  <p className="text-sm text-gray-600">
                    {bookingData.payment_method_id.bank_name} -{" "}
                    {bookingData.payment_method_id.account_holder}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Dibayar Pada
                </label>
                {bookingData.timelinetracker?.tracker.payment_at ? (
                  <p className="text-gray-900 font-medium">
                    {formatDate({
                      date: new Date(
                        bookingData.timelinetracker?.tracker.payment_at
                      ),
                    })}
                  </p>
                ) : (
                  <p className="text-gray-900 font-medium">-</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Rincian Pembayaran
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Harga Layanan:</span>
              <span className="font-medium">
                Rp{bookingData.service_id.price.toLocaleString("id")}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span>Rp{bookingData.sub_total.toLocaleString("id")}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Diskon MEMBER123:</span>
              <span className="text-red-600">- Rp0</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Biaya Applikasi:</span>
              <span>+ {bookingData.app_cost.toLocaleString("id")}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center font-semibold text-lg">
              <span className="text-gray-900">Total Pembayaran:</span>
              <span className="text-green-600">
                {bookingData.total_price.toLocaleString("id")}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full cursor-pointer bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardBookingPayment;
