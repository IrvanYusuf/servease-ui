"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import PaymentMethodsServices from "@/services/paymentMethod.service";
import { Control } from "react-hook-form";
import { CreateBookingPayload } from "@/schema/booking.schema";
import { FC, Fragment } from "react";
import SkeletonStepFour from "../skeleton/skeleton-step-four";

interface StepFourProps {
  control: Control<CreateBookingPayload>;
}

const StepFour: FC<StepFourProps> = ({ control }) => {
  const { data: dataPaymentMethods, isLoading: isLoadingPaymentMethod } =
    useQuery({
      queryKey: ["payment-methods"],
      queryFn: PaymentMethodsServices.getAllPaymentMethods,
    });

  const savePaymentNameToLocalStorage = (id: string) => {
    const payment = dataPaymentMethods?.data.find(
      (value, index) => value._id === id
    );

    localStorage.setItem("name_payment", payment!.name);
  };

  return (
    <div className="space-y-6 w-full">
      <FormField
        control={control}
        name="payment_method_id"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Pilih Metode Pembayaran</FormLabel>
            <RadioGroup
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                savePaymentNameToLocalStorage(value);
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-3"
            >
              {isLoadingPaymentMethod ? (
                <SkeletonStepFour />
              ) : dataPaymentMethods?.data ? (
                dataPaymentMethods.data.map((payment, index) => (
                  <Fragment key={payment._id}>
                    <RadioGroupItem
                      value={payment._id}
                      id={payment._id}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={payment._id}
                      className={`
                        relative flex items-center justify-center h-auto p-4 border-2 rounded-md cursor-pointer font-medium transition-all
                        ${
                          field.value === payment._id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        }
                      `}
                    >
                      <span className="font-medium">{payment.name}</span>
                    </Label>
                  </Fragment>
                ))
              ) : null}
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center">
        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
        <span className="font-medium">Siap untuk menyelesaikan pemesanan</span>
      </div>
    </div>
  );
};

export default StepFour;
