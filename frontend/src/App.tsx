import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import withRoot from "./withRoot";

const App = () => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</SnackbarProvider>
		</LocalizationProvider>
	);
};

export default withRoot(App);
