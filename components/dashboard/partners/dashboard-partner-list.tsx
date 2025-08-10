import CardFilter from "./filter/card-filter";
import CardPartnerTable from "./table/card-partner-table";
import ModalCreatePartner from "./modal/modal-create-partner";

export function DashboardPartnerList() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-end">
        <ModalCreatePartner />
      </div>
      {/* Actions and Filters */}
      <CardFilter />

      {/* Partners Table */}
      <CardPartnerTable />
    </div>
  );
}
