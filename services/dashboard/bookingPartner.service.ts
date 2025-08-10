import { LIMIT } from "@/constants/constants";
import { ENDPOINTS } from "@/services/endpoints";
import axiosInstance from "@/lib/axios";
import {
  getAllPartnerBookingsParams,
  getTotalBookingParams,
} from "@/types/dashboard/booking-dashboard.type";
import { Booking, GetAllBookingsResponse } from "@/types/booking.type";
import { ApiResponse } from "@/types/api.type";
import { AnalyticsCountResponse } from "@/types/common.type";

const getAllPartnerBookings = async ({
  page = 1,
  limit = LIMIT,
  search = "",
  status = "",
  payment_status = "",
  date_from,
  date_to,
}: getAllPartnerBookingsParams): Promise<GetAllBookingsResponse> => {
  const params: Record<string, any> = { page, limit };

  if (status && status.trim() !== "" && status !== "all") {
    params.status = status;
  }
  if (
    payment_status &&
    payment_status.trim() !== "" &&
    payment_status !== "all"
  ) {
    params.payment_status = payment_status;
  }

  if (date_from) {
    params.from = date_from;
  }
  if (date_to) {
    params.to = date_to;
  }

  if (search && search.trim() !== "") {
    params.search = search;
  }
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.root,
    { params }
  );

  return response.data;
};

const confirmBooking = async ({
  customerId,
  bookingId,
}: {
  customerId: string;
  bookingId: string;
}): Promise<ApiResponse<Booking>> => {
  const response = await axiosInstance.patch(
    ENDPOINTS.dashboard.partners.bookings.confirm(customerId, bookingId)
  );
  return response.data;
};

const getTotalCompletedBooking = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalCompletedBooking
  );
  return response.data;
};

const getTotalCompletedBookingUser = async ({
  userId,
}: {
  userId: string;
}): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalCompletedBookingUser(userId)
  );
  return response.data;
};

const getTotalBooking = async ({
  range_date = "today",
}: getTotalBookingParams): Promise<AnalyticsCountResponse> => {
  const params = { range_date };
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalBooking,
    { params }
  );
  return response.data;
};

const getTotalRevenue = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalRevenue
  );
  return response.data;
};

const getTotalRevenuePending = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalRevenuePending
  );
  return response.data;
};

const getTotalMonthlyRevenue = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalMonthlyRevenue
  );
  return response.data;
};

const getTotalPendingBooking = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalPendingBooking
  );
  return response.data;
};

const getTotalCancelledBooking = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalCancelledBooking
  );
  return response.data;
};

const getTotalConfirmedBooking = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.bookings.totalConfirmedBooking
  );
  return response.data;
};

const DashboardPartnerBookingService = {
  getAllPartnerBookings,
  confirmBooking,
  getTotalCompletedBooking,
  getTotalBooking,
  getTotalRevenue,
  getTotalMonthlyRevenue,
  getTotalPendingBooking,
  getTotalCancelledBooking,
  getTotalConfirmedBooking,
  getTotalCompletedBookingUser,
  getTotalRevenuePending,
};

export default DashboardPartnerBookingService;
