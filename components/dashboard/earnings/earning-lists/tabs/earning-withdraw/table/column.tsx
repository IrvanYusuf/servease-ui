import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Withdraw } from "@/types/dashboard/earning-dashboard.type";
import { statusWithdrawConfig } from "@/lib/config";
import RowDashboardWithdrawHistoryAction from "./row-action";

export const Columns: ColumnDef<Withdraw>[] = [
  {
    accessorKey: "_id",
    header: () => <div>Withdraw ID</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">#{row.original._id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div>Jumlah</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-green-600">
          Rp{row.original.amount.toLocaleString("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "received",
    header: () => <div>Tujuan</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-medium capitalize">{row.original.bank_name}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.account_number}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date_created",
    header: () => <div>Tanggal Permintaan</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {formatDate({ date: new Date(row.original.createdAt) })}
        </div>
      );
    },
  },
  {
    accessorKey: "date_approved",
    header: () => <div>Tanggal Diproses</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {row.original.approved_at
            ? formatDate({ date: new Date(row.original.approved_at) })
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "date_completed",
    header: () => <div>Tanggal Selesai</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {row.original.finished_at
            ? formatDate({ date: new Date(row.original.finished_at) })
            : "-"}
        </div>
      );
    },
  },

  {
    accessorKey: "admin_fee",
    header: () => <div>Biaya Admin</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm text-red-600 font-medium">
          Rp{row.original.admin_fee.toLocaleString("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const statusWithdraw = statusWithdrawConfig[row.original.status];
      const StatusIcon = statusWithdrawConfig[row.original.status].icon;
      return (
        <Badge className={statusWithdraw.color}>
          <StatusIcon
            className={row.original.status === "approved" ? "animate-spin" : ""}
          />
          {statusWithdraw.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Aksi</div>,
    cell: ({ row }) => {
      return <RowDashboardWithdrawHistoryAction row={row.original} />;
    },
  },
];
