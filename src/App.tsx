import React, { FC } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";

//TODO - move this to seperate theme file
const theme = createTheme({
	palette: {
		primary: {
			main: "#FFFFFF",
		},
		secondary: {
			main: "#000000",
		},
	},
	components: {
		MuiToolbar: {
			styleOverrides: {
				root: {
					height: "66px",
					minHeight: "66px",
					"@media(min-width:600px)": {
						minHeight: "66px",
					},
				},
			},
		},
	},
});

const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<AppNavbar message={""} />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
};

export default App;
