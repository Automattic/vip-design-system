/** @jsx jsx */
/**
 * External dependencies
 */
import React from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { MdArrowForward } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Box, WizardStep, Flex, WizardStepHorizontal } from '..';

const Wizard = ( { steps, activeStep, variant, completed = [], ...props } ) => {
	console.log( typeof activeStep );
	return (
		<Box>
			{ variant === 'horizontal' ? (
				<Box>
					<Flex
						sx={ {
							flex: '0 0 auto',
						} }
						{ ...props }
					>
						{steps.map( ( { title, subTitle, children }, index ) => (
							<React.Fragment key={ index }>
								<WizardStepHorizontal
									active={index === activeStep}
									title={title}
									subTitle={subTitle}
								/>
								{ index < steps.length - 1 && (
									<MdArrowForward sx={ { mx: 2, color: 'grey.80' } } />
								) }
							</React.Fragment>
						) ) }
					</Flex>
					{ steps[ activeStep ].children }
				</Box>
			) : (
				steps.map( ( { title, subTitle, children }, index ) => (
					<WizardStep
						active={ index === activeStep }
						title={ title }
						subTitle={ subTitle }
						complete={ completed.includes( index ) }
						key={ index }
					>
						{ children }
					</WizardStep>
				) )
			) }
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
