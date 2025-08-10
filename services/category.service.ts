import { ApiResponse } from "@/types/api.type";
import { ENDPOINTS } from "./endpoints";
import axiosInstance from "@/lib/axios";
import { Category } from "@/types/category.type";

const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await axiosInstance.get(ENDPOINTS.categories.root);
  return response.data;
};

const getDetailCategory = async (
  categoryId: string
): Promise<ApiResponse<Category>> => {
  const response = await axiosInstance.get(
    ENDPOINTS.categories.detail(categoryId)
  );
  return response.data;
};

const CategoriesService = {
  getAllCategories,
  getDetailCategory,
};

export default CategoriesService;
