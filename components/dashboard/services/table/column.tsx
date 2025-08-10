import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate, truncateText } from "@/lib/utils";
import { Service } from "@/types/service.type";
import RowDashboardServiceAction from "./row-action";

export const Columns: ColumnDef<Service>[] = [
  {
    accessorKey: "service",
    header: () => <div>Service</div>,
    cell: ({ row }) => {
      const service = row.original;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={service.thumbnail || "/placeholder.png"}
              alt={service.name}
            />
            <AvatarFallback>{service.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {/* {row.original.user_id.name} • {row.original.user_id.email} */}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price_service",
    header: () => <div>Harga Layanan</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">
            Rp{row.original.price.toLocaleString("id")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div>Kategori</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">{row.original.category_id.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "partner",
    header: () => <div>Perusahaan</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">{row.original.partner_id.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div>Deskripsi</div>,
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <div className="font-semibold">
            {truncateText({ length: 40, text: row.original.description })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Dibuat Pada</div>,
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
      return <RowDashboardServiceAction row={row.original} />;
    },
  },
];
