import * as icons from "@mui/icons-material";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { ActionBarButton } from "types/ui-base-types";

const getIcon = (name: string) => {
	return icons[name as keyof typeof icons] || icons.Menu;
};

const ActionBarComponent: FC<PropsWithChildren<{ data?: Array<ActionBarButton>; showUnderline?: boolean }>> = ({
	data = [] as Array<ActionBarButton>,
	showUnderline = true,
}) => {
	return (
		<Box
			sx={{
				color: "#666",
				visibility: "visible",
				border: 0,
				margin: 0,
				width: "100%",
				minHeight: "3rem",
				height: "3rem",
				flex: "0 1 auto",
				marginLeft: 0,
				marginRight: 0,
				borderBottom: showUnderline ? "1px solid rgb(216, 216, 216)" : "none",
				outline: "none",
				display: "flex",
			}}
		>
			{data
				.filter((button) => !button.hidden)
				.sort((a, b) => ((a.order ?? 0) < (b.order ?? 0) ? -1 : 1))
				.map((button, buttonIndex) => {
					const IconComponent = getIcon(button.icon);
					return (
						<Tooltip key={buttonIndex} title={button.title}>
							<Button
								id={button.id}
								onClick={button.action}
								disabled={button.disabled}
								color={button.color ?? "inherit"}
								type={button.type}
								startIcon={<IconComponent />}
								size="small"
							>
								<Typography>{button.title}</Typography>
							</Button>
						</Tooltip>
					);
				})}
		</Box>
	);
};

export default ActionBarComponent;
