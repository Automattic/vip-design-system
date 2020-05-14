/** @jsx jsx */
import { MdCheckCircle } from "react-icons/md";
import { jsx } from "theme-ui";
import { Card, Heading, Text } from "..";

const WizardStepHorizontal = ({ title, subTitle, active }) => {
  return (
    <Heading
      variant="h4"
      sx={{
        mb: 0,
        display: "flex",
        alignItems: "center",
        color: active ? "heading" : "muted"
      }}
    >
      <MdCheckCircle sx={{ mr: 2 }} />
      {title}
    </Heading>
  );
};

export { WizardStepHorizontal };
