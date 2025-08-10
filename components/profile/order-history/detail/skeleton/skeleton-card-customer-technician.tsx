import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const SkeletonCardCustomerTechnician = () => {
  return (
    <Fragment>
      <Card>
        <CardContent>
          <div className="flex space-x-3 items-center">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
          <div className="mt-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="flex flex-col space-y-2 mt-6" key={index}>
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[50%]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex space-x-3 items-center">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
          <div className="mt-6 w-full">
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full shrink-0 self-start" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[70%]" />
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-8 w-[100%]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SkeletonCardCustomerTechnician;
