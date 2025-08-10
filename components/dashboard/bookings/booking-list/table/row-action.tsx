import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PATHS } from "@/lib/paths";
import { Booking } from "@/types/booking.type";
import { CheckCircle, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import DialogCompletedBooking from "./dialog/dialog-completed-booking";
import DialogConfirmedBooking from "./dialog/dialog-confirmed-booking";

const RowDashboardBookingAction = ({ row }: { row: Booking }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href={PATHS.dashboard.bookings.detail(row._id)}
            className="text-blue-600 cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4 text-blue-600" />
            View Details
          </Link>
        </DropdownMenuItem>

        {row.status !== "completed" && row.payment_status !== "paid" && (
          <Fragment>
            {row.status === "pending" ? (
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-green-600 cursor-pointer"
              >
                <DialogConfirmedBooking bookingData={row}>
                  <div className="flex items-center">
                    <CheckCircle className="mr-4 h-4 w-4 text-green-600" />
                    Konfirmasi Booking
                  </div>
                </DialogConfirmedBooking>
              </DropdownMenuItem>
            ) : (
              <Fragment>
                {row.payment_method_id.type === "cash" &&
                  row.status === "confirmed" && (
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-green-600 cursor-pointer"
                    >
                      <DialogCompletedBooking bookingData={row}>
                        <div className="text-green-600 cursor-pointer flex items-center">
                          <CheckCircle className="mr-4 h-4 w-4 text-green-600" />
                          Selesaikan Booking
                        </div>
                      </DialogCompletedBooking>
                    </DropdownMenuItem>
                  )}
              </Fragment>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              Cancel Booking
            </DropdownMenuItem>
          </Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowDashboardBookingAction;
