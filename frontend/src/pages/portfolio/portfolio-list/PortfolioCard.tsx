import { Add, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC, PropsWithChildren, useState } from "react";
import { UIColorUnion } from "types/ui-base-types";
import PortfolioCardContentRowContainer from "./PortfolioCardContentRowContainer";

const PortfolioCard: FC<PropsWithChildren<{ title?: string; color?: UIColorUnion }>> = ({
	title = "SMSF Universe",
	color = UIColorUnion.primary,
}) => {
	const theme = useTheme();

	const [isOpen, setIsOpen] = useState(false);

	const handleToggleOpen = () => {
		setIsOpen((s = false) => !s);
	};

	return (
		<Box>
			<table border={0} style={{ width: "100%", borderCollapse: "collapse" }}>
				<tbody>
					<tr
						style={{
							background: theme.palette[color].main,
							color: theme.palette[color].contrastText,
							padding: 8,
							borderBottom: `solid 1px white`,
						}}
					>
						<td width="2%">
							<IconButton size="small" color="inherit" onClick={handleToggleOpen}>
								<ArrowForwardIos />
							</IconButton>
						</td>
						<td width="8%">
							<Typography variant="body2">{title}</Typography>
						</td>
						<td width="45%">
							<Typography variant="body2" sx={{ opacity: 0.5 }}>
								NameCodeQuantityAve
							</Typography>
							<Typography variant="body2">Jane Smith</Typography>
						</td>
						<td width="35%">
							<Typography variant="body2" sx={{ opacity: 0.5 }}>
								NameCodeQuantityAve
							</Typography>
						</td>
					</tr>

					{/* Collapse Content */}
					<PortfolioCardContentRowContainer open={isOpen} left={"content"} right={"right content"} />
					<PortfolioCardContentRowContainer open={isOpen} right={<Divider />} />
					<PortfolioCardContentRowContainer
						open={isOpen}
						left={
							<Grid container>
								<Grid item>
									<Button size="small" color="inherit" endIcon={<Add />}>
										Add Investment
									</Button>
								</Grid>
								<Grid item>
									<Button size="small" color="inherit" endIcon={<Add />}>
										Add Income
									</Button>
								</Grid>
							</Grid>
						}
						right={<Divider />}
					/>
				</tbody>
			</table>
		</Box>
	);
};

export default PortfolioCard;
