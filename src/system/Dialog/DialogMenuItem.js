/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useRef } from "react";

import { Box } from "../";

const DialogMenuItem = (props) => {
  const itemRef = useRef(null);

  const triggerClick = (e) => {
    if (
      itemRef.current == document.activeElement &&
      (e.key === 13 || e.key == "Enter")
    )
      props.onClick();
  };

  useEffect(() => {
    if (props.onClick) document.addEventListener("keydown", triggerClick, true);

    return () => {
      document.removeEventListener("keydown", triggerClick, true);
    };
  }, []);

  return (
    <li role="none">
      <Box
        ref={itemRef}
        role="menuitem"
        tabIndex="0"
        sx={{
          listStyleType: "none",
          display: "block",
          m: 0,
          px: 3,
          py: 2,
          cursor: "pointer",
          "&:hover, &:focus": { backgroundColor: "border", outline: "none" },
        }}
        {...props}
      />
    </li>
  );
};

export { DialogMenuItem };
