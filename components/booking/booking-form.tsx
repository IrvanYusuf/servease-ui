"use client";

import { createElement, Fragment, useEffect, useState } from "react";
import { Calendar, MapPin, User, CreditCard, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingSteps from "./booking-steps";
import BookingSummary from "./booking-summary";
import StepOne from "./step-bookings/step-one";
import StepTwo from "./step-bookings/step-two";
import { useMutation, useQuery } from "@tanstack/react-query";
import ServicesServices from "@/services/service.service";
import StepThree from "./step-bookings/step-three";
import UsersServices from "@/services/user.service";
import StepFour from "./step-bookings/step-four";
import AddressesService from "@/services/address.service";
import { useForm } from "react-hook-form";
import {
  CreateBookingPayload,
  createBookingSchema,
} from "@/schema/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import StepFive from "./step-bookings/step-five";
import BookingsServices from "@/services/booking.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PATHS } from "@/lib/paths";
import { APP_FEE } from "@/constants/constants";
import { MutateBookingPayload } from "@/types/booking.type";
import BookingSummarySkeleton from "./skeleton/booking-summary-skeleton";
import { ApiResponse } from "@/types/api.type";
import { Address } from "@/types/address.type";
import { AxiosError } from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const steps = [
  { id: 1, title: "Pilih Jadwal", icon: Calendar },
  { id: 2, title: "Info Pelanggan", icon: User },
  { id: 3, title: "Detail Layanan", icon: MapPin },
  { id: 4, title: "Metode Pembayaran", icon: CheckCircle },
  { id: 5, title: "Konfirmasi", icon: CreditCard },
];

export default function BookingForm({ serviceId }: { serviceId: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const form = useForm<CreateBookingPayload>({
    mode: "onTouched",
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      bring_ladder: false,
      payment_method_id: "",
      booking_date: new Date(),
      booking_time: "",
      notes: "",
    },
  });

  const {
    reset,
    control,
    trigger,
    watch,
    formState: { errors },
  } = form;

  const nextStep = async () => {
    if (currentStep < steps.length) {
      let valid = true;

      if (currentStep === 1) {
        valid = await trigger(["booking_date", "booking_time"]);
      } else if (currentStep === 2) {
        valid = true;
      } else if (currentStep === 3) {
        valid = await trigger(["notes"]);
      } else if (currentStep === 4) {
        valid = await trigger(["payment_method_id"]);
      } else if (currentStep === 5) {
        valid = true;
      }

      if (valid) {
        // Delay perubahan step untuk menghindari langsung trigger submit
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, 50);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const {
    data: dataServiceDetail,
    isLoading,
    error: serviceError,
  } = useQuery({
    queryKey: ["service-detail", serviceId],
    queryFn: () => ServicesServices.getServiceDetail(serviceId),
    enabled: !!serviceId, // Only fetch if serviceId exists
  });

  const {
    data: dataUser,
    isLoading: isLoadingDataUser,
    error: userError,
  } = useQuery({
    queryKey: ["detail-user"],
    queryFn: () => UsersServices.getUser(),
  });

  const {
    data: dataPrimaryAddress,
    isLoading: isLoadingPrimaryAddress,
    error: addressError,
  } = useQuery<ApiResponse<Address>, AxiosError<ApiResponse<any>>>({
    queryKey: ["primary-address"],
    queryFn: AddressesService.getPrimaryAddress,
  });

  const selectedBringLadder = watch("bring_ladder");

  const isAddressNotFound =
    addressError && addressError.response?.status === 404;
  // Check if all required data is available
  const isDataReady =
    dataServiceDetail?.data &&
    dataUser?.data &&
    (isAddressNotFound || dataPrimaryAddress?.data);

  // Check for any errors
  const hasErrors =
    serviceError || userError || (addressError && !isAddressNotFound);

  console.log({ serviceError, userError, addressError });

  const onSubmit = (data: CreateBookingPayload) => {
    // Safety check before submitting
    if (!dataPrimaryAddress?.data || !dataServiceDetail?.data) {
      toast.error("Data tidak lengkap, silakan coba lagi");
      return;
    }

    // Additional safety checks for nested data
    if (
      !dataServiceDetail.data.partner_id?._id ||
      !dataServiceDetail.data.user_id?._id
    ) {
      toast.error("Data layanan tidak valid, silakan coba lagi");
      return;
    }

    const payload: MutateBookingPayload = {
      address_id: dataPrimaryAddress.data._id,
      service_id: serviceId,
      partner_id: dataServiceDetail.data.partner_id._id,
      owner_id: dataServiceDetail.data.user_id._id,
      total_price: (APP_FEE || 0) + (dataServiceDetail.data.price || 0),
      ...data,
      bring_ladder: selectedBringLadder || false,
    };

    mutate(payload);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: BookingsServices.mutationCreateBooking,
    onSuccess: (res) => {
      console.log(res);

      reset();
      // Cek apakah pembayaran tunai
      if (selectedPayment?.toLowerCase() === "tunai") {
        toast.success("Booking berhasil", {
          description:
            "Silakan membayar langsung secara tunai saat layanan selesai.",
        });
        setTimeout(() => {
          router.push(PATHS.home.root);
        }, 3000);
      } else {
        toast.success("Booking berhasil", {
          description: "Silakan melakukan pembayaran",
        });
        setTimeout(() => {
          router.push(PATHS.home.root);
        }, 3000);
        // navigate(`/payment?booking_id=${res.data._id}`);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Terjadi kesalahan saat membuat booking");
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const payment = localStorage.getItem("name_payment");
      setSelectedPayment(payment);
    }
  }, []);

  // Show loading state while any required data is loading
  if (isLoading || isLoadingDataUser || isLoadingPrimaryAddress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Memuat Data...
            </h1>
            <p className="text-gray-600">Silakan tunggu sebentar</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <BookingSummarySkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there are any errors
  if (hasErrors) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-2">
              Terjadi Kesalahan
            </h1>
            <p className="text-gray-600 mb-4">
              Tidak dapat memuat data yang diperlukan
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Muat Ulang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show message if required data is not available
  if (!isDataReady) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Data Tidak Tersedia
            </h1>
            <p className="text-gray-600 mb-4">
              Beberapa data yang diperlukan tidak tersedia
            </p>
            <Button onClick={() => router.back()} variant="outline">
              Kembali
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pesan Layanan
          </h1>
          <p className="text-gray-600">
            Lengkapi form booking untuk melanjutkan pemesanan
          </p>
        </div>

        <BookingSteps steps={steps} currentStep={currentStep} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Main Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:col-span-2 h-auto"
            >
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {createElement(steps[currentStep - 1]?.icon || Calendar, {
                        className: "w-5 h-5 mr-2",
                      })}
                      {steps[currentStep - 1]?.title || "Step"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Step 1: Date & Time Selection */}
                    {currentStep === 1 && (
                      <StepOne control={control} watch={watch} />
                    )}

                    {/* Step 2: Customer Information */}
                    {currentStep === 2 && (
                      <StepTwo
                        dataUser={dataUser.data}
                        isLoading={false}
                        dataPrimaryAddress={
                          isAddressNotFound
                            ? null
                            : dataPrimaryAddress?.data ?? null
                        }
                        isLoadingPrimaryAddres={false}
                      />
                    )}

                    {/* Step 3: Service Details */}
                    {currentStep === 3 && (
                      <StepThree
                        control={control}
                        serviceDetail={dataServiceDetail.data}
                      />
                    )}

                    {/* Step 4: Payment Method */}
                    {currentStep === 4 && <StepFour control={control} />}

                    {/* Step 5: Confirmation */}
                    {currentStep === 5 && (
                      <StepFive
                        watch={watch}
                        dataUser={dataUser.data}
                        dataPrimaryAddress={
                          isAddressNotFound
                            ? null
                            : dataPrimaryAddress?.data ?? null
                        }
                      />
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="cursor-pointer"
                        type="button"
                      >
                        Sebelumnya
                      </Button>

                      {currentStep < steps.length &&
                      currentStep === 2 &&
                      isAddressNotFound ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <Button type="button" disabled>
                                Selanjutnya
                              </Button>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Tambah alamat terlebih dahulu</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : currentStep < steps.length ? (
                        <Button
                          onClick={nextStep}
                          type="button"
                          className="cursor-pointer"
                        >
                          Selanjutnya
                        </Button>
                      ) : null}

                      {currentStep === steps.length && (
                        <Button
                          disabled={isPending}
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 cursor-pointer"
                        >
                          {isPending ? "Loading...." : "Buat Pemesanan"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <BookingSummary serviceData={dataServiceDetail.data} />
          </div>
        </div>
      </div>
    </div>
  );
}
