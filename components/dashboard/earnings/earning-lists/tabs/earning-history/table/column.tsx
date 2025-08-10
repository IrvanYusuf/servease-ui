import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Earning } from "@/types/dashboard/earning-dashboard.type";
import RowDashboardEarningHistoryAction from "./row-action";
import { statusConfig } from "@/lib/config";

export const Columns: ColumnDef<Earning>[] = [
  {
    accessorKey: "booking_id",
    header: () => <div>Booking ID</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">#{row.original._id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "avatar_user",
    header: () => <div>Customer</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row.original.user_id.profile_url || "/placeholder.png"}
              alt={row.original.user_id.name}
            />
            <AvatarFallback>
              {row.original.user_id.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">{row.original.user_id.name}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.user_id.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "service_id",
    header: () => <div>Service</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-medium">{row.original.service_id.name}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.service_id.category_id.name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div>Tanggal</div>,
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {formatDate({ date: new Date(row.original.createdAt) })}
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: () => <div>Total</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-green-600 font-medium">
          Rp{row.original.total_price.toLocaleString("id")}
        </div>
      );
    },
  },

  {
    accessorKey: "app_cost",
    header: () => <div>Biaya Aplikasi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-red-600 font-medium">
          Rp{row.original.app_cost.toLocaleString("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "pendapatan",
    header: () => <div>Pendapatan</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-green-600 font-medium">
          Rp{row.original.sub_total.toLocaleString("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = statusConfig[row.original.status];
      const StatusIcon = statusConfig[row.original.status].icon;
      return (
        <Badge className={status.color}>
          <StatusIcon
            className={
              row.original.status === "confirmed" ? "animate-spin" : ""
            }
          />
          {status.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Aksi</div>,
    cell: ({ row }) => {
      return <RowDashboardEarningHistoryAction row={row.original} />;
    },
  },
];
