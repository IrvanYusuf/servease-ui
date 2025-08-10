"use client";
import { CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Control, UseFormWatch } from "react-hook-form";
import { CreateBookingPayload } from "@/schema/booking.schema";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
].map((time) => ({
  time,
  available: true,
  popular: ["09:00", "10:00", "14:00", "20:00"].includes(time),
}));

interface DateTimePickerProps {
  control: Control<CreateBookingPayload>;
  watch: UseFormWatch<CreateBookingPayload>;
}

export default function DateTimePicker({
  control,
  watch,
}: DateTimePickerProps) {
  const selectedDate = watch("booking_date");

  console.log(selectedDate);

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <FormField
        control={control}
        name="booking_date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Pilih Tanggal</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <div className="w-full">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Time Selection */}
      {selectedDate && (
        <FormField
          control={control}
          name="booking_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih Waktu</FormLabel>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Pilih Waktu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    {timeSlots.map((timeOption) => {
                      const [hour, minute] = timeOption.time
                        .split(":")
                        .map(Number);

                      const selectedDateTime = dayjs(selectedDate)
                        .set("hour", hour)
                        .set("minute", minute)
                        .tz("Asia/Jakarta");

                      const now = dayjs().tz("Asia/Jakarta");

                      const isPast = selectedDateTime.isBefore(now);
                      const isDisabled = isPast || !timeOption.available;

                      return (
                        <div key={timeOption.time} className="relative">
                          <RadioGroupItem
                            value={timeOption.time}
                            id={timeOption.time}
                            disabled={isDisabled}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={timeOption.time}
                            className={`
                        relative flex items-center justify-center h-auto p-4 border-2 rounded-md cursor-pointer font-medium transition-all
                        ${
                          field.value === timeOption.time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        }
                        ${
                          isDisabled
                            ? "opacity-50 cursor-not-allowed hover:bg-background hover:text-muted-foreground"
                            : ""
                        }
                      `}
                          >
                            <span className="font-medium">
                              {timeOption.time}
                            </span>
                            {timeOption.popular && !isDisabled && (
                              <Badge
                                variant="secondary"
                                className="absolute -top-2 -right-2 text-xs"
                              >
                                Ramai
                              </Badge>
                            )}
                            {isDisabled && (
                              <Badge
                                variant="destructive"
                                className="absolute -top-2 -right-2 text-xs"
                              >
                                Lewat
                              </Badge>
                            )}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      💡 Waktu populer: 09:00, 10:00, 14:00, 20:00 (sering
                      dipesan)
                    </p>
                    <p>⏰ Estimasi durasi: 2-3 jam</p>
                  </div>
                </CardContent>
              </Card>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
