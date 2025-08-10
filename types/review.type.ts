import { ApiResponse, PaginatedResponse } from "./api.type";
import { Booking } from "./booking.type";
import { Partner } from "@/types/dashboard/partner-dashboard.type";
import { Service } from "./service.type";
import { User } from "./user.type";

// types/review.ts
export interface Review {
  _id: string;
  user_id: User;
  booking_id: Booking;
  partner_id: Partner;
  service_id: Service;
  owner_id: User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface mutationCreateReviewPayload {
  bookingId: string;
  payload: {
    service_id: string;
    owner_id: string;
    partner_id: string;
    rating: number;
    comment: string;
  };
}

export interface updateReviewPayload {
  reviewId: string;
  payload: {
    rating: number;
    comment: string;
  };
}

export type GetAllReviewsResponse = PaginatedResponse<Review[]>;
export type GetAllDashboardReviewsResponse = PaginatedResponse<Booking[]>;

export type mutationCreateReviewResponse = ApiResponse<Review>;
export type updateReviewResponse = ApiResponse<Review>;
