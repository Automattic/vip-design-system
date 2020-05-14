/** @jsx jsx */
import { jsx, Text as ThemeText } from "theme-ui";

const Text = ({ sx, ...props }) => (
	<ThemeText
		as="p"
		{...props}
		sx={{
			lineHeight: 1.5,
			fontSize: 2,
			marginBottom: 2,
			...sx
		}}
	/>
);

export { Text };
