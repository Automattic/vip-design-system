/** @jsx jsx */
import { jsx } from "theme-ui";
import { Badge, Box, Card, Flex, Heading, Text, Toggle } from "..";

const ToggleRow = ({
  image,
  badge,
  title,
  subTitle,
  body,
  meta,
  to,
  sx,
  ...props
}) => (
  <Flex
    sx={{
      alignItems: "center",
      py: 3,
      borderBottom: "1px solid",
      textDecoration: "none",
      color: "inherit",
      "&:first-child": {
        borderTop: "1px solid",
        borderColor: "border"
      },
      borderColor: "border",
      ...sx
    }}
  >
    {image && (
      <Box sx={{ mr: 3 }}>
        <Card
          sx={{
            p: 3,
            m: 0,
            boxShadow: "low",
            flex: "0 0 auto"
          }}
        >
          <img src={image} width={32} sx={{ display: "block" }} />
        </Card>
      </Box>
    )}

    <Box sx={{ flex: "1 1 auto", mr: 3 }}>
      <Heading variant="h4" sx={{ mb: subTitle || body ? 1 : 0 }}>
        {title}
        {badge && <Badge sx={{ marginLeft: 2 }}>{badge}</Badge>}
      </Heading>
      {subTitle && <Text sx={{ mb: 1, color: "muted" }}>{subTitle}</Text>}
      {body && <Text sx={{ mb: 0 }}>{body}</Text>}
    </Box>
    <Box>
      <Toggle {...props} />
    </Box>
  </Flex>
);

export { ToggleRow };
