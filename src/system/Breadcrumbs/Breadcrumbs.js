/** @jsx jsx */
import { jsx } from "theme-ui";

const Breadcrumbs = props => (
  <div
    sx={{
      fontSize: 0,
      padding: 0,
      bg: "#E8D6C2",
      color: "#503B14",
      py: 1,
      verticalAlign: "middle",
      px: 2,
      display: "inline-block",
      borderRadius: 1,
      fontWeight: "heading"
    }}
    {...props}
  />
);

export { Breadcrumbs };
