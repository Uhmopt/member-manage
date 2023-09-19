import { useParams } from "react-router-dom";
import TableEditFormManage from "./table-edit-form/TableEditFormManage";

const TablePage = () => {
	const { table_id = "" } = useParams();

	return <TableEditFormManage table_id={parseInt(table_id)} />;
};

export default TablePage;
