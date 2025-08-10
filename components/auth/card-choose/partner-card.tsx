import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PATHS } from "@/lib/paths";
import {
  ArrowRight,
  Briefcase,
  Shield,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface PartnerCardProps {
  setHoveredCard: (value: string | null) => void;
  hoveredCard: string | null;
}

const partnerFeatures = [
  {
    icon: TrendingUp,
    title: "Penghasilan Tambahan",
    description: "Dapatkan income hingga Rp 10 juta/bulan",
  },
  {
    icon: Users,
    title: "Akses Pelanggan Luas",
    description: "Ribuan pelanggan menunggu layanan Anda",
  },
  {
    icon: Wrench,
    title: "Fleksibilitas Waktu",
    description: "Atur jadwal kerja sesuai keinginan",
  },
  {
    icon: Shield,
    title: "Dukungan Penuh",
    description: "Training dan support dari tim kami",
  },
];

const partnerStats = [
  { number: "2K+", label: "Partner Aktif" },
  { number: "Rp 8M", label: "Rata-rata Income/Bulan" },
  { number: "95%", label: "Tingkat Kepuasan" },
];
const PartnerCard: FC<PartnerCardProps> = ({ hoveredCard, setHoveredCard }) => {
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 transform hover:scale-105 ${
        hoveredCard === "partner"
          ? "shadow-2xl ring-2 ring-purple-500"
          : "shadow-xl hover:shadow-2xl"
      }`}
      onMouseEnter={() => setHoveredCard("partner")}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-5" />
      <CardContent className="p-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Saya Partner
          </h2>
          <p className="text-gray-600 text-lg">
            Ingin menyediakan layanan perbaikan
          </p>
          <Badge className="mt-3 bg-purple-100 text-purple-800 hover:bg-purple-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            Peluang Bisnis
          </Badge>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {partnerFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
          {partnerStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stat.number}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link href={PATHS.auth.register.root("partner")}>
          <Button className="w-full h-14 cursor-pointer text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
            Daftar sebagai Partner
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        <p className="text-center text-sm text-gray-500 mt-4">
          Komisi kompetitif • Support penuh • Training gratis
        </p>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;
