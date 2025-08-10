import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Service } from "@/types/service.type";
import { NumericFormat } from "react-number-format";
import { APP_FEE } from "@/constants/constants";
import { memo } from "react";

interface BookingSummaryProps {
  serviceData: Service;
}

function BookingSummary({ serviceData }: BookingSummaryProps) {
  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Info */}
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 relative rounded-lg object-cover">
              <Image
                src={serviceData.thumbnail || "/placeholder.png"}
                alt={serviceData.name}
                className="object-cover rounded-lg"
                fill
              />
            </div>
            <div className="flex-1">
              <Badge className="mb-1 text-xs bg-blue-600">
                {serviceData.category_id.name}
              </Badge>
              <h3 className="font-medium text-sm leading-tight">
                {serviceData.name}
              </h3>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          {/* <div className="space-y-3 text-sm">
            {bookingData.selectedDate && bookingData.selectedTime && (
              <div className="flex justify-between">
                <span className="text-gray-600">Jadwal:</span>
                <span className="font-medium text-right">
                  {bookingData.selectedDate}
                  <br />
                  {bookingData.selectedTime}
                </span>
              </div>
            )}

            {bookingData.customerInfo.name && (
              <div className="flex justify-between">
                <span className="text-gray-600">Nama:</span>
                <span className="font-medium">
                  {bookingData.customerInfo.name}
                </span>
              </div>
            )}

            {bookingData.customerInfo.phone && (
              <div className="flex justify-between">
                <span className="text-gray-600">Telepon:</span>
                <span className="font-medium">
                  {bookingData.customerInfo.phone}
                </span>
              </div>
            )}

            {bookingData.customerInfo.address && (
              <div className="flex justify-between">
                <span className="text-gray-600">Alamat:</span>
                <span className="font-medium text-right text-xs max-w-32">
                  {bookingData.customerInfo.address}
                </span>
              </div>
            )}
          </div> */}

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Harga Dasar</span>
              <span>
                <NumericFormat
                  value={serviceData.price || 0}
                  displayType="text"
                  prefix="Rp "
                  thousandSeparator={"."}
                  decimalSeparator=","
                />
              </span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Aplikasi</span>
              <span>
                <NumericFormat
                  value={APP_FEE || 0}
                  displayType="text"
                  prefix="Rp "
                  thousandSeparator={"."}
                  decimalSeparator=","
                />
              </span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-blue-600">
                <NumericFormat
                  value={serviceData.price + APP_FEE || 0}
                  displayType="text"
                  prefix="Rp "
                  thousandSeparator={"."}
                  decimalSeparator=","
                />
              </span>
            </div>
          </div>

          {/* Payment Method */}
          {/* {bookingData.paymentMethod && (
            <>
              <Separator />
              <div className="text-sm">
                <span className="text-gray-600">Metode Pembayaran:</span>
                <div className="font-medium mt-1">
                  {bookingData.paymentMethod === "cash" && "Bayar Tunai"}
                  {bookingData.paymentMethod === "transfer" && "Transfer Bank"}
                  {bookingData.paymentMethod === "ewallet" && "E-Wallet"}
                </div>
              </div>
            </>
          )} */}

          {/* Guarantee */}
          <div className="bg-green-50 p-3 rounded-lg text-sm">
            <div className="flex items-center text-green-700">
              <span className="font-medium">✓ Garansi Service 30 Hari</span>
            </div>
            <div className="text-green-600 text-xs mt-1">
              Teknisi berpengalaman & bersertifikat
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(BookingSummary);
