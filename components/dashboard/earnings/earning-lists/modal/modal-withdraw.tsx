"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  createWithdrawPayload,
  createWithdrawSchema,
} from "@/schema/withdraw.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ADMIN_FEE } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";
import DashboardPartnerEarningServices from "@/services/dashboard/earningPartner.service";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";
import { NumericFormat } from "react-number-format";

type ModalWithdrawProps = {
  totalEarnings: number;
};

const ModalWithdraw = ({ totalEarnings }: ModalWithdrawProps) => {
  const [withdrawalDialogOpen, setWithdrawalDialogOpen] = useState(false);

  const form = useForm<createWithdrawPayload>({
    resolver: zodResolver(createWithdrawSchema(totalEarnings)),
    defaultValues: {
      amount: totalEarnings,
      admin_fee: ADMIN_FEE,
      account_name: "",
      account_number: "",
      bank_name: "",
      notes: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  // mutation untuk melakukan penarikan dana
  const { mutate: makeWithdraw, isPending } = useMutation({
    mutationFn: DashboardPartnerEarningServices.makeWithdraw,
    onSuccess: () => {
      toast.success("Berhasil mengajukan penarikan dana");
      queryClient.invalidateQueries({
        queryKey: ["total-balance"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-monthly-withdraw"],
      });
      queryClient.invalidateQueries({
        queryKey: ["withdraw-history"],
      });
    },
    onError: (error: any) => {
      console.log(error);

      toast.error(error.message);
    },
  });

  const onSubmit = (data: createWithdrawPayload) => {
    console.log(data);
    makeWithdraw(data);
    form.reset();
  };

  // fungsi useEffect untuk mengisi field amount
  useEffect(() => {
    if (withdrawalDialogOpen && totalEarnings > 0) {
      form.reset({
        amount: totalEarnings,
        admin_fee: ADMIN_FEE,
        account_name: "",
        account_number: "",
        bank_name: "",
      });
    }
  }, [withdrawalDialogOpen, totalEarnings, form]);

  return (
    <Dialog open={withdrawalDialogOpen} onOpenChange={setWithdrawalDialogOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <ArrowUpRight className="h-4 w-4 mr-2" />
          Tarik Dana
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Permintaan Penarikan Dana</DialogTitle>
          <DialogDescription>
            Masukkan detail penarikan dana Anda. Proses penarikan membutuhkan
            1-3 hari kerja.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Penarikan</FormLabel>
                      <FormControl>
                        <NumericFormat
                          customInput={Input}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                          placeholder="Masukkan jumlah"
                          allowNegative={false}
                          decimalScale={0}
                          isAllowed={(values) => {
                            const { floatValue } = values;
                            return !floatValue || floatValue <= totalEarnings;
                          }}
                          onValueChange={(values) => {
                            field.onChange(values.floatValue || 0);
                          }}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Saldo tersedia: {totalEarnings.toLocaleString("id")}
              </p>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Tujuan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bca">Bank BCA</SelectItem>
                          <SelectItem value="mandiri">Bank Mandiri</SelectItem>
                          <SelectItem value="bri">Bank BRI</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="account_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pemilik Rekening</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama pemilik rekening"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="account_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Rekening</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nomor rekening"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catatan (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tambahkan catatan jika diperlukan"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Biaya Admin:</strong> Rp 5.000
                  <br />
                  <strong>Estimasi Waktu:</strong> 1-3 hari kerja
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setWithdrawalDialogOpen(false)}
                disabled={isPending}
                className="cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending ? "Memproses..." : "Ajukan Penarikan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWithdraw;
