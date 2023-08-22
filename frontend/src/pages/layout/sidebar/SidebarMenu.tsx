import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { UIMenuData } from "types/ui-base-types";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarMenu: FC<PropsWithChildren<{ data?: Array<UIMenuData>; onClick?: (p: UIMenuData) => void }>> = ({
	data = [] as Array<UIMenuData>,
	onClick = () => null,
}) => {
	return (
		<Box>
			{data?.map((item, itemIndex) => {
				return <SidebarMenuItem key={itemIndex} data={item} onClick={onClick} />;
			})}
		</Box>
	);
};

export default SidebarMenu;
