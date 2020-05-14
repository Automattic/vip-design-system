/** @jsx jsx */
import { jsx } from "theme-ui";

import { Card } from "../";

const Notice = ({ variant = "info", ...props }) => (
	<Card
		sx={{
			borderLeft: "3px solid",
			boxShadow: "none",
			backgroundColor: "hover",
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			pl: 19,
			variant: `notice.${variant}`,
		}}
		{...props}
	/>
);

export { Notice };
