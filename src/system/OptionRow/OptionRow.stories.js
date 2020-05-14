import React from "react";

import { action } from "@storybook/addon-actions";
import { OptionRow } from "..";

export default {
	title: "OptionRow",
	component: OptionRow,
};

export const Default = () => (
	<OptionRow
		title="Option Row"
		subTitle="Mostly used to link off to other pages."
		as="a"
	/>
);
