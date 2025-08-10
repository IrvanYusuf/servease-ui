import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Partner } from "@/types/dashboard/partner-dashboard.type";
import RowDashboardPartnerAction from "./row-action";
import { formatDate } from "@/lib/utils";

export const Columns: ColumnDef<Partner>[] = [
  {
    accessorKey: "partner",
    header: () => <div>Partner</div>,
    cell: ({ row }) => {
      const partner = row.original;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 object-cover">
            <AvatarImage
              src={partner.profile_image || "/placeholder.png"}
              alt={partner.name}
            />
            <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{partner.name}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "province",
    header: () => <div>Provinsi</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">{row.original.province}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: () => <div>Kota</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">{row.original.city}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "district",
    header: () => <div>Kecamatan</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">{row.original.district}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "link_map",
    header: () => <div>Maps</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">{row.original.link_map}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "date_joined",
    header: () => <div>Bergabung Pada</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">
            {formatDate({ date: new Date(row.original.createdAt), show: "" })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Aksi</div>,
    cell: ({ row }) => {
      return <RowDashboardPartnerAction row={row.original} />;
    },
  },
];
