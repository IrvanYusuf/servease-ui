"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthsServices from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { PATHS } from "@/lib/paths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Alert, AlertTitle } from "../../ui/alert";
import Link from "next/link";

export function LoginForm({ className }: React.ComponentProps<"form">) {
  const { setToken } = useAuthStore();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AuthsServices.mutationLogin,
    onSuccess: (res) => {
      console.log("res");
      setToken(res.data.token);
      if (res.data.user.role !== "USER") {
        router.push(PATHS.dashboard.root);
      } else {
        router.push(PATHS.home.root);
      }
    },
    onError: (err: any) => {
      console.log("err", err);
      setError(err.response.data.message);
    },
  });

  const handleLogin = async (data: LoginPayload) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          {error && (
            <Alert variant={"destructive"} className="bg-red-50">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Loading...." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm mt-3">
        Belum punya akun?
        <Link
          href={PATHS.auth.register.choose}
          className="underline underline-offset-4"
        >
          Daftar
        </Link>
      </div>
    </div>
  );
}
