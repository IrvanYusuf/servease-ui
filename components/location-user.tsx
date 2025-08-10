import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useLocationUserStore } from "@/store/useLocationUserStore";
import { Fragment } from "react";
import { Skeleton } from "./ui/skeleton";

const LocationUser = () => {
  const locationUser = useLocationUserStore((state) => state.address);
  const isLoading = useLocationUserStore((state) => state.isLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Skeleton className="w-16 h-6" />
      ) : (
        <Button variant="ghost" size="sm" className="text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {locationUser?.city ?? "Not found location"}
        </Button>
      )}
    </Fragment>
  );
};

export default LocationUser;
