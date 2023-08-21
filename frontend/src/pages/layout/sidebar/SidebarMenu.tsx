import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { UIMenuData } from "types/ui-base-types";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarMenu: FC<PropsWithChildren<{ data?: Array<UIMenuData> }>> = ({ data = [] as Array<UIMenuData> }) => {
	return (
		<Box>
			{data?.map((item, itemIndex) => {
				return <SidebarMenuItem key={itemIndex} data={item} />;
			})}
		</Box>
	);
};

export default SidebarMenu;
