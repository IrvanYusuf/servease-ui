import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Minimum rating is 1" })
    .max(5, { message: "Maximum rating is 5" }),
  comment: z
    .string()
    .min(1, { message: "Comment is required" })
    .max(500, "Komentar maksimal 500 karakter"),
});

export type createReviewPayload = z.infer<typeof createReviewSchema>;

export const updateReviewSchema = createReviewSchema;
export type updateReviewPayload = z.infer<typeof updateReviewSchema>;
