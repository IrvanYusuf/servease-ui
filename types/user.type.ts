enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface User {
  profile_url?: string;
  birthDate: string;
  createdAt: string;
  email: string;
  gender: GENDER;
  isVerified: boolean;
  name: string;
  otpVerification: string;
  otpVerificationExpiresAt: string;
  phone: string;
  role: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}
