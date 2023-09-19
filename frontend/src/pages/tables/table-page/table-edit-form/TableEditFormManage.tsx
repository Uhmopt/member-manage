import { Box, Stack, Typography } from "@mui/material";
import { APIResponseCode } from "api/apiResponse";
import tableService from "api/table/table.service";
import { ITable } from "api/table/table.types";
import LoaderContainer from "components/loading/LoaderContainer";
import { useSnackbar } from "notistack";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const TableEditFormManage: FC<PropsWithChildren<{ table_id?: number }>> = ({ table_id = 0 }) => {
	const { enqueueSnackbar } = useSnackbar();

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<ITable>({} as ITable);

	const loadData = async () => {
		setIsLoading(true);
		const res = await tableService.get({ id: table_id });
		if (res.code === APIResponseCode.SUCCESS) {
			setData((res.data ?? {}) as ITable);
		} else {
			enqueueSnackbar(res.message, { variant: "warning" });
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (table_id) {
			loadData();
		}
	}, [table_id]);

	return (
		<LoaderContainer open={isLoading} style={{ height: "100%" }}>
			<Stack sx={{ height: "100%" }}>
				<Typography>{data?.displayName ?? ""}</Typography>
				<Box sx={{ flexGrow: 1 }}>{data?.id === table_id ? <Outlet /> : null}</Box>
			</Stack>
		</LoaderContainer>
	);
};

export default TableEditFormManage;
