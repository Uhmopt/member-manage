import { Box, Grid } from "@mui/material";
import Logo from "components/logo";
import { useNavigate } from "react-router-dom";
import ClientHeaderMenu from "./menu";

const ClientHeader = () => {
	const navigate = useNavigate();

	return (
		<Box sx={{ p: "12px", background: (theme) => theme.palette.common.white }}>
			<Grid container justifyContent="space-between" alignItems="center">
				<Grid item>
					<Logo />
				</Grid>
				<Grid item>
					<ClientHeaderMenu onClick={(value) => navigate(value?.absPath || value?.path || "")} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default ClientHeader;
