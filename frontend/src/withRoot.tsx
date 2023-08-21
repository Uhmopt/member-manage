import * as React from "react";

// material-ui
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { clientTheme } from "themes/muiTheme";

// global custom theme

// ==============================|| APPLICATION ROOT ||============================== //
const withRoot = (Component: React.FC) => {
	function WithRoot(props: object) {
		return (
			<ThemeProvider theme={clientTheme}>
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithRoot;
};

export default withRoot;
