import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import queryClient from "@/lib/queryClient";
import AddressesService from "@/services/address.service";
import { Address } from "@/types/address.type";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Trash2 } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface ModalDeleteAddressProps {
  address: Address | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteAddress: FC<ModalDeleteAddressProps> = ({
  address,
  isOpen,
  onClose,
}) => {
  const { mutate: mutateDeleteAddress, isPending } = useMutation({
    mutationFn: (addressId: string) =>
      AddressesService.deleteAddress(addressId),
    onSuccess: () => {
      toast.success("Alamat berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Gagal menghapus alamat");
    },
  });

  const handleDelete = () => {
    if (address?._id) {
      mutateDeleteAddress(address._id);
    }
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Hapus Alamat
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Tindakan ini tidak dapat dibatalkan
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700 mb-4">
            Apakah Anda yakin ingin menghapus alamat ini?
          </p>

          {address && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {address.label_alamat}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Label
                  </span>
                </div>

                <p className="text-sm text-gray-600">{address.street_name}</p>

                <p className="text-sm text-gray-600">
                  {address.district}, {address.city}, {address.province}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>📞 {address.phone}</span>
                </div>

                {address.description && (
                  <p className="text-sm text-gray-500 italic">
                    {address.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1 cursor-pointer"
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 gap-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Hapus Alamat
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteAddress;
