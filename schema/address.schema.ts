import { z } from "zod";

export const createAddressSchema = z.object({
  label_alamat: z
    .string({
      required_error: "Address Label is required.",
    })
    .trim()
    .min(1, "Address Label is required.")
    .max(100, "Address Label must be at most 100 characters."),

  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .trim()
    .min(12, "Phone number must be at least 12 digits.")
    .max(15, "Phone number must be at most 15 digits."),

  province: z
    .string({
      required_error: "Province is required.",
    })
    .trim()
    .min(1, "Province is required."),

  city: z
    .string({
      required_error: "City / Regency is required.",
    })
    .trim()
    .min(1, "City / Regency is required."),

  district: z
    .string({
      required_error: "District is required.",
    })
    .trim()
    .min(1, "District is required."),

  street_name: z
    .string({
      required_error: "Street Name is required.",
    })
    .trim()
    .min(1, "Street Name is required."),

  description: z.string().optional(),
});

export const updateAddressSchema = z.object({
  label_alamat: z
    .string({
      required_error: "Address Label is required.",
    })
    .trim()
    .min(1, "Address Label is required.")
    .max(100, "Address Label must be at most 100 characters.")
    .optional(),

  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .trim()
    .min(12, "Phone number must be at least 12 digits.")
    .max(15, "Phone number must be at most 15 digits.")
    .optional(),

  province: z
    .string({
      required_error: "Province is required.",
    })
    .trim()
    .min(1, "Province is required.")
    .optional(),

  city: z
    .string({
      required_error: "City / Regency is required.",
    })
    .trim()
    .min(1, "City / Regency is required.")
    .optional(),

  district: z
    .string({
      required_error: "District is required.",
    })
    .trim()
    .min(1, "District is required.")
    .optional(),

  street_name: z
    .string({
      required_error: "Street Name is required.",
    })
    .trim()
    .min(1, "Street Name is required.")
    .optional(),

  description: z.string().optional(),
});

export type createAddressPayload = z.infer<typeof createAddressSchema>;

export type updateAddressPayload = z.infer<typeof updateAddressSchema>;
