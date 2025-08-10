import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const SkeletonCardRecentBooking = ({ length = 6 }: { length?: number }) => (
  <Fragment>
    {Array.from({ length }).map((_, index) => (
      <Card className="p-4 rounded-xl h-full" key={index}>
        <div className="flex items-start space-x-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-2/3 h-3" />
            <div className="flex items-center justify-between">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-20 h-4" />
            </div>
            <Skeleton className="w-full h-3 mt-1" />
            <Skeleton className="w-1/2 h-3" />
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </Card>
    ))}
  </Fragment>
);

export default SkeletonCardRecentBooking;
