"use client";

import { useState } from "react";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInfiniteQuery } from "@tanstack/react-query";
import ServicesServices from "@/services/service.service";
import SkeletonListService from "./service/skeleton/SkeletonListService";
import Image from "next/image";
import CardService from "./card-service";

export default function ServiceGrid({ categoryId }: { categoryId: string }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const {
    data: services,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["services", categoryId],
    queryFn: ({ pageParam = 1 }) =>
      ServicesServices.getAllServicesByCategory({ categoryId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.pagination.page;
      const totalPages = lastPage.data.pagination.totalPages;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
  const dataServices = services?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="space-y-6">
      {/* Sort and View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Urutkan berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Paling Populer</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
              <SelectItem value="price-low">Harga Terendah</SelectItem>
              <SelectItem value="price-high">Harga Tertinggi</SelectItem>
              <SelectItem value="newest">Terbaru</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Services Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {isLoading ? (
          <SkeletonListService length={6} />
        ) : (
          dataServices.map((service) => (
            <CardService
              service={service}
              key={service._id}
              viewMode={viewMode}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {hasNextPage && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading...." : "Muat Lebih Banyak"}
          </Button>
        </div>
      )}
    </div>
  );
}
