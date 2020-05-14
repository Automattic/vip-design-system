/** @jsx jsx */
import { jsx } from "theme-ui";

import { Heading } from "../";

const TableRow = ({ onClick, head = false, cells }) => {
  const hoverStyles = onClick
    ? { cursor: "pointer", "&:hover": { bg: "hover", borderRadius: 2 } }
    : {};

  return (
    <tr sx={hoverStyles}>
      {cells.map(cell => (
        <td
          sx={{
            px: 3,
            pl: 5,
            py: 2,
            borderBottom: "1px solid",
            borderTop: head ? "1px solid" : "none",
            borderColor: "border"
          }}
        >
          {head ? (
            <Heading variant="caps" as="h5" sx={{ mb: 0 }}>
              {cell}
            </Heading>
          ) : (
            cell
          )}
        </td>
      ))}
    </tr>
  );
};

export { TableRow };
