import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Booking } from "@/types/booking.type";
import { Eye, MoreHorizontal } from "lucide-react";
import ModalDetailReview from "../modal/modal-detail-review";

const RowDashboardReviewAction = ({ row }: { row: Booking }) => {
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
          <ModalDetailReview booking={row}>
            <div className="cursor-pointer text-blue-600 flex items-center px-2">
              <Eye className="mr-4 h-4 w-4 text-blue-600" />
              Detail
            </div>
          </ModalDetailReview>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowDashboardReviewAction;
