import { LIMIT } from "@/constants/constants";
import { ENDPOINTS } from "@/services/endpoints";
import axiosInstance from "@/lib/axios";
import { getAllPartnerServicesParams } from "@/types/dashboard/service-dashboard.type";
import { AnalyticsCountResponse } from "@/types/common.type";

const mutationCreateService = async (payload: FormData) => {
  const response = await axiosInstance.post(
    ENDPOINTS.dashboard.partners.services.root,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const getAllPartnerServices = async ({
  search = "",
  page = 1,
  limit = LIMIT,
}: getAllPartnerServicesParams) => {
  const params = { page, limit };

  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.services.root,
    { params }
  );

  return response.data;
};

const getTotalServices = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.services.totalServices
  );
  return response.data;
};

const DashboardPartnerServicesService = {
  getAllPartnerServices,
  getTotalServices,
  mutationCreateService,
};

export default DashboardPartnerServicesService;
