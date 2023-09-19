import { Grid, Paper, Stack, Typography } from "@mui/material";
import { APIResponseCode } from "api/apiResponse";
import tableService from "api/table/table.service";
import { ITable } from "api/table/table.types";
import LoaderContainer from "components/loading/LoaderContainer";
import { useSnackbar } from "notistack";
import FieldsList from "pages/fields/fields-list";
import { FC, PropsWithChildren, useEffect, useState } from "react";

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
				<Typography fontWeight={700}>{data?.display_name ?? ""}</Typography>
				<Paper elevation={0} sx={{ flexGrow: 1 }}>
					{data?.id === table_id ? (
						<Grid container sx={{ height: "100%" }} alignItems="stretch">
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<FieldsList table_id={table_id} />
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}></Grid>
						</Grid>
					) : null}
				</Paper>
			</Stack>
		</LoaderContainer>
	);
};

export default TableEditFormManage;
