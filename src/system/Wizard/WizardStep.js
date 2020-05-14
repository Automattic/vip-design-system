/** @jsx jsx */
import { MdCheckCircle } from "react-icons/md";
import { jsx } from "theme-ui";
import { Card, Heading, Text } from "..";

const WizardStep = ({
  title,
  subTitle,
  complete = false,
  children,
  active,
}) => {
  return (
    <Card
      sx={{
        boxShadow: active ? "low" : "none",
        borderLeft: "2px solid",
        p: 4,
        backgroundColor: active ? "card" : "transparent",
        borderRadius: 0,
        borderBottom: active ? "none" : "1px solid",
        "&:first-child": {
          borderTopWidth: active ? "none" : "1px",
          borderTopStyle: active ? "none" : "solid",
        },
        borderColor: active ? "primary" : "border",
        borderLeftColor: active ? "primary" : complete ? "green.40" : "border",
      }}
    >
      <Heading
        variant="h4"
        sx={{
          mb: 0,
          display: "flex",
          alignItems: "center",
          color: complete ? "green.40" : active ? "heading" : "muted",
        }}
      >
        <MdCheckCircle sx={{ mr: 2 }} />
        {title}
      </Heading>
      {subTitle && active && <Text sx={{ mb: 3 }}>{subTitle}</Text>}

      {active && children}
    </Card>
  );
};

export { WizardStep };
