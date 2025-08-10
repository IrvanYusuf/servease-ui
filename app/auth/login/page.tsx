import { LoginForm } from "@/components/auth/login/login-form";
import AuthLayout from "@/components/layouts/auth-layout";
import Image from "next/image";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                <LoginForm />
              </div>
            </div>
          </div>
          <div className="relative hidden lg:flex lg:items-center lg:justify-center lg:flex-col">
            <div className="relative h-[50%] w-[50%]">
              <Image
                src="/login.png"
                alt="Image"
                fill
                className="object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>

            <div className="text-center px-4 mt-3">
              <h2 className="text-3xl font-bold mb-2">
                Selamat Datang di Platform Kami
              </h2>
              <p className="text-lg max-w-md">
                Temukan berbagai layanan terbaik yang kami tawarkan untuk
                memenuhi kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
