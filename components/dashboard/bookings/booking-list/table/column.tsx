import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  statusConfig,
  statusPaymentConfig,
  statusPaymentMethodConfig,
} from "@/lib/config";
import { cn } from "@/lib/utils";
import { Booking } from "@/types/booking.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import RowDashboardBookingAction from "./row-action";
import { Checkbox } from "@/components/ui/checkbox";

export const Columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
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
      return <div className="font-medium">{row.original.service_id.name}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const StatusIcon =
        statusConfig[row.original.status as keyof typeof statusConfig].icon;
      return (
        <Badge
          className={cn(
            "gap-1",
            statusConfig[row.original.status as keyof typeof statusConfig].color
          )}
        >
          <StatusIcon
            className={
              row.original.status === "confirmed" ? "animate-spin" : ""
            }
          />
          {statusConfig[row.original.status as keyof typeof statusConfig].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "booking_date",
    header: () => <div>Tanggal</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-medium">
            {format(new Date(row.original.booking_date), "MMM dd, yyyy")}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.booking_time}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div>Total Biaya</div>,
    cell: ({ row }) => {
      return (
        <div className="font-semibold">
          Rp{row.original.total_price.toLocaleString("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: () => <div>Status Pembayaran</div>,
    cell: ({ row }) => {
      return (
        <Badge
          className={
            statusPaymentConfig[
              row.original.payment_status as keyof typeof statusPaymentConfig
            ].color
          }
        >
          {
            statusPaymentConfig[
              row.original.payment_status as keyof typeof statusPaymentConfig
            ].label
          }
        </Badge>
      );
    },
  },
  {
    accessorKey: "payment_method_id",
    header: () => <div>Metode</div>,
    cell: ({ row }) => {
      return (
        <Badge
          className={
            statusPaymentMethodConfig[
              row.original.payment_method_id
                .type as keyof typeof statusPaymentMethodConfig
            ].color
          }
        >
          {row.original.payment_method_id.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Aksi</div>,
    cell: ({ row }) => {
      return <RowDashboardBookingAction row={row.original} />;
    },
  },
];
