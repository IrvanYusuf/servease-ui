"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookingsServices from "@/services/booking.service";
import { useQuery } from "@tanstack/react-query";
import { useBookingStatsStore } from "@/store/useBookingStatsStore";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import AuthGuard from "../guard/auth-guard";
import { PATHS } from "@/lib/paths";
import { menuItems } from "@/components/profile/menu-items";
import { useUserStore } from "@/store/useUserStore";
import ReviewsServices from "@/services/review.service";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const user = useUserStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const setTotal = useBookingStatsStore((state) => state.setTotalBooking);
  const setCompleted = useBookingStatsStore(
    (state) => state.setTotalBookingCompleted
  );
  const totalBookingsNotReviewed = useBookingStatsStore(
    (state) => state.totalNotReviewed
  );

  const setTotalReviewed = useBookingStatsStore(
    (state) => state.setTotalReviewed
  );
  const pathname = usePathname();
  const router = useRouter();

  const { data: totalBookings, isLoading: isLoadingTotalBooking } = useQuery({
    queryKey: ["total-booking"],
    queryFn: () => BookingsServices.getTotalBooking({ range_date: "all" }),
  });

  const {
    data: totalBookingsCompleted,
    isLoading: isLoadingTotalBookingCompleted,
  } = useQuery({
    queryKey: ["total-booking-completed"],
    queryFn: BookingsServices.getTotalCompletedBooking,
  });

  const { data: totalBookingReviewed } = useQuery({
    queryKey: ["total-reviewed"],
    queryFn: ReviewsServices.getTotalReviewed,
  });

  const handleLogout = () => {
    // Handle logout logic here
    logOut();
    router.push(PATHS.auth.login);
  };

  useEffect(() => {
    if (totalBookings?.data !== undefined) {
      setTotal(totalBookings.data);
    }
  }, [totalBookings, setTotal]);

  useEffect(() => {
    if (totalBookingsCompleted?.data !== undefined) {
      setCompleted(totalBookingsCompleted.data);
    }
  }, [totalBookingsCompleted, setCompleted]);

  useEffect(() => {
    if (totalBookingReviewed?.data !== undefined) {
      setTotalReviewed(totalBookingReviewed.data);
    }
  }, [totalBookingReviewed, setTotalReviewed]);

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sidebar Content */}
            <div
              className={`space-y-6 ${
                isMobileMenuOpen ? "block" : "hidden lg:block"
              }`}
            >
              {/* User Info Card */}
              <Card>
                <CardContent className="p-6 text-center flex justify-center items-center flex-col w-full">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">
                      {getInitials(user?.name ?? "John Doe")}
                    </span>
                  </div>
                  {user?.name ? (
                    <h3 className="font-semibold text-lg mb-1">
                      {user?.name ?? ""}
                    </h3>
                  ) : (
                    <Skeleton className="h-4 w-[70%] mb-2" />
                  )}

                  {user?.email ? (
                    <p className="text-gray-600 text-sm mb-2">
                      {user?.email ?? ""}
                    </p>
                  ) : (
                    <Skeleton className="h-4 w-[50%] mb-2" />
                  )}

                  {user?.isVerified ? (
                    <Badge className="bg-green-100 text-green-800">
                      Member Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">
                      Member Tidak Verified
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Navigation Menu */}
              <Card>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {menuItems({
                      totalNotReviewed: totalBookingsNotReviewed ?? 0,
                    }).map((item) => {
                      const IconComponent = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                            isActive
                              ? "bg-blue-50 border-r-2 border-blue-600"
                              : ""
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent
                              className={`w-5 h-5 ${
                                isActive ? "text-blue-600" : "text-gray-600"
                              }`}
                            />
                            <div>
                              <div
                                className={`font-medium ${
                                  isActive ? "text-blue-600" : "text-gray-900"
                                }`}
                              >
                                {item.label}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                          {item.badge && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex space-x-3 p-4 hover:bg-red-50 transition-colors text-red-600 items-center cursor-pointer"
                    >
                      <LogOut className="w-5 h-5" />
                      <div>
                        <div className="font-medium text-left">Keluar</div>
                        <div className="text-xs text-red-500">
                          Logout dari akun
                        </div>
                      </div>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
