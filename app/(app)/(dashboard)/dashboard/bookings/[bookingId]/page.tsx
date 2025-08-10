import BookingDetailContent from "@/components/dashboard/bookings/detail/booking-detail-content";

type Params = Promise<{ bookingId: string }>;

const DashboardBookingDetailPage = async ({ params }: { params: Params }) => {
  const { bookingId } = await params;
  return <BookingDetailContent bookingId={bookingId} />;
};

export default DashboardBookingDetailPage;
