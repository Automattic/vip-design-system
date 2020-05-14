/** @jsx jsx */
import { jsx } from "theme-ui";

import { Flex } from "..";

const Tabs = ({ variant = "primary", sx, ...props }) => (
	<Flex
		{...props}
		sx={{
			borderBottom: "2px solid",
			borderColor: "border",
			listStyleType: "none",
			margin: 0,
			padding: 0,
			...sx
		}}
	/>
);

export { Tabs };
