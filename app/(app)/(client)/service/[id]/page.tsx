import ServiceDetail from "@/components/service/service-detail";
import {
  generateServiceDetailJsonLd,
  generateServiceDetailMetadata,
} from "./metadata";
import ServicesServices from "@/services/service.service";
import Script from "next/script";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  try {
    const service = await ServicesServices.getServiceDetail((await params).id);
    if (!service) return { title: "Service Not Found" };

    return generateServiceDetailMetadata(service.data);
  } catch (error) {
    return { title: "Service Not Found" };
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const service = await ServicesServices.getServiceDetail(id);
  const serviceJsonLd = generateServiceDetailJsonLd(service.data);
  return (
    <div>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      <ServiceDetail serviceId={id} />
    </div>
  );
}
