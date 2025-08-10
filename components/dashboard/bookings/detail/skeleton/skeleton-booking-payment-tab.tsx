import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBookingPaymentTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="w-full flex flex-col space-y-3">
                  <Skeleton className="h-4 w-[60%]" />
                  <Skeleton className="h-4 w-[30%]" />
                </div>
                <Skeleton className="h-4 w-[30%]" />
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="space-y-3 w-full">
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4 w-[50%]" />
            </div>
            <div className="space-y-3 w-full">
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4 w-[50%]" />
            </div>
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
          <Separator />
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonBookingPaymentTab;
