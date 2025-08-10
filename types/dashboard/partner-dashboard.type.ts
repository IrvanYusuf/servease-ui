import { PaginatedResponse } from "../api.type";
import { User } from "../user.type";

export interface Partner {
  _id: string;
  user_id: User;
  name: string;
  description: string;
  city: string;
  province: string;
  district: string;
  link_map: string;
  profile_image: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type getAllPartnerParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type GetAllPartnersResponse = PaginatedResponse<Partner[]>;
