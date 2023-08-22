import { Close, KeyboardDoubleArrowRight, Save } from "@mui/icons-material";
import { Button, Divider, Drawer, Grid, IconButton, Typography, Zoom } from "@mui/material";
import LoaderContainer from "components/loading/LoaderContainer";
import { FC, PropsWithChildren, ReactNode } from "react";

export type WidthSize = "medium" | "wide" | "thin";

const DrawerContainer: FC<
	PropsWithChildren<{
		open?: boolean;
		onClose?: () => void;
		title?: string;
		anchor?: "top" | "right" | "bottom" | "left" | undefined;
		onSave?: () => void;
		isLoading?: boolean;
		widthSize?: WidthSize;
		saveIcon?: ReactNode;
		saveLabel?: string;
	}>
> = ({
	open = false,
	onSave,
	onClose = () => null,
	title = "",
	anchor = "right",
	children,
	isLoading = false,
	widthSize = "medium",
	saveIcon = <Save />,
	saveLabel = "Save",
}) => {
	return (
		<Drawer anchor={anchor} open={open} onClose={() => onClose()}>
			<LoaderContainer open={isLoading}>
				<div className={`${widthSize === "wide" ? "w-100" : widthSize === "thin" ? "w-74" : "w-82"} h-screen flex flex-col gap-3 p-4`}>
					{title ? (
						<Grid container spacing={1} alignItems="center">
							<Grid item>
								<IconButton onClick={() => onClose()}>
									<KeyboardDoubleArrowRight />
								</IconButton>
							</Grid>
							<Grid item>
								<Typography variant="h6">{title}</Typography>
							</Grid>
							<Grid item lg={12} md={12} sm={12} xs={12}>
								<Divider />
							</Grid>
						</Grid>
					) : null}
					<div className="flex-grow overflow-y-auto w-full">{children}</div>
					<Grid container spacing={1} alignItems="center" justifyContent="flex-end">
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<Divider />
						</Grid>
						<Grid item>
							<Zoom in={typeof onSave === "function"}>
								<Button onClick={onSave ? () => onSave() : undefined} startIcon={saveIcon} variant="outlined" color="primary">
									{saveLabel}
								</Button>
							</Zoom>
						</Grid>
						<Grid item>
							<Button onClick={() => onClose()} startIcon={<Close />} variant="outlined" color="inherit">
								Cancel
							</Button>
						</Grid>
					</Grid>
				</div>
			</LoaderContainer>
		</Drawer>
	);
};

export default DrawerContainer;
