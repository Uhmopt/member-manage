import fieldService from "api/field/field.service";
import { Field } from "api/field/field.types";
import EditTableManage from "components/table/edit-table-manage";
import { FC, PropsWithChildren } from "react";

const FieldsList: FC<PropsWithChildren<{ table_id?: number }>> = ({ table_id = 0 }) => {
	return (
		<EditTableManage<Field>
			apiService={fieldService}
			queryData={{ table_id }}
			title="Field"
			columns={[{ field: "displayName" }, { field: "name" }, { field: "birth" }]}
			fields={[{ displayName: "Column Name" }, { displayName: "Name" }]}
		/>
	);
};

export default FieldsList;
