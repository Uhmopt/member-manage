import { SxProps, Theme } from "@mui/material";
import {
	CellClickedEvent,
	ColDef,
	ColGroupDef,
	GridReadyEvent,
	IsRowSelectable,
	RowClassParams,
	RowClickedEvent,
	RowDoubleClickedEvent,
	RowStyle,
} from "ag-grid-community";
import { APIService } from "api/api.service";
import { WidthSize } from "components/modal/DrawerContainer";
import { PropsWithChildren, ReactNode } from "react";
import { ActionBarButton, DispatchFunction, FormatFunction, StaticField } from "types/ui-base-types";

export type EditTableProps<T> = PropsWithChildren<{
	data?: Array<T>;
	selectedRows?: Array<T | string>;
	forceRefreshSelection?: number;
	columns?: Array<ColDef<T> | ColGroupDef<T>>;
	rowSelection?: "single" | "multiple";

	onClickRow?: (e: RowClickedEvent<T>) => void;
	onDbClickRow?: (e: RowDoubleClickedEvent<T>) => void;
	onClickCell?: (e: CellClickedEvent<T>) => void;
	onSelectRow?: (p: T) => void;
	onDeSelectRow?: (p: T) => void;
	onSelectRows?: (p: Array<T>) => void;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getRowStyle?: ((params: RowClassParams<T, any>) => RowStyle | undefined) | undefined;

	readOnly?: boolean;

	columnFlex?: boolean;
	isRowSelectable?: IsRowSelectable<T>;
	disableCheckbox?: boolean;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onGridReady?: (event: GridReadyEvent<T, any>) => void;

	idSelector?: (p?: T) => string;

	exportExcel?: boolean;
	exportExcelButton?: ReactNode;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface EditTableManageProps<T = any> {
	apiService: APIService<T>;
	title?: ReactNode;
	titleRender?: ReactNode;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	queryData?: any;
	initFormData?: T;
	columns?: Array<ColDef<T> | ColGroupDef<T>>;
	fields?: Array<Partial<StaticField>>;

	formatOnChange?: FormatFunction<T>;
	formatOnEdit?: FormatFunction<T>;

	isInitLoad?: boolean;
	preData?: Array<T>;

	rowSelection?: "single" | "multiple";
	enableSubRoute?: boolean;
	forceSubRouteMode?: boolean;

	onLoad?: DispatchFunction<Array<T>>;
	onDbClickRow?: (p: RowDoubleClickedEvent<T>) => void;
	onOpenEdit?: (p: T) => void;
	onSelect?: (value: Array<T>) => void;

	preventOpenEdit?: boolean;

	onSaved?: DispatchFunction<T>;
	onDeleted?: DispatchFunction<T>;
	onDeleteFailed?: (p: T) => void;

	isLoading?: boolean;

	editIcon?: string;
	editLabel?: string;
	deleteTitle?: string;
	deleteMessage?: string;
	disableActions?: {
		add?: boolean | ((p: T) => boolean);
		edit?: boolean | ((p: T) => boolean);
		delete?: boolean | ((p: T) => boolean);
		saveButton?: boolean | ((p: T) => boolean);
	};
	additionalButtons?: Array<ActionBarButton>;
	isExternalActionBar?: boolean;

	filterFunction?: FormatFunction<Array<T>>;

	idSelector?: (p?: T) => string;

	drawerWidthSize?: WidthSize;
	forceInit?: number;

	// style

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getRowStyle?: ((params: RowClassParams<T, any>) => RowStyle | undefined) | undefined;

	headerSX?: SxProps<Theme>;

	readOnly?: boolean;

	reloadAfterUpdate?: boolean;
	reloadAfterCloseUpdate?: boolean;

	editOnDbClick?: boolean;

	actionLabeling?: boolean;

	forceRefreshSelection?: number;

	hidePageTitle?: boolean;
}

export enum OnSaveNames {
	CREATE = "CREATE",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
}
