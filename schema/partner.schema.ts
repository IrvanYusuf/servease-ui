import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  link_map: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Maps link is required"),
  profile_image: z
    .any()
    .refine((file) => file instanceof File, { message: "Image is required" })
    .refine((file) => file && file.size <= 3 * 1024 * 1024, {
      message: "Max file size is 3MB",
    }),
});

export type createCompanyPayload = z.infer<typeof createCompanySchema>;
