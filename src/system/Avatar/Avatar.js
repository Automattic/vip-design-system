/** @jsx jsx */
import { jsx } from "theme-ui";

import avatar from "../../images/avatar.jpg";

const Avatar = ({ size = 32, src = avatar, ...props }) => (
  <img
    src={src}
    sx={{
      borderRadius: 9999,
      height: size,
      width: size,
      border: "2px solid",
      borderColor: "primary",
      display: "block"
    }}
    {...props}
  />
);

export { Avatar };
