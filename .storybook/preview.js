import React from "react";
import { ThemeProvider, useColorMode } from "theme-ui";
import { addDecorator } from "@storybook/react";
import { Box, theme } from "../src/system";

const ThemeChanger = () => {
	const [colorMode, setColorMode] = useColorMode()

  return (
    <button
      onClick={(e) => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light')
      }}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </button>
  )
};

addDecorator((story) => (
	<React.Fragment>
		<ThemeProvider theme={theme}>
			{/* <ThemeChanger /> */}
			<Box sx={{ p: 4, height: "100vh" }}>{story()}</Box>
		</ThemeProvider>
	</React.Fragment>
));
