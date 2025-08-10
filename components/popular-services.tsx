"use client";
import { useQuery } from "@tanstack/react-query";
import ServicesServices from "@/services/service.service";
import CardService from "./card-service";
import SkeletonListService from "./service/skeleton/SkeletonListService";

export default function PopularServices() {
  const { data: dataPopularServices, isLoading } = useQuery({
    queryKey: ["popular-services"],
    queryFn: () => ServicesServices.getPopularServices({}),
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Layanan Populer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Layanan yang paling banyak dipesan dan mendapat rating terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <SkeletonListService length={4} />
          ) : (
            dataPopularServices?.data.map((service) => (
              <CardService service={service} key={service._id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
