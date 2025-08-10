import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const SkeletonCardAlamat = () => {
  return (
    <Fragment>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index}>
          <CardContent>
            <div className="flex space-x-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-3 mt-3 w-full">
              <Skeleton className="h-4 w-[20%]" />
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4 w-[40%]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
};

export default SkeletonCardAlamat;
