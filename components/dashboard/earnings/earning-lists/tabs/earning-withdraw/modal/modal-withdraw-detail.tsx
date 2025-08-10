import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { statusWithdrawConfig } from "@/lib/config";
import { Withdraw } from "@/types/dashboard/earning-dashboard.type";
import { CreditCard, DollarSign, FileText, Hash, User } from "lucide-react";
import { ReactNode, useState } from "react";
import CardTimeline from "@/components/timeline-common/card-timeline";
import { Button } from "@/components/ui/button";

interface ModalWithdrawDetailProps {
  withdraw: Withdraw | null;
  children: ReactNode;
}

const ModalWithdrawDetail = ({
  withdraw,
  children,
}: ModalWithdrawDetailProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!withdraw) return null;

  const statusConfig = statusWithdrawConfig[withdraw.status];
  const StatusIcon = statusConfig.icon;

  // Menghitung total yang diterima
  const totalReceived = withdraw.amount - withdraw.admin_fee;

  const withdrawLabelConfig = {
    created_at: "Melakukan Request Penarikan Dana",
    approved_at: "Penarikan Dana Dikonfirmasi",
    rejected_at: "Penarikan Dana Ditolak",
    cancelled_at: "Penarikan Dana Dibatalkan",
    finished_at: "Penarikan Selesai",
  };

  const tracker = {
    created_at: withdraw?.created_at,
    approved_at: withdraw?.approved_at,
    rejected_at: withdraw?.rejected_at,
    cancelled_at: withdraw?.cancelled_at,
    finished_at: withdraw?.finished_at,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detail Penarikan Dana
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status dan ID */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  ID Penarikan
                </div>
                <Badge className={statusConfig.color}>
                  <StatusIcon
                    className={`h-3 w-3 mr-1 ${
                      withdraw.status === "approved" ? "animate-spin" : ""
                    }`}
                  />
                  {statusConfig.label}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-sm text-muted-foreground">
                #{withdraw._id}
              </p>
            </CardContent>
          </Card>

          {/* Informasi Keuangan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Informasi Keuangan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Jumlah Penarikan
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    Rp{withdraw.amount.toLocaleString("id")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Biaya Admin</p>
                  <p className="text-lg font-semibold text-red-600">
                    Rp{withdraw.admin_fee.toLocaleString("id")}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Total Diterima</p>
                <p className="text-2xl font-bold text-blue-600">
                  Rp{totalReceived.toLocaleString("id")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Informasi Bank */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Informasi Rekening Tujuan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Bank</p>
                  <p className="font-semibold capitalize">
                    {withdraw.bank_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Nomor Rekening
                  </p>
                  <p className="font-mono">{withdraw.account_number}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Nama Pemilik Rekening
                </p>
                <p className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {withdraw.account_name}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <CardTimeline tracker={tracker} labelConfig={withdrawLabelConfig} />

          {/* Catatan (jika ada) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Catatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {withdraw.notes?.trim() ? withdraw.notes : "-"}
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Close Button */}
        <div className="flex justify-end pt-4">
          <Button
            className="cursor-pointer"
            variant="outline"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWithdrawDetail;
