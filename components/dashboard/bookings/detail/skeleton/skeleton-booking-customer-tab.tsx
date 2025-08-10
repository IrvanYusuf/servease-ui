import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBookingCustomerTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <div className="flex space-x-3">
            <Skeleton className="h-20 w-20 rounded-full shrink-0" />
            <div className="w-full flex flex-col space-y-3">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[30%]" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[30%]" />
            <div className="flex space-x-3">
              <Skeleton className="h-4 w-[40%]" />
              <Skeleton className="h-4 w-[10%]" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-x-3">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <div>
            <Skeleton className="h-4 w-[20%]" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[30%]" />
            <div>
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonBookingCustomerTab;
