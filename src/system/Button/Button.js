/** @jsx jsx */
import { jsx, Button as ThemeButton } from "theme-ui";

const Button = ({ sx, ...props }) => (
  <ThemeButton
    {...props}
    sx={{
      verticalAlign: "middle",
      display: "inline-block",
      ...sx,
    }}
  />
);

export { Button };
