import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { formatArray } from "utils/array.utils";
import { EditTableProps } from "../types";
import "./AgGridStyles.css";
import useEditTable from "./useEditTable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditTable<T = any>(props: EditTableProps<T>, ref?: ForwardedRef<AgGridReact<T>>) {
	const {
		data = [],

		rowSelection = "multiple",
		getRowStyle,

		readOnly = false,

		isRowSelectable = () => true,

		onGridReady = () => null,
	} = props;

	const {
		gridRef,
		defaultColDef,
		formattedColumns,
		handleRowClicked,
		handleRowDbClicked,
		handleCellClicked,
		handleRowSelected,
		handleColumnResized,
	} = useEditTable<T>(props);

	useImperativeHandle(ref, () => gridRef.current as AgGridReact<T>, [gridRef.current]);

	return (
		<Box className="ag-theme-alpine h-full" sx={{ height: "100%" }}>
			<AgGridReact<T>
				ref={gridRef}
				defaultColDef={defaultColDef}
				columnDefs={formattedColumns}
				rowData={formatArray<T>(data)}
				gridOptions={{
					suppressDragLeaveHidesColumns: true,
					suppressRowClickSelection: true,

					onRowClicked: handleRowClicked,
					onRowDoubleClicked: handleRowDbClicked,
					onCellClicked: handleCellClicked,
					onRowSelected: handleRowSelected,

					// // eslint-disable-next-line @typescript-eslint/no-explicit-any
					// onRowSelected: (event: RowSelectedEvent<T, any>) => {
					// 	console.log(event);
					// },

					onColumnResized: handleColumnResized,

					getRowStyle: getRowStyle,

					onGridReady: onGridReady,
					isRowSelectable: isRowSelectable,
					rowSelection: rowSelection,
				}}
				readOnlyEdit={readOnly}
			/>
		</Box>
	);
}

export default forwardRef(EditTable) as <T>(props: EditTableProps<T> & { ref?: ForwardedRef<AgGridReact<T>> }) => JSX.Element;
