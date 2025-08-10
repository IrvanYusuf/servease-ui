import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FC, Fragment } from "react";
import { Control } from "react-hook-form";
import { CreateBookingPayload } from "@/schema/booking.schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Service } from "@/types/service.type";

interface StepThreeProps {
  control: Control<CreateBookingPayload>;
  serviceDetail: Service;
}
const StepThree: FC<StepThreeProps> = ({ control, serviceDetail }) => {
  return (
    <div className="space-y-6">
      {serviceDetail.category_id.name !== "Smartphone" && (
        <FormField
          control={control}
          name="bring_ladder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apakah Membawa Tangga</FormLabel>
              <RadioGroup
                value={String(field.value)}
                onValueChange={(value) => field.onChange(value === "true")}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3"
              >
                <Fragment>
                  <RadioGroupItem
                    value={"true"}
                    id={"true"}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={"true"}
                    className={`relative flex items-center justify-center h-auto p-4 border-2 rounded-md cursor-pointer font-medium transition-all
                              ${
                                field.value === true
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                              }
                            `}
                  >
                    <span className="font-medium">Ya</span>
                  </Label>
                  <RadioGroupItem
                    value={"false"}
                    id={"false"}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={"false"}
                    className={`relative flex items-center justify-center h-auto p-4 border-2 rounded-md cursor-pointer font-medium transition-all
                              ${
                                field.value === false
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                              }
                            `}
                  >
                    <span className="font-medium">Tidak</span>
                  </Label>
                </Fragment>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deskripsi Masalah *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepThree;
