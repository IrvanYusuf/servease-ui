import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import { AuthResponse, LoginPayload } from "@/types/auth.type";
import { RegisterPayload } from "@/schema/auth.schema";

const mutationRegister = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post(ENDPOINTS.auths.register, payload);

  return response.data;
};
const mutationLogin = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await axiosInstance.post(ENDPOINTS.auths.login, payload);

  return response.data;
};

const AuthsServices = {
  mutationRegister,
  mutationLogin,
};

export default AuthsServices;
