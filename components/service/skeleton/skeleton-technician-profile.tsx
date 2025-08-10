import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTechnicianProfile = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-6 w-full">
        <div className="flex w-full space-x-4">
          <Skeleton className="h-20 w-20 block self-start shrink-0 rounded-full" />
          <div className="w-full flex flex-col space-y-4">
            <div className="flex w-full justify-between">
              <Skeleton className="h-4 w-[40%]" />
              <Skeleton className="h-4 w-[10%]" />
            </div>
            <div className="w-full flex space-x-3">
              <Skeleton className="h-4 w-[10%]" />
              <Skeleton className="h-4 w-[30%]" />
            </div>
            <Skeleton className="h-4 w-[30%]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonTechnicianProfile;
