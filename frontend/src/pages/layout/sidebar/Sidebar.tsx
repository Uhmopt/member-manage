import { Box, Typography } from "@mui/material";
import ScrollContainer from "components/containers/ScrollContainer";
import SidebarMenu from "./SidebarMenu";
import { useNavigate } from "react-router-dom";
import { UIMenuData } from "types/ui-base-types";

const Sidebar = () => {
	const navigate = useNavigate();

	const handleClick = (value: UIMenuData) => {
		if (value.absPath) {
			navigate(value.absPath);
		}
	};

	return (
		<Box
			sx={{ background: (theme) => theme.palette.primary.main, width: 160, height: "100%", color: (theme) => theme.palette.common.white }}
		>
			<Typography variant="body2" fontWeight={700} sx={{ px: 3, py: 1 }}>
				My Details
			</Typography>
			<ScrollContainer>
				<SidebarMenu
					data={[
						{
							label: "Tables",
							name: "Tables",
							path: "/tables",
							absPath: "/tables",
							data: [],
						},
					]}
					onClick={handleClick}
				/>
			</ScrollContainer>
		</Box>
	);
};

export default Sidebar;
