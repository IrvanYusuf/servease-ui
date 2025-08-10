"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookingStatsStore } from "@/store/useBookingStatsStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReviewsServices from "@/services/review.service";
import BookingsServices from "@/services/booking.service";
import MyReviewTab from "./tabs/my-review-tab";
import MyPendingReviewTab from "./tabs/my-pending-review-tab";

export default function ReviewsManagement() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const { totalNotReviewed, totalReviewed } = useBookingStatsStore();

  const [pageMap, setPageMap] = useState<Record<string, number>>({
    pending: 1,
    my_reviews: 1,
  });

  const handlePageChange = (tab: string, page: number) => {
    setPageMap((prev) => ({
      ...prev,
      [tab]: page,
    }));
  };

  const currentPendingPage = pageMap["pending"];

  const {
    data: dataBookingNotReviewd,
    isLoading: isLoadingBookingNotReviewed,
  } = useQuery({
    queryKey: ["bookings-not-reviewed", currentPendingPage],
    queryFn: () =>
      BookingsServices.getAllBookings({
        status: "completed",
        review_status: "not_reviewed",
        page: currentPendingPage,
      }),
    placeholderData: keepPreviousData,
  });

  const currentReviewPage = pageMap["my_reviews"];

  const { data: dataReviews, isLoading } = useQuery({
    queryKey: ["reviews", currentReviewPage],
    queryFn: () => ReviewsServices.getAllReviews({ page: currentReviewPage }),
    placeholderData: keepPreviousData,
  });

  const totalPagesPaginationPendingReview =
    dataBookingNotReviewd?.data.pagination.totalPages || 1;

  const totalPagesPaginationReview =
    dataReviews?.data.pagination.totalPages || 1;
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ulasan</h1>
        <p className="text-gray-600 mt-1">
          Kelola ulasan layanan dan berikan feedback untuk teknisi
        </p>
      </div>

      {/* Review Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {totalNotReviewed}
            </div>
            <div className="text-sm text-gray-600">Menunggu Diulas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {totalReviewed}
            </div>
            <div className="text-sm text-gray-600">Ulasan Saya</div>
          </CardContent>
        </Card>
      </div>

      {/* Review Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="cursor-pointer">
            Menunggu Diulas ({totalNotReviewed})
          </TabsTrigger>
          <TabsTrigger value="my_reviews" className="cursor-pointer">
            Ulasan Saya ({totalReviewed})
          </TabsTrigger>
        </TabsList>

        {/* Pending Reviews Tab */}
        <TabsContent value="pending" className="space-y-4 mt-6">
          <MyPendingReviewTab
            isLoading={isLoadingBookingNotReviewed}
            dataBookingNotReviewed={dataBookingNotReviewd!}
            handlePageChange={handlePageChange}
            pageMap={pageMap}
            selectedTab="pending"
            totalPagesPagination={totalPagesPaginationPendingReview}
          />
        </TabsContent>

        {/* My Reviews Tab */}
        <TabsContent value="my_reviews" className="space-y-4 mt-6">
          <MyReviewTab
            dataReviews={dataReviews!}
            isLoading={isLoading}
            totalPagesPagination={totalPagesPaginationReview}
            handlePageChange={handlePageChange}
            pageMap={pageMap}
            selectedTab="my_reviews"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
