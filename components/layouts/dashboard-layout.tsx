"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Bell, Menu, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { useUserStore } from "@/store/useUserStore";
import { useDashboardBookingStats } from "@/store/dashboard/useDashboardBookingStats";
import { useQuery } from "@tanstack/react-query";
import DashboardPartnerBookingService from "@/services/dashboard/bookingPartner.service";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const partner = useUserStore((state) => state.user);
  const setDashboardTotalBookingPending = useDashboardBookingStats(
    (state) => state.setTotalBookingPending
  );
  const setDashboardTotalBookingCompleted = useDashboardBookingStats(
    (state) => state.setTotalBookingCompleted
  );
  const setDashboardTotalBookingConfirmed = useDashboardBookingStats(
    (state) => state.setTotalBookingConfirmed
  );
  const setDashboardTotalAllRevenue = useDashboardBookingStats(
    (state) => state.setTotalAllRevenue
  );

  const { data: dataDashboardTotalPendingBooking } = useQuery({
    queryKey: ["dashboard-total-pending"],
    queryFn: DashboardPartnerBookingService.getTotalPendingBooking,
  });

  const { data: totalBookingCompleted } = useQuery({
    queryKey: ["total-completed-bookings"],
    queryFn: DashboardPartnerBookingService.getTotalCompletedBooking,
  });

  const { data: totalRevenue } = useQuery({
    queryKey: ["total-revenue"],
    queryFn: DashboardPartnerBookingService.getTotalRevenue,
  });

  const { data: dataBookingConfirmed } = useQuery({
    queryKey: ["dashboard-booking-confirmed"],
    queryFn: DashboardPartnerBookingService.getTotalConfirmedBooking,
  });

  useEffect(() => {
    if (dataDashboardTotalPendingBooking?.data !== undefined) {
      setDashboardTotalBookingPending(dataDashboardTotalPendingBooking.data);
    }
  }, [setDashboardTotalBookingPending, dataDashboardTotalPendingBooking]);

  useEffect(() => {
    if (totalBookingCompleted?.data !== undefined) {
      setDashboardTotalBookingCompleted(totalBookingCompleted.data);
    }
  }, [setDashboardTotalBookingCompleted, totalBookingCompleted]);

  useEffect(() => {
    if (dataBookingConfirmed?.data !== undefined) {
      setDashboardTotalBookingConfirmed(dataBookingConfirmed.data);
    }
  }, [
    setDashboardTotalBookingCompleted,
    totalBookingCompleted,
    dataBookingConfirmed?.data,
    setDashboardTotalBookingConfirmed,
  ]);

  useEffect(() => {
    if (totalRevenue?.data !== undefined) {
      setDashboardTotalAllRevenue(totalRevenue.data);
    }
  }, [setDashboardTotalAllRevenue, totalRevenue]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        isCollapse={isCollapse}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`${
          isCollapse ? "lg:ml-24" : "lg:ml-72"
        } transform transition-all duration-300`}
      >
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="menu-mobile-btn"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center space-x-3">
                  <button
                    className="cursor-pointer hidden lg:block"
                    onClick={() => setIsCollapse(!isCollapse)}
                    aria-label="is-collapse-btn"
                  >
                    <PanelLeft />
                  </button>
                  <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                    Dashboard Partner
                  </h1>
                </div>
                <p className="text-gray-600 hidden md:block">
                  Selamat datang kembali, {partner?.name ?? "John"}!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-green-500`} />
                <span className="text-sm font-medium text-gray-700 capitalize">
                  Online
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
