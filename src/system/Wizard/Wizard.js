/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { Box, WizardStep, Flex, WizardStepHorizontal } from '..';
import { MdArrowForward } from 'react-icons/md';

const Wizard = ( { steps, activeStep, variant, completed = [], ...props } ) => {
	return (
		<Box>
			{variant === 'horizontal' ? (
				<Box>
					<Flex
						sx={{
							flex: '0 0 auto',
						}}
						{...props}
					>
						{steps.map( ( { title, subTitle, children }, index ) => (
							<>
								<WizardStepHorizontal
									active={index === activeStep}
									title={title}
									key={index}
									subTitle={subTitle}
								/>
								{index < steps.length - 1 && (
									<MdArrowForward
										sx={{ mx: 2, color: 'grey.80' }}
									/>
								)}
							</>
						) )}
					</Flex>
					{steps[ activeStep ].children}
				</Box>
			) : (
				steps.map( ( { title, subTitle, children }, index ) => (
					<WizardStep
						active={index === activeStep}
						title={title}
						subTitle={subTitle}
						complete={completed.includes( index )}
						key={index}
					>
						{children}
					</WizardStep>
				) )
			)}
		</Box>
	);
};

Wizard.propTypes = {
	steps: PropTypes.array,
	activeStep: PropTypes.number,
	variant: PropTypes.string,
	completed: PropTypes.array,
};

export { Wizard };
