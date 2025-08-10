"use client";

import { Card, CardContent } from "@/components/ui/card";
import ModalNewAddress from "./modal/modal-new-address";
import { useMutation, useQuery } from "@tanstack/react-query";
import AddressesService from "@/services/address.service";
import CardAddress from "@/components/card-address";
import { toast } from "sonner";
import SkeletonCardAlamat from "./skeleton/skeleton-card-alamat";
import queryClient from "@/lib/queryClient";
import { useState } from "react";
import { Address } from "@/types/address.type";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalDeleteAddress from "./modal/modal-delete-address";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyData from "@/components/empty-data";

export default function AddressManagement() {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State untuk dialog delete
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  // Handler untuk buka dialog delete
  const handleDeleteClick = (address: Address) => {
    setDeletingAddress(address);
    setIsDeleteDialogOpen(true);
  };

  // Handler untuk tutup dialog delete
  const handleDeleteClose = () => {
    setDeletingAddress(null);
    setIsDeleteDialogOpen(false);
  };

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
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSetPrimary = (addressId: string) => {
    setPrimaryAddress(addressId);
  };

  const dataAddresses = addresses?.data || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Daftar Alamat (max: 3)
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola alamat untuk layanan booking
          </p>
        </div>
        {isLoading ? (
          <Skeleton className="h-8 w-28" />
        ) : (
          <Button
            className="cursor-pointer"
            onClick={() => {
              setEditingAddress(null); // reset form
              setIsDialogOpen(true); // buka modal
            }}
            disabled={addresses!.data.length >= 3 ? true : false}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Alamat
          </Button>
        )}
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {isLoading ? (
          <SkeletonCardAlamat />
        ) : dataAddresses.length > 0 ? (
          dataAddresses.map((address, index) => (
            <div key={address._id} className="mb-3">
              <CardAddress
                address={address}
                handleSetPrimary={() => handleSetPrimary(address._id)}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteClick}
              />
            </div>
          ))
        ) : (
          <EmptyData
            message="Belum ada alamat"
            desc="Anda belum memiliki alamat yang tersimpan"
            icon={Plus}
            showButton={false}
          />
        )}
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-medium text-blue-900 mb-2">
            💡 Tips Mengelola Alamat
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • Pastikan alamat lengkap dan akurat untuk memudahkan teknisi
              menemukan lokasi
            </li>
            <li>• Sertakan patokan atau landmark terdekat jika diperlukan</li>
            <li>• Gunakan alamat utama untuk pemesanan yang lebih cepat</li>
            <li>• Perbarui nomor telepon anda jika ada perubahan</li>
          </ul>
        </CardContent>
      </Card>
      <ModalNewAddress
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={(val) => {
          setIsDialogOpen(val);
          if (!val) setEditingAddress(null);
        }}
        editingAddress={editingAddress}
      />
      <ModalDeleteAddress
        address={deletingAddress}
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteClose}
      />
    </div>
  );
}
