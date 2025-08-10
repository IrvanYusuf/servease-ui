"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { ArrowLeft, CircleCheck, Copy, Download, Share2 } from "lucide-react";
import { FC, Fragment, useState } from "react";
import { Booking } from "@/types/booking.type";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";
import { PATHS } from "@/lib/paths";

interface BookingDetailHeaderProps {
  bookingData: Booking;
}

const BookingDetailHeader: FC<BookingDetailHeaderProps> = ({ bookingData }) => {
  const [copy, setCopy] = useState<boolean>(false);

  const handleCopy = (payload: string | number) => {
    setCopy(true);
    copyToClipboard(payload);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <Link href={PATHS.dashboard.bookings.root} className="cursor-pointer">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail Booking</h1>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-gray-600 font-mono">#{bookingData._id}</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(bookingData._id)}
                  className="h-6 px-2 hover:bg-gray-100 cursor-pointer"
                >
                  {copy ? (
                    <CircleCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Booking ID</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 bg-transparent cursor-pointer"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 bg-transparent cursor-pointer"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default BookingDetailHeader;
