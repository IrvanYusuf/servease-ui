export interface getTotalBookingParams {
  range_date: "today" | "week" | "all";
}

export type getAllPartnerBookingsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  payment_status?: string;
  date_from?: string;
  date_to?: string;
};
