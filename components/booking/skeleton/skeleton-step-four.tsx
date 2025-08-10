import { Skeleton } from "@/components/ui/skeleton";

const SkeletonStepFour = ({ length = 2 }: { length?: number }) => {
  return (
    <div className="flex space-x-3 w-full">
      {Array.from({ length }).map((_, index) => (
        <Skeleton className="h-10 w-[100%]" key={index} />
      ))}
    </div>
  );
};

export default SkeletonStepFour;
