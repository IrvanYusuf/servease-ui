import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const SkeletonCardPendingReview = () => {
  return (
    <Fragment>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="w-full">
            <div className="flex w-full">
              <Skeleton className="w-16 h-16 mr-3 shrink-0" />
              <div className="flex justify-between items-center w-full">
                <div className="space-y-3 w-1/2">
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-4 w-[70%]" />
                  <Skeleton className="h-4 w-[40%]" />
                  <Skeleton className="h-4 w-[40%]" />
                  <Skeleton className="h-4 w-[30%]" />
                </div>
                <div className="space-y-3 w-1/2 flex justify-end">
                  <div className="w-full justify-self-end items-end justify-end flex flex-col">
                    <Skeleton className="h-5 w-[40%]" />
                    <Skeleton className="h-10 w-[30%] mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
};

export default SkeletonCardPendingReview;
