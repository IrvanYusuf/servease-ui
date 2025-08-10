import { PATHS } from "@/lib/paths";
import { MapPin, ShoppingBag, Star, User } from "lucide-react";

export const menuItems = ({
  totalNotReviewed,
}: {
  totalNotReviewed: number;
}) => [
  {
    href: PATHS.profile.root,
    icon: User,
    label: "Profil Saya",
    description: "Kelola informasi profil",
  },
  {
    href: PATHS.profile.order.root,
    icon: ShoppingBag,
    label: "Riwayat Pemesanan",
    description: "Lihat semua pesanan",
  },
  {
    href: PATHS.profile.review.root,
    icon: Star,
    label: "Ulasan",
    description: "Kelola ulasan layanan",
    badge: totalNotReviewed,
  },
  {
    href: PATHS.profile.address.root,
    icon: MapPin,
    label: "Daftar Alamat",
    description: "Kelola alamat pengiriman",
  },
];
