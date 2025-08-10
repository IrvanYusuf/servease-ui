import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyDataProps {
  message?: string;
  desc?: string;
  cta?: string;
  icon: LucideIcon;
  href?: string;
  showButton?: boolean;
}

const EmptyData = ({
  cta = "Pesan Layanan",
  desc = "Anda belum memiliki pesanan dalam kategori ini",
  message = "Belum ada pesanan",
  icon: Icon,
  href = "/",
  showButton = true,
}: EmptyDataProps) => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Icon className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
        {showButton && (
          <Link href={href}>
            <Button>{cta}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyData;
