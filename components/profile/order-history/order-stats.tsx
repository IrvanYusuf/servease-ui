import { Card, CardContent } from "@/components/ui/card";
import { useBookingStatsStore } from "@/store/useBookingStatsStore";

const OrderStats = () => {
  const { totalBooking, totalBookingCompleted, totalNotReviewed } =
    useBookingStatsStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {totalBooking || 0}
          </div>
          <div className="text-sm text-gray-600">Total Booking</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {totalBookingCompleted || 0}
          </div>
          <div className="text-sm text-gray-600">Selesai</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {totalNotReviewed}
          </div>
          <div className="text-sm text-gray-600">Menunggu Ulasan</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStats;
