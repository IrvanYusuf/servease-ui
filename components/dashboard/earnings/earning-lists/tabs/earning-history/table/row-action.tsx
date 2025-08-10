import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Earning } from "@/types/dashboard/earning-dashboard.type";
import { Eye, MoreHorizontal } from "lucide-react";
import { ModalEarningHistoryDetail } from "../modal/modal-earning-history-detail";

const RowDashboardEarningHistoryAction = ({ row }: { row: Earning }) => {
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
          <ModalEarningHistoryDetail data={row}>
            <div className="flex items-center w-full cursor-pointer px-2">
              <Eye className="mr-4 h-4 w-4 text-blue-600" />
              Detail
            </div>
          </ModalEarningHistoryDetail>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowDashboardEarningHistoryAction;
