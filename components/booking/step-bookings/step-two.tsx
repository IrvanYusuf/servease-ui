"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import CardAddress from "@/components/card-address";
import ModalChangeAddress from "@/components/modal/modal-ganti-alamat";
import { User } from "@/types/user.type";
import { FC } from "react";
import { Address } from "@/types/address.type";
import EmptyData from "@/components/empty-data";
import { Plus } from "lucide-react";
import { PATHS } from "@/lib/paths";

interface StepTwoProps {
  isLoading?: boolean;
  dataUser: User;
  dataPrimaryAddress: Address | null;
  isLoadingPrimaryAddres: boolean;
}
const StepTwo: FC<StepTwoProps> = ({
  isLoading,
  dataUser,
  dataPrimaryAddress,
  isLoadingPrimaryAddres,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nama Lengkap *</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              id="name"
              value={dataUser.name || ""}
              readOnly
              placeholder="Masukkan nama lengkap"
              className="mt-2"
            />
          )}
        </div>
        <div>
          <Label htmlFor="phone">Nomor Telepon *</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              id="phone"
              value={dataUser.phone || ""}
              readOnly
              placeholder="08xxxxxxxxxx"
              className="mt-2"
            />
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Input
            id="email"
            type="email"
            value={dataUser.email || ""}
            readOnly
            placeholder="email@example.com"
            className="mt-2"
          />
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <Label htmlFor="address">Alamat Lengkap *</Label>
          {dataPrimaryAddress && <ModalChangeAddress />}
        </div>
        {isLoadingPrimaryAddres ? (
          <Skeleton className="h-[150px] w-full rounded-xl" />
        ) : dataPrimaryAddress ? (
          <CardAddress address={dataPrimaryAddress} showAction={false} />
        ) : (
          <EmptyData
            message="Belum ada alamat"
            desc="Anda belum memiliki alamat yang tersimpan"
            icon={Plus}
            cta="Tambah Alamat"
            href={PATHS.profile.address.root}
          />
        )}
      </div>
    </div>
  );
};

export default StepTwo;
