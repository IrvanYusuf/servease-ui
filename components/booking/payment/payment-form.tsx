"use client";
import BookingsServices from "@/services/booking.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { NumericFormat } from "react-number-format";
import Countdown from "react-countdown";
import { formatDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadPaymentProof } from "@/schema/booking.schema";
import queryClient from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

const PaymentForm = () => {
  const searchParams = useSearchParams();
  const [copyNoAccount, setCopyNoAccount] = useState(false);
  const [copyAmount, setCopyAmount] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const currentDate = new Date();

  const booking_id = searchParams.get("booking_id") ?? "";

  const handleCopy = (payload: string, setCopy: (v: boolean) => void) => {
    copyToClipboard(payload);
    setCopy(true);
    setTimeout(() => setCopy(false), 1500);
  };

  const { data: dataPayment, isLoading } = useQuery({
    queryKey: ["booking", booking_id],
    queryFn: () => BookingsServices.getDetailBooking(booking_id),
    enabled: !!booking_id,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    resolver: zodResolver(uploadPaymentProof),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      bookingId,
      formData,
    }: {
      bookingId: string;
      formData: FormData;
    }) => BookingsServices.uploadPaymentProof(bookingId, formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["booking", booking_id],
      });
      reset();
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("payment_proof", file);
    }
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("payment_proof", data.payment_proof);
    mutate({ bookingId: booking_id, formData });
  };

  const renderer = ({ hours, minutes, seconds }: any) => {
    return (
      <span className="text-lg font-semibold">
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  const booking = dataPayment?.data;
  const bankInfo = booking?.payment_method_id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {!booking || isLoading ? null : booking.payment_status === "unpaid" ? (
        currentDate > new Date(booking.payment_due) ? (
          <div className="text-center">
            <div className="relative w-60 h-60 mx-auto">
              <Image
                src="/payment-failed.png"
                alt="Payment Failed"
                fill
                className="mx-auto w-full h-full mb-4"
              />
            </div>
            <h3 className="text-red-600 font-semibold text-lg">
              Pembayaran Expired!
            </h3>
          </div>
        ) : (
          <>
            <h2 className="text-center text-xl font-semibold">
              Silakan lakukan pembayaran berikut:
            </h2>
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative w-24 h-12">
                  <Image
                    src={bankInfo?.bank_logo ?? "/placeholder.png"}
                    alt="Bank Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <CardTitle>{bankInfo?.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>No. Virtual Account</Label>
                  <div className="flex justify-between items-center border p-3 rounded-md">
                    <span className="tracking-widest">
                      {bankInfo?.account_number ?? 0}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          bankInfo?.account_number ?? "0",
                          setCopyNoAccount
                        )
                      }
                    >
                      {copyNoAccount ? "Disalin!" : "Salin"}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Nominal Transfer</Label>
                  <div className="flex justify-between items-center border p-3 rounded-md">
                    <NumericFormat
                      value={booking.total_price}
                      displayType="text"
                      prefix="Rp "
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          booking.total_price.toString(),
                          setCopyAmount
                        )
                      }
                    >
                      {copyAmount ? "Disalin!" : "Salin"}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>ID Transaksi</Label>
                  <p className="text-muted-foreground">#{booking._id}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium">Batas Pembayaran</p>
                  <Countdown
                    date={booking.payment_due}
                    renderer={renderer}
                    onComplete={() => setIsExpired(true)}
                  />
                  <p className="text-muted-foreground mt-1">
                    {formatDate({ date: new Date(booking.payment_due) })}
                  </p>
                </div>

                {!isExpired && (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3"
                    encType="multipart/form-data"
                  >
                    <div className="space-y-1">
                      <Label htmlFor="payment_proof">Bukti Pembayaran</Label>
                      <Input
                        id="payment_proof"
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleImageChange}
                      />
                      {errors.payment_proof && (
                        <p className="text-red-500 text-sm">
                          {errors.payment_proof.message?.toString()}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? "Mengirim..." : "Kirim"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </>
        )
      ) : (
        <div className="text-center">
          <div className="relative w-60 h-60 mx-auto mb-4">
            <Image
              src="/cat.png"
              alt="Payment Success"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-green-600 font-semibold text-lg">
            Pembayaran Berhasil!
          </h3>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
