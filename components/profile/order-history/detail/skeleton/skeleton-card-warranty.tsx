import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield } from "lucide-react";

const SkeletonCardWarranty = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          <Skeleton className="w-32 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="w-full h-20" />

        <div>
          <Skeleton className="w-48 h-5 mb-3" />
          <div className="space-y-2">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>

        <Skeleton className="w-full h-20" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCardWarranty;
