"use client";
import CardAddress from "@/components/card-address";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { CreateBookingPayload } from "@/schema/booking.schema";
import { Address } from "@/types/address.type";
import { User } from "@/types/user.type";
import { FC } from "react";
import { UseFormWatch } from "react-hook-form";

interface StepFiveProps {
  watch: UseFormWatch<CreateBookingPayload>;
  dataUser: User;
  dataPrimaryAddress: Address | null;
}

const StepFive: FC<StepFiveProps> = ({
  watch,
  dataUser,
  dataPrimaryAddress,
}) => {
  const selectedDate = watch("booking_date");
  const selectedTime = watch("booking_time");
  const paymentName = localStorage.getItem("name_payment");
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Ringkasan Pemesanan</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Tanggal & Waktu:</span>
            <span className="font-medium">
              {formatDate({ date: selectedDate, show: "" })} - {selectedTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Nama:</span>
            <span className="font-medium">{dataUser.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Telepon:</span>
            <span className="font-medium">{dataUser.phone}</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span className="font-medium">{dataUser.email}</span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="my-3 flex justify-between">
          <h4 className="font-medium">Metode Pembayaran Dipilih</h4>
          <div>
            <span className="font-medium">{paymentName}</span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="my-3">
          <h4 className="font-medium">Alamat Dipilih</h4>
          <div>
            {dataPrimaryAddress ? (
              <CardAddress address={dataPrimaryAddress} showAction={false} />
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Syarat & Ketentuan</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Teknisi akan datang sesuai jadwal yang dipilih</li>
          <li>• Pembayaran dapat dilakukan tunai atau transfer</li>
          <li>• Garansi service berlaku sesuai paket yang dipilih</li>
        </ul>
      </div>
    </div>
  );
};

export default StepFive;
