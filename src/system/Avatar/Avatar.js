/** @jsx jsx */
import { jsx } from "theme-ui";

const Avatar = ({ size = 32, src = null, ...props }) => (
	<img
		src={src}
		sx={{
			borderRadius: 9999,
			height: size,
			width: size,
			border: "2px solid",
			borderColor: "primary",
			display: "block",
		}}
		{...props}
	/>
);

export { Avatar };
