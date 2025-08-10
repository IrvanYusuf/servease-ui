import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import queryClient from "@/lib/queryClient";
import {
  createAddressPayload,
  createAddressSchema,
  updateAddressPayload,
} from "@/schema/address.schema";
import AddressesService from "@/services/address.service";
import { Address } from "@/types/address.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ModalNewAddressProps {
  editingAddress?: Address | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}

const ModalNewAddress: FC<ModalNewAddressProps> = ({
  editingAddress,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const form = useForm<createAddressPayload>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      city: "",
      description: "",
      district: "",
      label_alamat: "",
      phone: "",
      province: "",
      street_name: "",
    },
  });

  const { mutate: mutateCreateAddress, isPending } = useMutation({
    mutationFn: AddressesService.mutationCreateAddress,
    onSuccess: (res) => {
      toast.success("Berhasil tambah alamat");
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
      // Reset form dan tutup modal setelah berhasil
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: updateAddress, isPending: isPendingUpdateAddress } =
    useMutation({
      mutationFn: ({
        addressId,
        payload,
      }: {
        addressId: string;
        payload: updateAddressPayload;
      }) => AddressesService.updateAddress({ addressId, payload }),
      onSuccess: (res) => {
        toast.success("Berhasil update alamat");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
        setIsDialogOpen(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onSubmit = (data: createAddressPayload) => {
    if (editingAddress) {
      updateAddress({ addressId: editingAddress._id, payload: data });
    } else {
      mutateCreateAddress(data);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset form ketika modal ditutup
      form.reset({
        city: "",
        description: "",
        district: "",
        label_alamat: "",
        phone: "",
        province: "",
        street_name: "",
      });
    }
    setIsDialogOpen(open);
  };

  // Reset form ketika editingAddress berubah
  useEffect(() => {
    if (editingAddress) {
      form.reset({
        label_alamat: editingAddress.label_alamat,
        phone: editingAddress.phone,
        province: editingAddress.province,
        city: editingAddress.city,
        district: editingAddress.district,
        street_name: editingAddress.street_name,
        description: editingAddress.description,
      });
    } else {
      // Reset ke default values ketika editingAddress null
      form.reset({
        city: "",
        description: "",
        district: "",
        label_alamat: "",
        phone: "",
        province: "",
        street_name: "",
      });
    }
  }, [editingAddress, form]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="label_alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label Alamat*</FormLabel>
                    <FormControl>
                      <Input placeholder="Rumah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Hp*</FormLabel>
                    <FormControl>
                      <Input placeholder="081322567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi*</FormLabel>
                      <FormControl>
                        <Input placeholder="Sumatra Utara" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kabupaten/Kota*</FormLabel>
                      <FormControl>
                        <Input placeholder="Medan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kecamatan*</FormLabel>
                    <FormControl>
                      <Input placeholder="Medan Kota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan alamat lengkap, termasuk nama jalan, nomor rumah, kelurahan, kecamatan, kota/kabupaten"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi (opsional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masuk ke gang mawar"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleDialogClose(false)}
                  disabled={isPending || isPendingUpdateAddress}
                  className="cursor-pointer"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || isPendingUpdateAddress}
                  className="cursor-pointer"
                >
                  {isPending || isPendingUpdateAddress
                    ? "Loading..."
                    : editingAddress
                    ? "Simpan Perubahan"
                    : "Tambah Alamat"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalNewAddress;
