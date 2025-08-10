"use client";
import { Button } from "@/components/ui/button";
import DashboardPartnerServicesService from "@/services/dashboard/servicePartner.service";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

const OverviewWelcome = () => {
  const { data: dataCountServices, isLoading } = useQuery({
    queryKey: ["count-services"],
    queryFn: DashboardPartnerServicesService.getTotalServices,
  });
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold mb-2">
              Selamat Datang Kembali! 👋
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              Anda memiliki 3 pesanan baru hari ini. Mari kita tingkatkan
              performa bisnis Anda!
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">
                  {dataCountServices?.data ?? 0}
                </div>
                <div className="text-sm text-blue-100">Jumlah Layanan</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-blue-100">Completion</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">15m</div>
                <div className="text-sm text-blue-100">Response</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
              Lihat Pesanan Baru
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              Update Profil
            </Button>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
    </div>
  );
};

export default OverviewWelcome;
