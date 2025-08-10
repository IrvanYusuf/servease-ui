"use client";

import type React from "react";

import Link from "next/link";
import { User, ChevronLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PATHS } from "@/lib/paths";

import RegisterForm from "./register-form";

interface RegisterPageProps {
  role: string;
}

export default function RegisterPage({ role }: RegisterPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href={PATHS.auth.register.choose}
            className="flex items-center space-x-2 group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
              Kembali
            </span>
          </Link>
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              RepairService
            </span>
          </Link>
          <Link
            href={PATHS.auth.login}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Masuk
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Daftar sebagai {role === "user" ? "Pelanggan" : "Partner"}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Mulai dapatkan layanan perbaikan terbaik
              </p>
            </CardHeader>
            <CardContent>
              {/* register form */}
              <RegisterForm role={role} />

              <div className="text-center text-sm mt-3">
                Sudah punya akun?
                <Link
                  href={PATHS.auth.login}
                  className="underline underline-offset-4 ms-1"
                >
                  Masuk
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
