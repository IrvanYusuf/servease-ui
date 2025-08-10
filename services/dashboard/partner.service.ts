import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "../endpoints";
import {
  getAllPartnerParams,
  GetAllPartnersResponse,
} from "@/types/dashboard/partner-dashboard.type";

const mutationCreatePartner = async (payload: FormData) => {
  const response = await axiosInstance.post(ENDPOINTS.partners.root, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getAllPartners = async ({
  limit = 10,
  page = 1,
  search,
}: getAllPartnerParams): Promise<GetAllPartnersResponse> => {
  const params: Record<string, any> = { page, limit };

  if (search && search.trim() !== "") {
    params.search = search;
  }
  const response = await axiosInstance.get(ENDPOINTS.partners.root, { params });
  return response.data;
};

const deletePartner = async ({ partnerId }: { partnerId: string }) => {
  const response = await axiosInstance.delete(
    ENDPOINTS.partners.delete(partnerId)
  );

  return response.data;
};

const DashboardPartnersServices = {
  mutationCreatePartner,
  getAllPartners,
  deletePartner,
};

export default DashboardPartnersServices;
