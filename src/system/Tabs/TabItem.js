/** @jsx jsx */
import { jsx } from "theme-ui";

import { Link } from "..";

const TabItem = ({ active = false, variant = "inline", sx, ...props }) => (
  <Link
    variant="h4"
    as="a"
    tabIndex="0"
    {...props}
    sx={{
      cursor: "pointer",
      color: active ? "heading" : "muted",
      mr: 3,
      fontSize: 2,
      pb: 3,
      fontWeight: "heading",
      borderBottom: active ? "2px solid" : "none",
      borderColor: active ? "link" : "none",
      transform: "translateY(2px)",
      ...sx,
    }}
  />
);

export { TabItem };
