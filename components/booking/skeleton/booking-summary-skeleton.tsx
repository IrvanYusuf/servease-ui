import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const BookingSummarySkeleton = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-6 w-full">
        <Skeleton className="h-4 w-[50%]" />
        <div className="flex w-full mt-3 space-x-3">
          <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
          <div className="flex flex-col space-y-3 w-full">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[30%]" />
        </div>
        <div className="flex justify-between w-full mt-3">
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[30%]" />
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between w-full mt-3">
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[30%]" />
        </div>
        <Skeleton className="h-14 mt-4 w-full" />
      </CardContent>
    </Card>
  );
};

export default BookingSummarySkeleton;
