import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  password: z.string().trim().min(3, "Password must be at least 3 characters"),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name too short" })
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email({ message: "Email must be a valid email address" })
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .min(12, { message: "Phone number must be at least 12 digits" })
    .max(15, { message: "Phone number max 15 digits" })
    .optional()
    .or(z.literal("")),

  gender: z
    .enum(["MALE", "FEMALE"], {
      errorMap: () => ({ message: "Gender must be either MALE or FEMALE" }),
    })
    .optional()
    .or(z.literal("")),

  birthDate: z.date().optional(),
});

export const registerSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min(1, "Email is required"),
  password: z.string().trim().min(5, "Password must be at least 5 characters"),
  name: z.string().trim().min(3, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(12, "Phone number must be at least 12 characters"),
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Select gender" }),
  }),
  birthDate: z.date(),
  profile_url: z.any().nullable(),
});

export type LoginPayload = z.infer<typeof loginSchema>;

export type UpdateUserPayload = z.infer<typeof updateUserSchema>;

export type RegisterPayload = z.infer<typeof registerSchema>;
