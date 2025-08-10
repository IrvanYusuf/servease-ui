import CardTimeline from "@/components/timeline-common/card-timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/types/booking.type";

interface CardBookingTimelineProps {
  bookingData: Booking;
}

const CardBookingTimeline = ({ bookingData }: CardBookingTimelineProps) => {
  const bookingLabelConfig: Record<string, any> = {
    booked_at: "Melakukan Booking",
    confirmed_at: "Booking Dikonfirmasi",
    completed_at: "Booking Telah Selesai",
    payment_at: "Melakukan Pembayaran",
  };
  const tracker = bookingData?.timelinetracker?.tracker || {};

  if (bookingData.timelinetracker?.tracker.cancelled_at) {
    bookingLabelConfig.cancelled_at = "Booking Dibatalkan";
  }

  return (
    <Card>
      <CardContent>
        <CardTimeline tracker={tracker} labelConfig={bookingLabelConfig} />
      </CardContent>
    </Card>
  );
};

export default CardBookingTimeline;
