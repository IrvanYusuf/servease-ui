import ServiceDetail from "@/components/service/service-detail";

type Params = Promise<{ id: string }>;

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  return (
    <div>
      <ServiceDetail serviceId={id} />
    </div>
  );
}
