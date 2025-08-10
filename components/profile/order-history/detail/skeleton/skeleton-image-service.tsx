import { Skeleton } from "@/components/ui/skeleton";

const SkeletonImageService = () => {
  return (
    <div className="flex space-x-3 items-center">
      <Skeleton className="h-16 w-16 rounded-lg" />
      <div className="flex flex-col w-full space-y-3">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
};

export default SkeletonImageService;
