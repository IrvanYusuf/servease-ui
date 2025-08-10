import CardFilter from "./filter/card-filter";
import ModalCreateService from "./modal/modal-create-service";
import CardServiceTable from "./table/card-service-table";

export function DashboardServiceList() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-end">
        <ModalCreateService />
      </div>
      {/* Actions and Filters */}
      <CardFilter />

      {/* Service Table */}
      <CardServiceTable />
    </div>
  );
}
