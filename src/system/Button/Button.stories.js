import React from "react";

import { action } from "@storybook/addon-actions";
import { Button } from "..";

export default {
	title: "Button",
	component: Button
};

export const Default = () => (
	<>
		<Button sx={{ mr: 2 }}>Primary</Button>
		<Button variant="secondary" sx={{ ml: 2 }}>
			Secondary
		</Button>
	</>
);
