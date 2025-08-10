"use client";

import { Badge } from "@/components/ui/badge";
import ProfileStatsOverview from "./profile-stats-overview";
import CardProfileInformation from "./card-profile-information";
import CardProfileSecurity from "./card-profile-security";
import { useUserStore } from "@/store/useUserStore";

export default function ProfileOverview() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
          <p className="text-gray-600 mt-1">
            Kelola informasi profil dan preferensi akun Anda
          </p>
        </div>
        {user?.isVerified ? (
          <Badge className="bg-green-100 text-green-800">
            Akun Terverifikasi
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800">
            Akun Belum Terverifikasi
          </Badge>
        )}
      </div>

      {/* Stats Cards */}
      <ProfileStatsOverview />

      {/* Profile Information */}
      <CardProfileInformation profileData={user!} />

      {/* Account Security */}
      <CardProfileSecurity />
    </div>
  );
}
