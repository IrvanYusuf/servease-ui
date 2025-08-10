import { Card, CardContent } from "@/components/ui/card";
import CardReview from "@/components/profile/reviews/card-review";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetAllReviewsResponse, Review } from "@/types/review.type";
import { FC, Fragment, useState } from "react";
import ModalEditReview from "@/components/profile/reviews/modal/modal-edit-review";
import SkeletonCardPendingReview from "@/components/profile/reviews/skeleton/skeleton-card-pending-review";
import ReviewPagination from "./review-pagination";
import ModalDeleteReview from "../modal/modal-delete-review";
import EmptyData from "@/components/empty-data";

interface MyReviewTabProps {
  dataReviews: GetAllReviewsResponse;
  isLoading: boolean;
  handlePageChange: (tab: string, page: number) => void;
  totalPagesPagination: number;
  selectedTab: string;
  pageMap: Record<string, number>;
}

const MyReviewTab: FC<MyReviewTabProps> = ({
  dataReviews,
  isLoading,
  handlePageChange,
  totalPagesPagination,
  selectedTab,
  pageMap,
}) => {
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Event handlers
  const handleEdit = (review: Review): void => {
    setEditingReview(review);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (review: Review): void => {
    setDeletingReview(review);
    setIsDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditingReview(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteClose = () => {
    setDeletingReview(null);
    setIsDeleteDialogOpen(false);
  };
  return (
    <div className="space-y-3">
      {isLoading ? (
        <SkeletonCardPendingReview />
      ) : dataReviews?.data.data.length === 0 ? (
        <EmptyData
          icon={Star}
          message=" Belum ada ulasan"
          desc="Anda belum memberikan ulasan untuk layanan apapun"
        />
      ) : (
        <Fragment>
          {dataReviews?.data.data.map((review) => (
            <CardReview
              key={review._id}
              review={review}
              onEdit={() => handleEdit(review)}
              onDelete={() => handleDelete(review)}
            />
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
      {/* Dialogs */}
      <ModalEditReview
        review={editingReview}
        isOpen={isEditDialogOpen}
        onClose={handleEditClose}
      />

      <ModalDeleteReview
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteClose}
        review={deletingReview}
      />
    </div>
  );
};

export default MyReviewTab;
