"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import CategoriesService from "@/services/category.service";
import { Category } from "@/types/category.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => (
  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
    <CardContent className="p-6 text-center w-full">
      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
      <Skeleton className="h-4 w-full" />
    </CardContent>
  </Card>
);

export default function ServiceCategories() {
  const [isClient, setIsClient] = useState(false);

  const { data: dataCategories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesService.getAllCategories,
    enabled: isClient, // Hanya fetch setelah client mount
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Server-side render: tampilkan skeleton
  if (!isClient) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori Layanan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai layanan perbaikan profesional untuk kebutuhan
              Anda
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Client-side render
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kategori Layanan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai layanan perbaikan profesional untuk kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))
          ) : dataCategories?.data ? (
            dataCategories.data.map((category: Category) => (
              <Link key={category._id} href={`/category/${category._id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={category.url_icon || "/placeholder.png"}
                        alt={`${category.name} icon`}
                        width={50}
                        height={50}
                        className="object-cover cursor-pointer"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Tidak ada kategori tersedia</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
