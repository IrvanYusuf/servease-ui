import SkeletonListService from "./service/skeleton/SkeletonListService";
import CardService from "./card-service";
import { Service } from "@/types/service.type";

interface RelatedServicesProps {
  dataSimilarService: Service[];
  isLoading: boolean;
}

export default function RelatedServices({
  dataSimilarService,
  isLoading,
}: RelatedServicesProps) {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Layanan Serupa</h3>
        <p className="text-gray-600">Layanan lain yang mungkin Anda butuhkan</p>
      </div>
      <div className={"grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-4"}>
        {isLoading ? (
          <SkeletonListService length={4} />
        ) : (
          dataSimilarService.map((service) => (
            <CardService service={service} key={service._id} />
          ))
        )}
      </div>
    </div>
  );
}
