import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import AddressesService from "@/services/address.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import CardAddress from "../card-address";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";

const ModalChangeAddress = () => {
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: AddressesService.getAllAddresses,
  });

  const { mutate: setPrimaryAddress, isPending } = useMutation({
    mutationFn: AddressesService.setPrimaryAddress,
    onSuccess: (res) => {
      toast.success("Berhasil ubah alamat utama");
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["primary-address"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSetPrimary = (addressId: string) => {
    setPrimaryAddress(addressId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          size={"sm"}
          className="cursor-pointer"
        >
          Ganti Alamat
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Alamat Saya</DialogTitle>
          <Separator />
          <DialogDescription>Pilih alamat utama Anda.</DialogDescription>
          {isLoading
            ? "loading"
            : addresses?.data.map((address, index) => (
                <div key={address._id} className="mb-3">
                  <CardAddress
                    address={address}
                    showAction={false}
                    handleSetPrimary={() => handleSetPrimary(address._id)}
                  />
                </div>
              ))}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="cursor-pointer">
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalChangeAddress;
