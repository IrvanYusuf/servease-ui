import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FC, useState } from "react";
import { Calendar, Clock, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Booking } from "@/types/booking.type";
import { statusConfig, statusPaymentConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";

interface CardBookingDetailStatusProps {
  bookingData: Booking;
}

const CardBookingDetailStatus: FC<CardBookingDetailStatusProps> = ({
  bookingData,
}) => {
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const currentStatus =
    statusConfig[bookingData.status as keyof typeof statusConfig];
  const StatusIcon = currentStatus.icon;

  const paymentStatus =
    statusPaymentConfig[
      bookingData.payment_status as keyof typeof statusPaymentConfig
    ];

  const handleStatusUpdate = () => {
    console.log("Updating status to:", newStatus);
    setIsStatusUpdateOpen(false);
  };
  return (
    <Card>
      <CardContent className={`p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center ${currentStatus.color}`}
            >
              <StatusIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentStatus.label}
                </h2>
                <Badge className={currentStatus.color}>
                  {currentStatus.label}
                </Badge>
                <Badge className={paymentStatus.color}>
                  {paymentStatus.label}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate({
                    date: new Date(bookingData.booking_date),
                    show: "",
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {bookingData.booking_time} (2-3 Jam)
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Dialog
              open={isStatusUpdateOpen}
              onOpenChange={setIsStatusUpdateOpen}
            >
              <DialogTrigger asChild>
                {bookingData.status === "confirmed" &&
                bookingData.payment_method_id.type === "cash" ? (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Selesaikan
                  </Button>
                ) : (
                  bookingData.status === "pending" && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Konfirmasi
                    </Button>
                  )
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Status Booking</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Pilih Status Baru</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center">
                              <config.icon className="w-4 h-4 mr-2" />
                              {config.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsStatusUpdateOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button onClick={handleStatusUpdate}>Update Status</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBookingDetailStatus;
