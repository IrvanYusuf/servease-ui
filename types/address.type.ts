export interface Address {
  city: string;
  createdAt: string;
  description?: string;
  district: string;
  isPrimary: boolean;
  label_alamat: string;
  phone: string;
  province: string;
  street_name: string;
  updatedAt: string;
  user_id: string;
  __v: number;
  _id: string;
}

export type MutationCreateAddress = Pick<
  Address,
  | "label_alamat"
  | "phone"
  | "province"
  | "city"
  | "district"
  | "street_name"
  | "description"
>;
