import { ApiResponse } from "./api.type";

export type DecodedToken = {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
};

export interface AuthLogin {
  user: { id: string; name: string; email: string; role: string };
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type AuthResponse = ApiResponse<AuthLogin>;
