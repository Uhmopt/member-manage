import {
	CellClickedEvent,
	ColDef,
	ColGroupDef,
	ColumnResizedEvent,
	RowClickedEvent,
	RowDoubleClickedEvent,
	RowSelectedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { EditTableProps } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useEditTable<T = any>(props: EditTableProps<T>) {
	const {
		selectedRows: propsSelectedRows = [],
		forceRefreshSelection = 1,
		columns = [],

		onClickRow,
		onDbClickRow,
		onClickCell,
		onSelectRow,
		onDeSelectRow,
		onSelectRows,

		columnFlex = true,
		disableCheckbox = false,

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		idSelector = (p?: T) => p?.id ?? p?._id ?? "",
	} = props;

	const gridRef = useRef<AgGridReact<T>>(null);

	const isSelectable = useMemo<boolean>(
		() => !disableCheckbox && (!!onSelectRow || !!onSelectRows),
		[disableCheckbox, onSelectRow, onSelectRows],
	);

	const [selectedRows, setSelectedRows] = useState<Array<T | string>>([]);

	const defaultColDef = useMemo<ColDef<T>>(() => {
		return {
			flex: columnFlex ? 1 : undefined,
			filter: true,
			filterParams: { buttons: ["reset", "apply", "cancel"] },
			resizable: true,
			sortable: true,
		};
	}, [columnFlex]);

	const formattedColumns = useMemo<Array<ColDef<T> | ColGroupDef<T>>>(
		() =>
			columns.map((column, columnIndex) => {
				if (columnIndex === 0) {
					if (isSelectable) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						column.checkboxSelection = true;
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						column.headerCheckboxSelection = true;
					}
				}
				return column;
			}),
		[columns, isSelectable],
	);

	/** Event Handlers  */

	const handleRowClicked = (e: RowClickedEvent<T>) => {
		if (onClickRow) {
			onClickRow(e);
		}
	};
	const handleRowDbClicked = (e: RowDoubleClickedEvent<T>) => {
		if (onDbClickRow) {
			onDbClickRow(e);
		}
	};
	const handleCellClicked = (e: CellClickedEvent<T>) => {
		if (onClickCell) {
			onClickCell(e);
		}
	};

	const refreshSelection = (value = [] as Array<T | string>) => {
		if (!value?.length) {
			const currentSelected = gridRef?.current?.api?.getSelectedRows() ?? [];
			if (currentSelected?.length) {
				gridRef?.current?.api?.deselectAll();
			}
		} else {
			gridRef?.current?.api?.forEachNode((node) => {
				const isChecked = value.some((item: string | T) => idSelector(node?.data) === (typeof item === "string" ? item : idSelector(item)));

				node.setSelected(isChecked);
			});
		}
	};

	const handleRowSelected = (e: RowSelectedEvent<T>) => {
		if (e.source === "api") {
			return;
		}
		const isSelected = e.node.isSelected();

		const currentSelected = e.api.getSelectedRows();
		setSelectedRows(currentSelected);

		if (e?.data) {
			const targetItem = e.data;

			// emit event to parent
			if (isSelected) {
				if (onSelectRow) {
					onSelectRow(targetItem);
				}
			} else {
				if (onDeSelectRow) {
					onDeSelectRow(targetItem);
				}
			}
		}

		if (onSelectRows) {
			onSelectRows(currentSelected);
		}
	};

	const handleColumnResized = (e: ColumnResizedEvent<T>) => {
		e.api.refreshCells();
	};

	useEffect(() => {
		if (forceRefreshSelection) {
			refreshSelection(selectedRows);
		}
	}, [selectedRows, forceRefreshSelection]);

	useEffect(() => {
		if (propsSelectedRows?.length) {
			setSelectedRows(propsSelectedRows);
		} else if (selectedRows.length) {
			setSelectedRows([]);
		}
	}, [JSON.stringify(propsSelectedRows)]);

	return {
		gridRef,
		defaultColDef,
		formattedColumns,
		handleRowClicked,
		handleRowDbClicked,
		handleCellClicked,
		handleRowSelected,
		handleColumnResized,
	};
}

export default useEditTable;
