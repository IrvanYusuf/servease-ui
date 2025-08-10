"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import queryClient from "@/lib/queryClient";
import DashboardPartnersServices from "@/services/dashboard/partner.service";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import { toast } from "sonner";

interface ModalDeletePartnerProps {
  partnerId: string;
  children: ReactNode;
}
export default function ModalDeletePartner({
  partnerId,
  children,
}: ModalDeletePartnerProps) {
  const { mutate: deletePartner, isPending } = useMutation({
    mutationFn: DashboardPartnersServices.deletePartner,
    onSuccess: () => {
      toast.success("Berhasil hapus partner");
      queryClient.invalidateQueries({
        queryKey: ["dashboard-partner-list"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    deletePartner({ partnerId });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menghapus seluruh data yang berkaitan dengan
            perusahaan secara permanen. Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
