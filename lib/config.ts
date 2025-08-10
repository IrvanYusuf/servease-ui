import { Calendar } from "@/components/ui/calendar";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader,
  X,
  XCircle,
} from "lucide-react";

export const statusConfig = {
  completed: {
    label: "Selesai",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  confirmed: {
    label: "Berlangsung",
    color: "bg-blue-100 text-blue-800",
    icon: Loader,
  },
  pending: {
    label: "Menunggu Konfirmasi",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  cancelled: {
    label: "Dibatalkan",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export const statusPaymentConfig = {
  paid: {
    label: "Sudah Dibayar",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  unpaid: {
    label: "Belum Dibayar",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
};

export const statusWithdrawConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    icon: Clock,
  },
  approved: {
    label: "Dikonfirmasi",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    icon: Loader,
  },
  completed: {
    label: "Selesai",
    color: "bg-green-100 text-green-800 hover:bg-green-100",
    icon: CheckCircle,
  },
  rejected: {
    label: "Ditolak",
    color: "bg-red-100 text-red-800 hover:bg-red-100",
    icon: X,
  },
};

export const statusPaymentMethodConfig = {
  cash: {
    label: "Tunai",
    color: "bg-blue-100 text-blue-800",
  },
  bank_transfer: {
    label: "Transfer Bank",
    color: "bg-purple-100 text-purple-800",
  },
};

export const statusReviewConfig = {
  reviewed: { label: "Sudah Direview", color: "bg-purple-100 text-purple-800" },
  not_reviewed: {
    label: "Belum Direview",
    color: "bg-yellow-100 text-yellow-800",
  },
};

export const genderConfig = {
  MALE: "Laki-laki",
  FEMALE: "Perempuan",
};

export const statusConfigDashboardInfo = {
  scheduled: {
    label: "Terjadwal",
    color: "bg-blue-100 text-blue-800",
    icon: Calendar,
  },
  in_progress: {
    label: "Berlangsung",
    color: "bg-yellow-100 text-yellow-800",
    icon: Loader,
  },
  pending: {
    label: "Menunggu",
    color: "bg-gray-100 text-gray-800",
    icon: AlertCircle,
  },
  completed: {
    label: "Selesai",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
};
