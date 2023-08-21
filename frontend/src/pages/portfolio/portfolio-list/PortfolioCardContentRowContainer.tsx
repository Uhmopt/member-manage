import { Collapse } from "@mui/material";
import { COLOR_BLUE_LIGHT } from "constants/colors";
import { FC, PropsWithChildren, ReactNode } from "react";

const PortfolioCardContentRowContainer: FC<PropsWithChildren<{ open?: boolean; left?: ReactNode; right?: ReactNode }>> = ({
	open = false,
	left = null,
	right = null,
}) => {
	return (
		<tr>
			<td></td>
			<td></td>
			<td>
				<Collapse in={open} mountOnEnter>
					<div>{left}</div>
				</Collapse>
			</td>
			<td style={{ background: COLOR_BLUE_LIGHT }}>
				<Collapse in={open} mountOnEnter>
					<div>{right}</div>
				</Collapse>
			</td>
		</tr>
	);
};

export default PortfolioCardContentRowContainer;
