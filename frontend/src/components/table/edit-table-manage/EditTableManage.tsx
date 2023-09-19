import { PropsWithChildren } from "react";

// material-ui
import { Box, Grid, Paper, Typography } from "@mui/material";

// state

//types

// project imports
import ActionBarComponent from "components/action-bar/ActionBarComponent";
import EditForm from "components/form/EditForm";
import SearchBox from "components/inputs/SearchBox";
import LoaderContainer from "components/loading/LoaderContainer";
import DrawerContainer, { WidthSize } from "components/modal/DrawerContainer";
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
		idSelector = (p?: T) => p?.id ?? p?._id ?? "",

		drawerWidthSize = WidthSize.Medium,

		headerSX = {},
		getRowStyle,

		readOnly = false,

		hidePageTitle = false,
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
		selectedRows,
		forceRefreshSelection,
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
				{hidePageTitle ? null : (
					<Grid item>
						{titleRender ? (
							titleRender
						) : (
							<Box sx={{ p: 2 }}>
								<Typography variant="body2" fontWeight={700}>
									{title}
								</Typography>
							</Box>
						)}
					</Grid>
				)}
				<Grid item sx={{ ...headerSX }} flexGrow={1}>
					<Paper sx={{ height: "100%", overflow: "hidden", minHeight: 200 }} elevation={0}>
						<Grid sx={{ p: 1 }} container alignItems="center" justifyContent="space-between">
							{isExternalActionBar ? null : (
								<Grid item>
									<ActionBarComponent data={actionBarButtons} showUnderline={false} />
								</Grid>
							)}
							<Grid item>
								<SearchBox size="small" onChange={handleSearch} />
							</Grid>
						</Grid>
						<EditTable<T>
							data={formattedData}
							selectedRows={selectedRows}
							forceRefreshSelection={forceRefreshSelection}
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
					</Paper>
				</Grid>
			</Grid>
		</LoaderContainer>
	);
}

export default EditTableManage;
