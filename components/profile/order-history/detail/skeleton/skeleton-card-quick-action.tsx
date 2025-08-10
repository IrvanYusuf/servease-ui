import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardQuickAction = () => {
  return (
    <Card>
      <CardContent className="w-full">
        <Skeleton className="h-4 w-[40%]" />
        <div className="mt-6 flex flex-col space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-8 w-[100%]" key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCardQuickAction;
