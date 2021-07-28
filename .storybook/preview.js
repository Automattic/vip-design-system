import { jsx, ThemeProvider, useColorMode } from "theme-ui";
import React from "react";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { addDecorator } from "@storybook/react";
import { Box, Link, theme } from "../src/system";

const ThemeChanger = () => {
	const [colorMode, setColorMode] = useColorMode();

	const setDarkMode = (isDark) => setColorMode(isDark ? "dark" : "default");

	const ToggleIcon = colorMode == "dark" ? WbSunnyIcon : Brightness2Icon;

	return (
		<Link
			href="#!"
			onClick={(e) => {
				e.preventDefault();
				setDarkMode(colorMode == "dark" ? false : true);
			}}
		>
			<ToggleIcon sx={{ position: "fixed", right: 106, top: 36 }}>
				Toggle
			</ToggleIcon>
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
