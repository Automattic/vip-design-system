/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import { Box, WizardStep, Flex, WizardStepHorizontal } from "..";
import { MdCheckCircle, MdArrowForward } from "react-icons/md";

const Wizard = ({ steps, activeStep, variant, completed = [], ...props }) => {
  return (
    <Box>
      {variant == "horizontal" ? (
        <Box>
          <Flex
            sx={{
              flex: "0 0 auto",
            }}
            {...props}
          >
            {steps.map(({ title, subTitle, children }, index) => (
              <>
                <WizardStepHorizontal
                  active={index == activeStep}
                  title={title}
                  subTitle={subTitle}
                />
                {index < steps.length - 1 && (
                  <MdArrowForward sx={{ mx: 2, color: "grey.80" }} />
                )}
              </>
            ))}
          </Flex>
          {steps[activeStep].children}
        </Box>
      ) : (
        steps.map(({ title, subTitle, children }, index) => (
          <WizardStep
            active={index == activeStep}
            title={title}
            subTitle={subTitle}
            children={children}
            complete={completed.includes(index)}
          />
        ))
      )}
    </Box>
  );
};

export { Wizard };
