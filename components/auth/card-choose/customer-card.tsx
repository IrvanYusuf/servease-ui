import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PATHS } from "@/lib/paths";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Home,
  Shield,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface CustomerCardProps {
  setHoveredCard: (value: string | null) => void;
  hoveredCard: string | null;
}

const customerStats = [
  { number: "50K+", label: "Pelanggan Aktif" },
  { number: "4.8", label: "Rating Rata-rata" },
  { number: "24/7", label: "Customer Support" },
];

const customerFeatures = [
  {
    icon: Clock,
    title: "Booking Mudah & Cepat",
    description: "Pesan layanan dalam hitungan menit",
  },
  {
    icon: Shield,
    title: "Teknisi Terverifikasi",
    description: "Semua teknisi telah melalui verifikasi ketat",
  },
  {
    icon: Star,
    title: "Rating & Review",
    description: "Lihat ulasan dari pelanggan lain",
  },
  {
    icon: CheckCircle,
    title: "Garansi Layanan",
    description: "Jaminan kualitas untuk setiap layanan",
  },
];

const CustomerCard: FC<CustomerCardProps> = ({
  hoveredCard,
  setHoveredCard,
}) => {
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 transform hover:scale-105 ${
        hoveredCard === "customer"
          ? "shadow-2xl ring-2 ring-blue-500"
          : "shadow-xl hover:shadow-2xl"
      }`}
      onMouseEnter={() => setHoveredCard("customer")}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5" />
      <CardContent className="p-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Saya Pelanggan
          </h2>
          <p className="text-gray-600 text-lg">
            Butuh layanan perbaikan profesional
          </p>
          <Badge className="mt-3 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Home className="w-3 h-3 mr-1" />
            Untuk Kebutuhan Rumah
          </Badge>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {customerFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-blue-600" />
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
          {customerStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stat.number}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link href={PATHS.auth.register.root("user")}>
          <Button className="w-full h-14 cursor-pointer text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
            Daftar sebagai Pelanggan
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        <p className="text-center text-sm text-gray-500 mt-4">
          Gratis selamanya • Tanpa biaya tersembunyi
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
