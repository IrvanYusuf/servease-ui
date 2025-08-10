import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import { ApiResponse } from "@/types/api.type";
import { User } from "@/types/user.type";
import { UpdateUserPayload } from "@/schema/auth.schema";

const getUser = async (): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.get(ENDPOINTS.users.detail);

  return response.data;
};

const updateUser = async (
  payload: UpdateUserPayload
): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.patch(ENDPOINTS.users.root, payload);
  return response.data;
};

const UsersServices = {
  getUser,
  updateUser,
};

export default UsersServices;
