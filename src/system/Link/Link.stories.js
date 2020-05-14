import React from "react";

import { action } from "@storybook/addon-actions";
import { Link } from "..";

export default {
	title: "Link",
	component: Link,
};

export const Default = () => (
	<Link as="a" href="#!">
		Hello
	</Link>
);
