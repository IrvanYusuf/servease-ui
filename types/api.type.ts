// types/api.ts

export type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  keyword?: string;
}

export interface PaginatedResponse<T>
  extends ApiResponse<{ data: T; pagination: PaginationMeta }> {}
