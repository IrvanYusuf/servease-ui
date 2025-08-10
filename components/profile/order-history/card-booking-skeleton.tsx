import { FC } from "react";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

interface CardBookingSkeletonProps {
  length?: number;
}

const CardBookingSkeleton: FC<CardBookingSkeletonProps> = ({ length = 4 }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <Card className="hover:shadow-md transition-shadow" key={index}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Image + Info */}
              <div className="flex items-start space-x-4 flex-1">
                <Skeleton className="w-16 h-16 rounded-lg" />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-20 h-5 rounded" />
                    <Skeleton className="w-24 h-5 rounded" />
                  </div>
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                    <Skeleton className="w-28 h-4" />
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col items-end space-y-3">
                <div className="text-right space-y-1">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="w-20 h-8 rounded-md" />
                  <Skeleton className="w-28 h-8 rounded-md" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CardBookingSkeleton;
