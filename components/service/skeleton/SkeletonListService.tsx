import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonListServiceProps {
  length?: number;
}

const SkeletonListService: FC<SkeletonListServiceProps> = ({ length = 5 }) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index: number) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonListService;
