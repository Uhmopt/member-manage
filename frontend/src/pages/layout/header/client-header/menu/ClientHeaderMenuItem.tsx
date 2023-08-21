import { Box, Typography } from "@mui/material";
import { COLOR_HEADER_MENU } from "constants/colors";
import { FC, PropsWithChildren, useState } from "react";
import { UIMenuData } from "types/ui-base-types";

const ClientHeaderMenuItem: FC<PropsWithChildren<{ data?: UIMenuData; isActive?: boolean; onClick?: () => void }>> = ({
	data = {} as UIMenuData,
	isActive = false,
	onClick = () => null,
}) => {
	const [isHover, setIsHover] = useState(false);

	const handleClick = () => {
		onClick();
	};

	return (
		<Box
			sx={{
				color: COLOR_HEADER_MENU,
				padding: "8px",
				cursor: "pointer",
				borderBottom: "solid 1px transparent",
				...(isActive ? { borderBottom: (theme) => `solid 1px ${theme.palette.primary.main}` } : {}),
				...(isHover ? { color: (theme) => theme.palette.primary.main } : {}),
			}}
			onClick={handleClick}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Typography variant="body1">{data?.label ?? ""}</Typography>
		</Box>
	);
};

export default ClientHeaderMenuItem;
