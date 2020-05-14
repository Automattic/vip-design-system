/** @jsx jsx */
import { jsx } from "theme-ui";

import { Heading } from "..";
import { MdErrorOutline } from "react-icons/md";

const Validation = ({ children, ...props }) => (
  <Heading variant="h5" as="p" sx={{ color: "red.50" }} {...props}>
    <MdErrorOutline sx={{ mr: 1, position: "relative", top: "0.125em" }} />
    {children}
  </Heading>
);

export { Validation };
