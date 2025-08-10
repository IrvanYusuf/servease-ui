import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import { ApiResponse } from "@/types/api.type";
import { PaymentMethod } from "@/types/payment-method.type";

const mutationPaymentMethod = async (payload: any) => {
  const response = await axiosInstance.post(
    ENDPOINTS.paymentMethods.root,
    payload
  );

  return response.data;
};

const getAllPaymentMethods = async (): Promise<
  ApiResponse<PaymentMethod[]>
> => {
  const response = await axiosInstance.get(ENDPOINTS.paymentMethods.root);
  return response.data;
};

const PaymentMethodsServices = {
  mutationPaymentMethod,
  getAllPaymentMethods,
};

export default PaymentMethodsServices;
