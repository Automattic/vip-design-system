import React from "react";

import { action } from "@storybook/addon-actions";
import { Heading } from "..";

export default {
	title: "Heading",
	component: Heading
};

export const Default = () => <Heading variant="h1">Your Applications</Heading>;
