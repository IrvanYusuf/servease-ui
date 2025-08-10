import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "../endpoints";
import {
  getEarningHistoryParams,
  GetEarningHistoryResponse,
  GetWithdrawHistoryResponse,
  makeWithdrawPayload,
} from "@/types/dashboard/earning-dashboard.type";
import { AnalyticsCountResponse } from "@/types/common.type";

const getEarningHistory = async ({
  page = 1,
  limit = 10,
}: getEarningHistoryParams): Promise<GetEarningHistoryResponse> => {
  const params: Record<string, any> = { page, limit };
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.earnings.history,
    { params }
  );

  return response.data;
};

const getWithdrawHistory = async ({
  page = 1,
  limit = 10,
}: getEarningHistoryParams): Promise<GetWithdrawHistoryResponse> => {
  const params: Record<string, any> = { page, limit };
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.earnings.historyWithdraw,
    { params }
  );

  return response.data;
};

const makeWithdraw = async (payload: makeWithdrawPayload) => {
  const response = await axiosInstance.post(
    ENDPOINTS.dashboard.partners.earnings.withdraw,
    payload
  );
  return response.data;
};

const getTotalMonthlyWithdraw = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.earnings.totalMonthlyWithdraw
  );

  return response.data;
};

const getUserBalance = async (): Promise<AnalyticsCountResponse> => {
  const response = await axiosInstance.get(
    ENDPOINTS.dashboard.partners.earnings.balance
  );
  return response.data;
};

const DashboardPartnerEarningServices = {
  getWithdrawHistory,
  getEarningHistory,
  makeWithdraw,
  getTotalMonthlyWithdraw,
  getUserBalance,
};

export default DashboardPartnerEarningServices;
