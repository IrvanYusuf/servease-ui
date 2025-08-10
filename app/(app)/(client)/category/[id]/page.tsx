import CategoryHeader from "@/components/category-header";
import CategoryFilters from "@/components/category-filters";
import ServiceGrid from "@/components/service-grid";

type Params = Promise<{ id: string }>;
export default async function CategoryPage({ params }: { params: Params }) {
  const { id } = await params;
  return (
    <div>
      <CategoryHeader category={id} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CategoryFilters />
          </aside>
          <div className="lg:col-span-3">
            <ServiceGrid categoryId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
