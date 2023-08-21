import { Grid } from "@mui/material";
import { UIMenuData } from "types/ui-base-types";
import ClientHeaderMenuItem from "./ClientHeaderMenuItem";
import { FC, PropsWithChildren } from "react";

const ClientHeaderMenu: FC<PropsWithChildren<{ onClick?: (value?: UIMenuData, valueIndex?: number) => void }>> = ({
	onClick = () => null,
}) => {
	return (
		<Grid container spacing={1}>
			{(
				[
					{ label: "My Details" },
					{ label: "Portfolio", path: "portfolio" },
					{ label: "Dreams" },
					{ label: "Goals" },
					{ label: "Personal" },
					{ label: "Super" },
					{ label: "Reports" },
					{ label: "Shop" },
					{ label: "Apply" },
				] as Array<UIMenuData>
			).map((item, itemIndex) => {
				return (
					<Grid item key={itemIndex}>
						<ClientHeaderMenuItem data={item} onClick={() => onClick(item, itemIndex)} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default ClientHeaderMenu;
