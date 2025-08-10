"use client";

import {
  Building,
  Calendar,
  LayoutDashboard,
  Package,
  Star,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PATHS } from "@/lib/paths";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useUserStore } from "@/store/useUserStore";
import { useDashboardBookingStats } from "@/store/dashboard/useDashboardBookingStats";

const menuItems = ({
  totalBookingPending,
}: {
  totalBookingPending: number;
}) => [
  {
    href: PATHS.dashboard.root,
    icon: LayoutDashboard,
    label: "Dashboard",
    description: "Overview & Analytics",
  },
  {
    href: PATHS.dashboard.partners.root,
    icon: Building,
    label: "Partner",
    description: "Kelola perusahaan Anda",
  },
  {
    href: PATHS.dashboard.services.root,
    icon: Package,
    label: "Layanan",
    description: "kelola layanan untuk perusahaan Anda",
  },
  {
    href: PATHS.dashboard.bookings.root,
    icon: Calendar,
    label: "Booking",
    description: "Kelola booking masuk",
    badge: totalBookingPending ?? 0,
  },
  {
    href: PATHS.dashboard.earnings.root,
    icon: Wallet,
    label: "Pendapatan",
    description: "Laporan keuangan",
  },
  {
    href: PATHS.dashboard.reviews.root,
    icon: Star,
    label: "Ulasan",
    description: "Rating & feedback",
  },
];

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  isCollapse: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const DashboardSidebar: FC<DashboardSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isCollapse,
}) => {
  const pathname = usePathname();
  const partner = useUserStore((state) => state.user);
  const dashboardTotalBookingPending = useDashboardBookingStats(
    (state) => state.totalBookingPending
  );

  const dataBookingConfirmed = useDashboardBookingStats(
    (state) => state.totalBookingConfirmed
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-full ${
        isCollapse ? "w-24" : "w-72"
      } bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between w-full mb-6">
            <Link
              href="/"
              className={`flex items-center space-x-2 ${
                isCollapse && "w-full justify-center"
              }`}
            >
              <div className="w-8 h-8 bg-red-400 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RS</span>
              </div>
              {!isCollapse && (
                <span className="text-xl font-bold text-gray-900">Partner</span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="close-sidebar-btn"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Partner Info */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={partner?.profile_url || "/placeholder.png"}
                  alt={partner?.name ?? "John"}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  AT
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500`}
              />
            </div>
            {!isCollapse && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {partner?.name ?? "John"}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.9</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">
                    {dataBookingConfirmed ?? 0} jobs ongoing
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 space-y-1 w-full overflow-y-auto">
          {menuItems({
            totalBookingPending: dashboardTotalBookingPending ?? 0,
          }).map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            const menuContent = (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center justify-between py-3 px-5 transition-all duration-200 hover:bg-gray-50 group w-full ${
                  isActive ? "bg-blue-50 border-r-2 border-blue-600" : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div
                  className={`flex items-center ${
                    isCollapse && "justify-center"
                  } space-x-3 w-full`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      isActive ? "text-blue-600" : "text-gray-600"
                    }`}
                  />
                  {!isCollapse && (
                    <div>
                      <div
                        className={`font-medium ${
                          isActive ? "text-blue-600" : "text-gray-900"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div
                        className={`text-xs ${
                          isActive ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  )}
                </div>
                {!isCollapse && typeof item.badge !== "undefined" && (
                  <Badge className={`bg-red-100 text-red-800 text-xs`}>
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );

            // ✅ Jika collapse, wrap dengan tooltip
            return isCollapse ? (
              <Tooltip key={index}>
                <TooltipTrigger asChild>{menuContent}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              menuContent
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
