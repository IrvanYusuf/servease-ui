"use client";
import DateTimePicker from "@/components/date-time-picker";
import { CreateBookingPayload } from "@/schema/booking.schema";
import { FC } from "react";
import { Control, UseFormWatch } from "react-hook-form";

interface StepOneProps {
  control: Control<CreateBookingPayload>;
  watch: UseFormWatch<CreateBookingPayload>;
}

const StepOne: FC<StepOneProps> = ({ control, watch }) => {
  return <DateTimePicker control={control} watch={watch} />;
};

export default StepOne;
