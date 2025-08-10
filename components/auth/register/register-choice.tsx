"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Shield, Users, ChevronLeft } from "lucide-react";
import CustomerCard from "@/components/auth/card-choose/customer-card";
import PartnerCard from "@/components/auth/card-choose/partner-card";

export default function RegisterChoice() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
              Kembali
            </span>
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              RepairService
            </span>
          </Link>
          <Link
            href="/login"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Sudah punya akun?
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Bergabung dengan 50,000+ pengguna
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Pilih Peran Anda di
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                RepairService
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bergabunglah dengan platform layanan perbaikan terpercaya di
              Indonesia. Pilih sebagai pelanggan untuk mendapatkan layanan
              terbaik, atau menjadi partner untuk memulai bisnis Anda.
            </p>
          </div>

          {/* Choice Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Customer Card */}
            <CustomerCard
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />

            {/* Partner Card */}
            <PartnerCard
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mengapa Memilih RepairService?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Terpercaya & Aman
                  </h4>
                  <p className="text-sm text-gray-600">
                    Platform dengan sistem keamanan berlapis dan verifikasi
                    ketat
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Komunitas Besar
                  </h4>
                  <p className="text-sm text-gray-600">
                    Bergabung dengan ribuan pengguna dan partner di seluruh
                    Indonesia
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Kualitas Terjamin
                  </h4>
                  <p className="text-sm text-gray-600">
                    Rating tinggi dan kepuasan pelanggan yang terbukti
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>© 2024 RepairService. Semua hak dilindungi.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <Link href="/terms" className="hover:text-blue-600 transition-colors">
            Syarat & Ketentuan
          </Link>
          <Link
            href="/privacy"
            className="hover:text-blue-600 transition-colors"
          >
            Kebijakan Privasi
          </Link>
          <Link href="/help" className="hover:text-blue-600 transition-colors">
            Bantuan
          </Link>
        </div>
      </footer>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
