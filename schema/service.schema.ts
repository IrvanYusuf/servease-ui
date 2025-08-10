import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z.string().min(1, "Price must be greater than zero"),
  partner_id: z.string().min(1, "Company is required"),
  category_id: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Thumbnail is required",
    })
    .refine((file) => file && file.size <= 3 * 1024 * 1024, {
      message: "Max file size is 3MB",
    }),
  gallery_images: z
    .array(z.any())
    .min(1, "At least 1 image is required")
    .max(7, "Maximum 7 images allowed")
    .refine((files) => files.every((file) => file instanceof File), {
      message: "Each item must be a file",
    })
    .refine((files) => files.every((file) => file.size <= 3 * 1024 * 1024), {
      message: "Each file must be max 3MB",
    }),
});

export type createServicePayload = z.infer<typeof createServiceSchema>;
