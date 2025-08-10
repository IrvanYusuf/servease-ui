import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, Users } from "lucide-react";

const CardPerformanceMetrics = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Waktu Respons</h3>
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">15 menit</div>
          <p className="text-sm text-gray-600">
            Rata-rata respons ke pelanggan
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Target: 30 menit</span>
              <span>50% lebih cepat</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Pelanggan Puas</h3>
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
          <p className="text-sm text-gray-600">Rating 4+ dari pelanggan</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Target: 90%</span>
              <span>+4% dari target</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Repeat Customer</h3>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">68%</div>
          <p className="text-sm text-gray-600">Pelanggan yang memesan lagi</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Target: 60%</span>
              <span>+8% dari target</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardPerformanceMetrics;
