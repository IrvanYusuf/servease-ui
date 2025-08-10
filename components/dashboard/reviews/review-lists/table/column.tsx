import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Hourglass, Star } from "lucide-react";
import { Booking } from "@/types/booking.type";
import RowDashboardReviewAction from "./row-action";

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
    header: () => <div>Review ID</div>,
    cell: ({ row }) => {
      const review = row.original.review_id;

      return (
        <div className="flex items-center gap-2">
          {review ? (
            <p className="font-medium text-sm">{review._id}</p>
          ) : (
            <>
              <Hourglass className="h-4 w-4 text-orange-500 animate-pulse" />
              <span className="text-sm text-muted-foreground italic">
                Belum di-review oleh customer
              </span>
            </>
          )}
        </div>
      );
    },
  },
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
      return <div className="font-medium">{row.original.service_id.name}</div>;
    },
  },
  {
    accessorKey: "partner_id",
    header: () => <div>Nama Perusahaan</div>,
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium text-sm">{row.original.partner_id.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: () => <div>Review</div>,
    cell: ({ row }) => {
      const review = row.original.review_id;

      return (
        <div className="flex items-center gap-2">
          {review ? (
            <p className="font-medium text-sm">{review.comment}</p>
          ) : (
            <>
              <Hourglass className="h-4 w-4 text-orange-500 animate-pulse" />
              <span className="text-sm text-muted-foreground italic">
                Belum di-review oleh customer
              </span>
            </>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "review_rating",
    header: () => <div>Rating</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400 fill-yellow-400 h-4 w-4" />
          <span className="text-sm font-medium">
            {row.original?.review_id?.rating ?? "-"}
          </span>
        </div>
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
            {row.original.review_id?.createdAt
              ? format(
                  new Date(row.original.review_id?.createdAt),
                  "MMM dd, yyyy"
                )
              : "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Aksi</div>,
    cell: ({ row }) => {
      return <RowDashboardReviewAction row={row.original} />;
    },
  },
];
