import React from "react";
import { ThemeProvider, useColorMode } from "theme-ui";
import { addDecorator } from "@storybook/react";
import { Button, Box, theme, Link } from "../src/system";

const ThemeChanger = () => {
	const [colorMode, setColorMode] = useColorMode();

	const setDarkMode = (isDark) => setColorMode(isDark ? "dark" : "default");

	return (
		<Link
			href="#!"
			onClick={(e) => {
				e.preventDefault();
				setDarkMode(colorMode == "dark" ? false : true);
			}}
		>
			<Button sx={{ position: "fixed", right: 106, top: 36 }}>
				Toggle
			</Button>
		</Link>
	);
};

addDecorator((story) => (
	<React.Fragment>
		<ThemeProvider theme={theme}>
			<ThemeChanger />
			<Box sx={{ p: 4, height: "100vh" }}>{story()}</Box>
		</ThemeProvider>
	</React.Fragment>
));
