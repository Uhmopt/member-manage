import { Box, Grid, Stack } from "@mui/material";
import ScrollContainer from "components/containers/ScrollContainer";
import { UserProvider } from "context/UserContext";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const bodyContent = children ? children : <Outlet />;

	return (
		<Stack sx={{ height: "100vh", overflow: "hidden" }}>
			<Header />
			<Box flexGrow={1}>
				<Grid container sx={{ height: "100%" }} alignItems="stretch" flexWrap="nowrap">
					<Grid item>
						<Sidebar />
					</Grid>
					<Grid item flexGrow={1}>
						<ScrollContainer>
							<Box sx={{ pt: 4, px: 3 }}>
								<UserProvider relations={["ClientDetail.Service"]}>{bodyContent}</UserProvider>
							</Box>
						</ScrollContainer>
					</Grid>
				</Grid>
			</Box>
			<Footer />
		</Stack>
	);
};

export default Layout;
