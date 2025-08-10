import DetailBooking from "@/components/profile/order-history/detail/detail-booking";

type Params = Promise<{ orderId: string }>;

const DetailBookingPage = async ({ params }: { params: Params }) => {
  const { orderId } = await params;
  return <DetailBooking bookingId={orderId} />;
};

export default DetailBookingPage;
