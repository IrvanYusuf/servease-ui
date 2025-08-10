import { PaginatedResponse } from "./api.type";
import { Category } from "./category.type";
import { Partner } from "@/types/dashboard/partner-dashboard.type";
import { User } from "./user.type";

export interface getAllServicesByCategoryParams {
  categoryId: string;
  pageParam?: number;
  limit?: number;
}

export interface getSearchServicesParams {
  keyword?: string;
  pageParam?: number;
  limit?: number;
}

export interface Service {
  _id: string;
  user_id: User;
  partner_id: Partner;
  category_id: Category;
  name: string;
  price: number;
  rating: number;
  thumbnail: string;
  total_reviews: number;
  gallery_images: string[];
  description: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type GetAllServicesResponse = PaginatedResponse<Service[]>;
