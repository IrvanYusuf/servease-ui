import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import {
  GetAllBookingsResponse,
  GetAllBookingsParams,
  GetDetailBooking,
} from "@/types/booking.type";
import { getTotalBookingParams } from "@/types/dashboard/booking-dashboard.type";
import { ApiResponse } from "@/types/api.type";
import { AnalyticsCountResponse } from "@/types/common.type";
const mutationCreateBooking = async (payload: any) => {
  const response = await axiosInstance.post(ENDPOINTS.bookings.root, payload);
  return response.data;
};

const getAllBookings = async ({
  status = "",
  review_status,
  page = 1,
  limit = 10,
}: GetAllBookingsParams): Promise<GetAllBookingsResponse> => {
  const params: Record<string, any> = { page, limit };

  if (status && status.trim() !== "" && status !== "all") {
    params.status = status;
  }

  if (review_status && review_status.trim() !== "" && review_status !== "all") {
    params.review_status = review_status;
  }

  const response = await axiosInstance.get(ENDPOINTS.bookings.root, { params });
  return response.data;
};

const getDetailBooking = async (
  bookingId: string
): Promise<GetDetailBooking> => {
  const response = await axiosInstance.get(
    `${ENDPOINTS.bookings.detail(bookingId)}`
  );
  return response.data;
};

const uploadPaymentProof = async (bookingId: string, payload: FormData) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.bookings.uploadPaymentProof(bookingId),
    payload
  );

  return response.data;
};

const completeBooking = async ({
  bookingId,
  paymentStatus,
}: {
  bookingId: string;
  paymentStatus: string;
}) => {
  const params: Record<string, any> = {};
  if (paymentStatus && paymentStatus.trim() !== "") {
    params.payment_status = paymentStatus;
  }

  const response = await axiosInstance.patch(
    ENDPOINTS.bookings.completeBooking(bookingId),
    params
  );

  return response.data;
};

const getTotalBooking = async ({
  range_date = "all",
}: getTotalBookingParams): Promise<AnalyticsCountResponse> => {
  const params = { range_date };
  const response = await axiosInstance.get(ENDPOINTS.bookings.totalBooking, {
    params,
  });
  return response.data;
};

const getTotalCompletedBooking = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.bookings.totalBookingCompleted
  );
  return response.data;
};

const getTotalBookingNotReviewed =
  async (): Promise<AnalyticsCountResponse> => {
    const response = await axiosInstance.get(
      ENDPOINTS.bookings.totalBookingNotReviewed
    );
    return response.data;
  };

const BookingsServices = {
  mutationCreateBooking,
  getAllBookings,
  getDetailBooking,
  uploadPaymentProof,
  completeBooking,
  getTotalBooking,
  getTotalCompletedBooking,
  getTotalBookingNotReviewed,
};

export default BookingsServices;
