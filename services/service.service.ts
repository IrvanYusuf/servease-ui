import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import { LIMIT } from "@/constants/constants";
import {
  getAllServicesByCategoryParams,
  GetAllServicesResponse,
  getSearchServicesParams,
  Service,
} from "@/types/service.type";
import { ApiResponse } from "@/types/api.type";

const getAllServices = async () => {
  const response = await axiosInstance.get(ENDPOINTS.services.root);
  return response.data;
};

const getPopularServices = async ({
  pageParam,
  limit = 4,
}: {
  pageParam?: number;
  limit?: number;
}): Promise<ApiResponse<Service[]>> => {
  const params = { page: pageParam, limit };
  const response = await axiosInstance.get(ENDPOINTS.services.popular, {
    params,
  });
  return response.data;
};

const getAllServicesByCategory = async ({
  categoryId,
  pageParam = 1,
  limit = LIMIT,
}: getAllServicesByCategoryParams): Promise<GetAllServicesResponse> => {
  const params = { page: pageParam, limit };
  console.log(params);

  const response = await axiosInstance.get(
    `${ENDPOINTS.services.findByCategory(categoryId)}`,
    { params }
  );

  return response.data;
};

const getServiceDetail = async (
  serviceId: string
): Promise<ApiResponse<Service>> => {
  const response = await axiosInstance.get(
    `${ENDPOINTS.services.detail(serviceId)}`
  );

  return response.data;
};

const getServiceReviews = async (serviceId: string) => {
  const response = await axiosInstance.get(
    `${ENDPOINTS.services.reviews(serviceId)}`
  );

  return response.data;
};

const getSearchServices = async ({
  keyword = "",
  pageParam = 1,
  limit = LIMIT,
}: getSearchServicesParams) => {
  const params: Record<string, any> = { page: pageParam, limit };
  if (keyword && keyword.trim() !== "") {
    params.keyword = keyword;
  }

  const response = await axiosInstance.get(ENDPOINTS.services.search, {
    params,
  });

  return response.data;
};

const ServicesServices = {
  getAllServices,
  getAllServicesByCategory,
  getServiceDetail,
  getServiceReviews,
  getSearchServices,
  getPopularServices,
};

export default ServicesServices;
