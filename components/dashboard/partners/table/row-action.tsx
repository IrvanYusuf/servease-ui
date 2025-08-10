import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Partner } from "@/types/dashboard/partner-dashboard.type";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import ModalDeletePartner from "../modal/modal-delete-partner";

const RowDashboardPartnerAction = ({ row }: { row: Partner }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          <div className="cursor-pointer text-blue-600 flex items-center gap-2 px-2">
            <Eye className="h-4 w-4 text-blue-600" />
            Detail
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          <ModalDeletePartner partnerId={row._id}>
            <div className="cursor-pointer text-red-600 flex items-center gap-2 px-2">
              <Trash2 className="h-4 w-4 text-red-600" />
              Hapus
            </div>
          </ModalDeletePartner>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowDashboardPartnerAction;
