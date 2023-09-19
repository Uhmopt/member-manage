import tableService from "api/table/table.service";
import { ITable } from "api/table/table.types";
import EditTableManage from "components/table/edit-table-manage";

const TablesList = () => {
	return (
		<EditTableManage<ITable>
			apiService={tableService}
			title="Table"
			columns={[{ field: "display_name" }]}
			fields={[{ displayName: "Display Name", name: "display_name" }]}
			enableSubRoute={true}
		/>
	);
};

export default TablesList;
