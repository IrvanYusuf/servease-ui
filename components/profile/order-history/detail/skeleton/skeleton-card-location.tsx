import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardLocation = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center mt-3 space-x-2">
          <Skeleton className="h-6 w-6 self-start" />
          <div className="flex flex-col w-full space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCardLocation;
