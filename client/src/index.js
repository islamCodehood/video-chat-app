import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@mui/styles";
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles";
import "./styles.css";
import { ContextProvider } from "./context";
const theme = unstable_createMuiStrictModeTheme();
ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
