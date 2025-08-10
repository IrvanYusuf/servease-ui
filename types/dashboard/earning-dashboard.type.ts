import { PaginatedResponse } from "@/types/api.type";
import { Service } from "@/types/service.type";
import { User } from "@/types/user.type";
import { Partner } from "@/types/dashboard/partner-dashboard.type";
import { PaymentMethod } from "../payment-method.type";
import { PAYMENT_STATUS, STATUS } from "../booking.type";

export interface Earning {
  _id: string;
  user_id: User;
  service_id: Service;
  partner_id: Partner;
  payment_method_id: PaymentMethod;
  status: STATUS;
  payment_status: PAYMENT_STATUS;
  total_price: number;
  sub_total: number;
  app_cost: number;
  booking_date: string;
  booking_time: string;
  createdAt: string;
  updatedAt: string;
}

enum STATUS_WITHDRAW {
  pending = "pending",
  approved = "approved",
  completed = "completed",
  rejected = "rejected",
}
export interface Withdraw {
  _id: string;
  owner_id: string;
  amount: number;
  admin_fee: number;
  status: STATUS_WITHDRAW;
  payment_method: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  notes?: string;
  created_at: string;
  approved_at: string;
  rejected_at: string;
  cancelled_at: string;
  finished_at: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export type getEarningHistoryParams = {
  page?: number;
  limit?: number;
};

export type makeWithdrawPayload = {
  amount: number;
  admin_fee: number;
  account_name: string;
  account_number: string;
  bank_name: string;
  notes?: string;
};

export type GetEarningHistoryResponse = PaginatedResponse<Earning[]>;

export type GetWithdrawHistoryResponse = PaginatedResponse<Withdraw[]>;
