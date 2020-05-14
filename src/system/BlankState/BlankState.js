/** @jsx jsx */
import { jsx } from "theme-ui";

import { Card, Heading, Text } from "..";

const BlankState = ({ image, title, body, cta }) => {
  return (
    <Card variant="secondary" sx={{ textAlign: "center", padding: 5 }}>
      <img src={image} sx={{ mb: 3 }} />
      <Heading variant="h4">{title}</Heading>
      <Text>{body}</Text>
      {cta}
    </Card>
  );
};

export { BlankState };
