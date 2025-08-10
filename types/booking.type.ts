import { CreateBookingPayload } from "@/schema/booking.schema";
import { Address } from "./address.type";
import { Service } from "./service.type";
import { Partner } from "@/types/dashboard/partner-dashboard.type";
import { PaymentMethod } from "./payment-method.type";
import { ApiResponse, PaginatedResponse } from "./api.type";
import { TimelineTracker } from "./timeline-tracker.type";
import { User } from "./user.type";
import { Review } from "./review.type";

export enum STATUS {
  pending = "pending",
  confirmed = "confirmed",
  cancelled = "cancelled",
  completed = "completed",
}

export enum PAYMENT_STATUS {
  paid = "paid",
  unpaid = "unpaid",
}

export enum REVIEW_STATUS {
  reviewed = "reviewed",
  not_reviewed = "not_reviewed",
}

export interface Booking {
  _id: string;
  user_id: User;
  service_id: Service;
  partner_id: Partner;
  owner_id: User;
  address_id: Address;
  payment_method_id: PaymentMethod;
  payment_status: PAYMENT_STATUS;
  payment_due: string;
  status: STATUS;
  total_price: number;
  sub_total: number;
  app_cost: number;
  booking_date: string;
  booking_time: string;
  bring_ladder: boolean;
  review_status: REVIEW_STATUS;
  review_id?: Review;
  __v: number;
  createdAt: string;
  updatedAt: string;
  timelinetracker?: TimelineTracker;
  notes?: string;
}

export interface MutateBookingPayload extends CreateBookingPayload {
  address_id: string;
  service_id: string;
  partner_id: string;
  owner_id: string;
  total_price: number;
}

export interface GetAllBookingsParams {
  status?: string;
  review_status?: string;
  page?: number;
  limit?: number;
}

export type GetAllBookingsResponse = PaginatedResponse<Booking[]>;

export type GetDetailBooking = ApiResponse<Booking>;
