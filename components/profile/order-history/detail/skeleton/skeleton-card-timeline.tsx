import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const SkeletonCardTimeline = () => {
  return (
    <Fragment>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex items-start space-x-4 mb-4" key={index}>
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default SkeletonCardTimeline;
