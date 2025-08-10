import { z } from "zod";

export const createWithdrawSchema = (maxAmount: number) =>
  z.object({
    amount: z
      .number({ invalid_type_error: "Jumlah harus berupa angka" })
      .min(1, "Jumlah minimal Rp1")
      .max(maxAmount, `Jumlah maksimal Rp${maxAmount.toLocaleString("id")}`),
    admin_fee: z.number().min(0),
    bank_name: z.string().min(1),
    account_name: z.string().min(1),
    account_number: z.string().min(1),
    notes: z.string().optional(),
  });

export type createWithdrawPayload = z.infer<
  ReturnType<typeof createWithdrawSchema>
>;
