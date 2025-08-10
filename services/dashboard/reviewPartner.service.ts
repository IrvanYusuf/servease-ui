import { LIMIT } from "@/constants/constants";
import { ENDPOINTS } from "@/services/endpoints";
import axiosInstance from "@/lib/axios";
import { getAllPartnerReviewsParams } from "@/types/dashboard/review-dashboard.type";
import { GetAllDashboardReviewsResponse } from "@/types/review.type";
import { AnalyticsCountResponse } from "@/types/common.type";

const getAllPartnerReviews = async ({
  page = 1,
  limit = LIMIT,
  status = "",
  rating,
  date_from,
  date_to,
  search = "",
}: getAllPartnerReviewsParams): Promise<GetAllDashboardReviewsResponse> => {
  const params: Record<string, any> = { page, limit };

  if (search && search.trim() !== "") {
    params.search = search;
  }

  if (status) {
    params.review_status = status;
  }

  if (rating) {
    params.rating = rating;
  }

  if (date_from) {
    params.date_from = date_from;
  }
  if (date_to) {
    params.date_to = date_to;
  }
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.reviews.root,
    { params }
  );

  return response.data;
};

const getTotalNotReviewedPartner =
  async (): Promise<AnalyticsCountResponse> => {
    const response = await axiosInstance.get(
      ENDPOINTS.dashboard.partners.reviews.totalNotReviewed
    );
    return response.data;
  };

const getTotalAllReviewPartner = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.reviews.totalAllReviewed
  );
  return response.data;
};

const DashboardPartnerReviewService = {
  getAllPartnerReviews,
  getTotalNotReviewedPartner,
  getTotalAllReviewPartner,
};

export default DashboardPartnerReviewService;
