import { DashboardBookingList } from "@/components/dashboard/bookings/booking-list/dashboard-booking-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Management | Dashboard",
  description:
    "Manage and view all bookings, track booking status, filter by services, and monitor booking activities in your dashboard.",
  keywords:
    "booking management, dashboard, booking list, service bookings, booking status, booking tracking",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Booking Management | Dashboard",
    description:
      "Manage and view all bookings, track booking status, filter by services, and monitor booking activities in your dashboard.",
    type: "website",
    siteName: "Service Dashboard",
  },
  twitter: {
    card: "summary",
    title: "Booking Management | Dashboard",
    description:
      "Manage and view all bookings, track booking status, filter by services, and monitor booking activities in your dashboard.",
  },
};

const DashboardBookingPage = () => {
  return <DashboardBookingList />;
};

export default DashboardBookingPage;
