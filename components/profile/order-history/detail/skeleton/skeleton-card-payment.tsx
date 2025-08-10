import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardPayment = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex space-x-3 items-center">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-[120px]" />
        </div>
        <div className="mt-6">
          <div className="flex w-full justify-between">
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-4 w-[20%]" />
          </div>
          <div className="flex w-full justify-between mt-3">
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-4 w-[20%]" />
          </div>
          <Separator className="my-3" />
          <div className="flex w-full justify-between mt-3">
            <Skeleton className="h-4 w-[20%]" />
          </div>
          <Skeleton className="h-10 w-[100%] mt-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCardPayment;
