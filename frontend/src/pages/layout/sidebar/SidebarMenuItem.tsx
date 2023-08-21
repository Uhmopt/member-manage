import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Collapse, Grid, Typography } from "@mui/material";
import { COLOR_SIDEBAR_ACTIVE } from "constants/colors";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { UIMenuData } from "types/ui-base-types";
import SidebarMenu from "./SidebarMenu";

const SidebarMenuItem: FC<PropsWithChildren<{ data?: UIMenuData; isActive?: boolean }>> = ({
	data = {} as UIMenuData,
	isActive: propsIsActive = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const isActive = useMemo(() => propsIsActive || isOpen, [propsIsActive, isOpen]);
	const hasSub = useMemo(() => !!data?.data?.length, [data?.data?.length]);

	const handleToggle = () => {
		setIsOpen((s = false) => !s);
	};

	return (
		<Box>
			<Grid
				container
				alignItems="center"
				flexWrap="nowrap"
				sx={{
					cursor: "pointer",
					p: 1,
					borderBottom: `solid 1px transparent`,
					...(isActive
						? {
								color: (theme) => theme.palette.primary.main,
								background: COLOR_SIDEBAR_ACTIVE,
								borderBottom: (theme) => `solid 1px ${theme.palette.primary.main}`,
						  }
						: {}),
				}}
				onClick={handleToggle}
			>
				<Grid item>
					<ArrowForwardIos />
				</Grid>
				<Grid item sx={{ pl: 1 }}>
					<Typography>{data?.label ?? ""}</Typography>
				</Grid>
			</Grid>
			{hasSub ? (
				<Collapse in={isOpen}>
					<Box sx={{ ml: 1 }}>
						<SidebarMenu data={data?.data} />
					</Box>
				</Collapse>
			) : null}
		</Box>
	);
};

export default SidebarMenuItem;
