/** @jsx jsx */
import { jsx, Progress as ThemeProgress } from "theme-ui";

import { Box, Heading, Flex, Spinner } from "../";

const Progress = ({ steps, activeStep, ...props }) => (
  <Box>
    <ThemeProgress
      {...props}
      sx={{
        color: "primary",
      }}
    />
    {steps && (
      <Flex sx={{ alignItems: "center", mt: 3 }}>
        <Spinner size={24} />
        <Heading variant="h4" sx={{ ml: 2, mb: 0 }}>
          {`${activeStep + 1} of ${steps.length}`}:{" "}
          <span sx={{ color: "muted" }}>{steps[activeStep]}</span>
        </Heading>
      </Flex>
    )}
  </Box>
);

export { Progress };
