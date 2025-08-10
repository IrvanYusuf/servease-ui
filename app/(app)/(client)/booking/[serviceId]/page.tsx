import BookingForm from "@/components/booking/booking-form";

type Params = Promise<{ serviceId: string }>;
export default async function BookingPage({ params }: { params: Params }) {
  const { serviceId } = await params;
  return (
    <div>
      <BookingForm serviceId={serviceId} />
    </div>
  );
}
