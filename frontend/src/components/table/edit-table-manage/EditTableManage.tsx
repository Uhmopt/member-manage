import { PropsWithChildren } from "react";

// material-ui
import { Grid, Typography } from "@mui/material";

// state

//types

// project imports
import ActionBarComponent from "components/action-bar/ActionBarComponent";
import EditForm from "components/form/EditForm";
import SearchBox from "components/inputs/SearchBox";
import LoaderContainer from "components/loading/LoaderContainer";
import DrawerContainer from "components/modal/DrawerContainer";
import EditTable from "../edit-table/EditTable";
import { EditTableManageProps } from "../types";
import useEditTableManage from "./useEditTableManage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditTableManage<T = any>(props: PropsWithChildren<EditTableManageProps>) {
	const {
		title = "",
		titleRender = null,

		columns = [],
		fields = [],

		rowSelection = "multiple",

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		idSelector = (p?: T) => p?.Id ?? p?._id ?? "",

		drawerWidthSize = "medium",

		headerSX = {},
		getRowStyle,

		readOnly = false,
	} = props;

	const {
		openLoading,
		isOpen,
		handleSave,
		formData,
		handleChangeForm,
		isExternalActionBar,
		actionBarButtons,
		formattedData,
		// selectedRows,
		handleClickRow,
		handleDbClickRow,
		handleSelectRow,
		handleSelectRows,
		handleSearch,
		handleClose,
	} = useEditTableManage<T>(props);

	return (
		<LoaderContainer open={openLoading} style={{ height: "100%" }}>
			<DrawerContainer
				title={`${title} Properties`}
				open={isOpen}
				onClose={handleClose}
				onSave={handleSave}
				isLoading={openLoading}
				widthSize={drawerWidthSize}
			>
				<EditForm<T> data={formData} onChange={handleChangeForm} fields={fields} readOnly={readOnly} />
			</DrawerContainer>

			<Grid container direction={"column"} id="page-container" className="h-full">
				{isExternalActionBar ? null : (
					<Grid item>
						<ActionBarComponent data={actionBarButtons} />
					</Grid>
				)}
				<Grid item sx={{ p: 1, pt: 2, ...headerSX }}>
					<Grid container alignItems="center" justifyContent="space-between">
						<Grid item>{titleRender ? titleRender : <Typography variant="body2">{title}</Typography>}</Grid>
						<Grid item>
							<SearchBox size="small" onChange={handleSearch} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item sx={{ p: 1, flexGrow: 1 }}>
					<EditTable<T>
						data={formattedData}
						// selectedRows={selectedRows}
						columns={columns}
						onClickRow={handleClickRow}
						onDbClickRow={handleDbClickRow}
						onSelectRow={handleSelectRow}
						onSelectRows={handleSelectRows}
						rowSelection={rowSelection}
						readOnly={readOnly}
						getRowStyle={getRowStyle}
						idSelector={idSelector}
					/>
				</Grid>
			</Grid>
		</LoaderContainer>
	);
}

export default EditTableManage;
