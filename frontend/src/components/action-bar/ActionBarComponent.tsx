import styled from "@emotion/styled";
import * as icons from "@mui/icons-material";
import { Button, Tooltip, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { ActionBarButton } from "types/ui-base-types";

const ActionBarWrapper = styled.div`
	color: #666;
	visibility: visible;
	border: 0;
	margin: 0;
	width: 100%;
	min-height: 3rem;
	height: 3rem;
	flex: 0 1 auto;
	margin-left: 0px;
	margin-right: 0px;
	border-bottom: 1px solid rgb(216, 216, 216);
	outline: none;
	display: flex;
`;
// background-color: rgb(255, 255, 255);

const getIcon = (name: string) => {
	return icons[name as keyof typeof icons] || icons.Menu;
};

const ActionBarComponent: FC<PropsWithChildren<{ data?: Array<ActionBarButton> }>> = ({ data = [] as Array<ActionBarButton> }) => {
	return (
		<ActionBarWrapper>
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
							>
								<Typography variant="body1">{button.title}</Typography>
							</Button>
						</Tooltip>
					);
				})}
		</ActionBarWrapper>
	);
};

export default ActionBarComponent;
