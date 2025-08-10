import { Card, CardContent } from "@/components/ui/card";
import { useBookingStatsStore } from "@/store/useBookingStatsStore";

const ProfileStatsOverview = () => {
  const { totalBooking, totalBookingCompleted, totalReviewed } =
    useBookingStatsStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            {totalReviewed}
          </div>
          <div className="text-sm text-gray-600">Ulasan Diberikan</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">2,500</div>
          <div className="text-sm text-gray-600">Poin Reward</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStatsOverview;
