import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import CardPendingReview from "@/components/profile/reviews/card-pending-review";
import { GetAllBookingsResponse } from "@/types/booking.type";
import { FC, Fragment } from "react";
import SkeletonCardPendingReview from "@/components/profile/reviews/skeleton/skeleton-card-pending-review";
import ReviewPagination from "./review-pagination";
import EmptyData from "@/components/empty-data";
import { PATHS } from "@/lib/paths";

interface MyPendingReviewTabProps {
  dataBookingNotReviewed: GetAllBookingsResponse;
  isLoading: boolean;
  handlePageChange: (tab: string, page: number) => void;
  totalPagesPagination: number;
  selectedTab: string;
  pageMap: Record<string, number>;
}

const MyPendingReviewTab: FC<MyPendingReviewTabProps> = ({
  dataBookingNotReviewed,
  isLoading,
  handlePageChange,
  totalPagesPagination,
  selectedTab,
  pageMap,
}) => {
  return (
    <div className="space-y-3">
      {isLoading ? (
        <SkeletonCardPendingReview />
      ) : dataBookingNotReviewed?.data.data.length === 0 ? (
        <EmptyData
          icon={Star}
          message=" Tidak ada ulasan yang menunggu"
          desc="Semua layanan sudah Anda ulas"
        />
      ) : (
        <Fragment>
          {dataBookingNotReviewed!.data.data.map((review) => (
            <CardPendingReview key={review._id} reviewPending={review} />
          ))}
          {totalPagesPagination > 1 && (
            <ReviewPagination
              handlePageChange={handlePageChange}
              pageMap={pageMap}
              selectedTab={selectedTab}
              totalPagesPagination={totalPagesPagination}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default MyPendingReviewTab;
