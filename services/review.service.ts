import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import {
  GetAllReviewsResponse,
  mutationCreateReviewPayload,
  mutationCreateReviewResponse,
  updateReviewPayload,
} from "@/types/review.type";
import { AnalyticsCountResponse } from "@/types/common.type";

const mutationCreateReview = async ({
  bookingId,
  payload,
}: mutationCreateReviewPayload): Promise<mutationCreateReviewResponse> => {
  const response = await axiosInstance.post(
    `${ENDPOINTS.reviews.root}/${bookingId}`,
    payload
  );
  return response.data;
};

const getAllReviews = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<GetAllReviewsResponse> => {
  const params: Record<string, any> = { page, limit };
  const response = await axiosInstance.get(ENDPOINTS.reviews.root, { params });
  return response.data;
};

const updateReview = async ({ reviewId, payload }: updateReviewPayload) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.reviews.update(reviewId),
    payload
  );
  return response.data;
};

const deleteReview = async ({ reviewId }: { reviewId: string }) => {
  const response = await axiosInstance.delete(
    ENDPOINTS.reviews.delete(reviewId)
  );

  return response.data;
};

const getTotalReviewed = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(ENDPOINTS.reviews.totalReview);
  return response.data;
};

const ReviewsServices = {
  mutationCreateReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getTotalReviewed,
};

export default ReviewsServices;
