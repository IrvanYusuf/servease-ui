import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardProfileInformation = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex w-full justify-between">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-full mt-3" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCardProfileInformation;
