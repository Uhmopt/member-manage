import fieldService from "api/field/field.service";
import { Field } from "api/field/field.types";
import EditTableManage from "components/table/edit-table-manage";

const FieldsList = () => {
	return (
		<EditTableManage<Field>
			apiService={fieldService}
			title="Fields & Columns"
			columns={[{ field: "displayName" }, { field: "name" }, { field: "birth" }]}
			fields={[{ displayName: "Column Name" }, { displayName: "Name" }]}
		/>
	);
};

export default FieldsList;
