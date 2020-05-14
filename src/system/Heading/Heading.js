/** @jsx jsx */
import { jsx, Heading as ThemeHeading } from "theme-ui";

const Heading = ({ variant = "h3", sx, ...props }) => (
  <ThemeHeading
    as={variant}
    {...props}
    sx={{
      color: "heading",
      // pass variant prop to sx
      variant: `text.${variant}`,
      ...sx
    }}
  />
);

export { Heading };
