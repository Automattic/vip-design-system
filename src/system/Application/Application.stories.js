import React from "react";

import { action } from "@storybook/addon-actions";
import { Box, Application } from "..";

const app = {
	title: "Facebook About",
	url: "about.fb.com",
	screenshot:
		"http://image.thum.io/get/width/800/crop/600/https://about.fb.com/"
};

export default {
	title: "Application",
	component: Application
};

export const Default = () => (
	<Box sx={{ width: 320 }}>
		<Application app={app} />
	</Box>
);
