import React from "react";

import { action } from "@storybook/addon-actions";
import { Link, BlankState } from "..";

export default {
	title: "BlankState",
	component: BlankState,
};

export const Default = () => (
	<BlankState
		title="Power up your application"
		body="Add-ons give you the ability to bolt on extra capabilities to
your application, including logging, analytics and performance
monitoring."
		cta={<Link as="a">Explore add-ons →</Link>}
	/>
);
