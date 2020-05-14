/** @jsx jsx */
import { jsx } from "theme-ui";

const Input = props => (
  <input
    {...props}
    sx={{
      border: "1px solid",
      borderColor: "border",
      backgroundColor: "card",
      borderRadius: 1,
      lineHeight: "inherit",
      px: 3,
      py: 2,
      fontSize: 2,
      mb: 2,
      color: "text",
      display: "block",
      width: "100%",
      "&:focus": {
        borderColor: "brand.60",
        outline: "none"
      }
    }}
  />
);

export { Input };
