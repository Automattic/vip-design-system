/** @jsx jsx */
import { jsx, Link as ThemeLink } from "theme-ui";

const Link = ({ active = false, ...props }) => (
  <ThemeLink
    {...props}
    sx={{
      color: active ? "heading" : "link",
      textDecoration: "none",
      "&:hover, &:focus": {
        color: "heading",
      },
    }}
  />
);

export { Link };
