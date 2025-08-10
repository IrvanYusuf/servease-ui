"use client";
import CategoriesService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function CategoryHeader({ category }: { category: string }) {
  const { data: dataCategory, isLoading } = useQuery({
    queryKey: ["detail-category", category],
    queryFn: () => CategoriesService.getDetailCategory(category),
  });

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link href="/" className="flex items-center hover:text-blue-600">
            <Home className="w-4 h-4 mr-1" />
            Beranda
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">
            {(!isLoading && dataCategory?.data.name) || ""}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Layanan {dataCategory?.data.name || ""}
            </h1>
            <p className="text-gray-600">
              Temukan teknisi profesional untuk kebutuhan{" "}
              {dataCategory?.data.name.toLowerCase()} Anda
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            Menampilkan 24 layanan tersedia
          </div>
        </div>
      </div>
    </div>
  );
}
