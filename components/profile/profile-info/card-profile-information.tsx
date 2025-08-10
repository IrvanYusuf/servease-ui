"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { genderConfig } from "@/lib/config";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { UpdateUserPayload, updateUserSchema } from "@/schema/auth.schema";
import { User } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Camera, Edit, Save, X } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@tanstack/react-query";
import UsersServices from "@/services/user.service";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";

interface CardProfileInformationProps {
  profileData: User;
}

const CardProfileInformation: FC<CardProfileInformationProps> = ({
  profileData,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      ...profileData,
      birthDate: new Date(), // pastikan format untuk <input type="date">
    },
  });

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: UsersServices.updateUser,
    onSuccess: (res) => {
      toast.success("update user berhasil");
      queryClient.invalidateQueries({
        queryKey: ["user-detail"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: UpdateUserPayload) => {
    console.log("Profile updated:", data);
    updateUser(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const {
    formState: { errors, isDirty },
  } = form;

  console.log(errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Informasi Profil</CardTitle>
            {!isEditing ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={isPending}
                  type="button"
                  onClick={handleCancel}
                  className="cursor-pointer"
                >
                  <X className="w-4 h-4 mr-2" />
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isPending || !isDirty}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {getInitials(profileData?.name ?? "John Doe")}
                  </span>
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute hidden -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {profileData?.name ?? "John"}
                </h3>
                <p className="text-gray-600">
                  Member sejak{" "}
                  {formatDate({
                    date: new Date(profileData?.createdAt ?? new Date()),
                    show: "",
                  })}
                </p>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent hidden"
                  >
                    Ganti Foto
                  </Button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} className="mt-2" />
                      ) : (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          {field.value}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          {field.value}
                        </div>
                      ) : (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          {field.value}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} className="mt-2" />
                      ) : (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          {field.value}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Birth Date */}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Lahir</FormLabel>
                    {isEditing ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[100%] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div className="mt-2 p-2 bg-gray-50 rounded">
                        {field.value ? format(field.value, "PPP") : "-"}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <select
                          {...field}
                          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Pilih</option>
                          <option value="MALE">Laki-laki</option>
                          <option value="FEMALE">Perempuan</option>
                        </select>
                      ) : (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          {field.value
                            ? genderConfig[field.value as "MALE" | "FEMALE"]
                            : "-"}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CardProfileInformation;
