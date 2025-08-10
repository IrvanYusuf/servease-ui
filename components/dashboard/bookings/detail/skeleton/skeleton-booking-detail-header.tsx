import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBookingDetailHeader = () => {
  return (
    <div>
      <div className="flex justify-end space-x-3">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
      <Skeleton className="w-28 h-8" />
      <Skeleton className="w-[40%] h-8 mt-3" />
    </div>
  );
};

export default SkeletonBookingDetailHeader;
