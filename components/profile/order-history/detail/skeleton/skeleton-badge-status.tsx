import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBadgeStatus = () => {
  return (
    <div className="flex space-x-3">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-[100px]" />
    </div>
  );
};

export default SkeletonBadgeStatus;
