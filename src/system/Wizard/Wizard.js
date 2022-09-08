/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MdArrowForward } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Box, WizardStep, Flex, WizardStepHorizontal } from '..';

const Wizard = ( { steps, activeStep, variant, completed = [], className = null, ...props } ) => {
	return (
		<Box className={ classNames( 'vip-wizard-component', className ) }>
			{ variant === 'horizontal' ? (
				<Box>
					<Flex
						sx={ {
							flex: '0 0 auto',
						} }
						{ ...props }
					>
						{ steps.map( ( { title, subTitle, titleVariant }, index ) => (
							<React.Fragment key={ index }>
								<WizardStepHorizontal
									active={ index === activeStep }
									order={ index + 1 }
									subTitle={ subTitle }
									title={ title }
									titleVariant={ titleVariant }
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
				steps.map( ( { title, subTitle, children, titleVariant }, index ) => (
					<WizardStep
						active={ index === activeStep }
						complete={ completed.includes( index ) }
						key={ index }
						order={ index + 1 }
						subTitle={ subTitle }
						title={ title }
						titleVariant={ titleVariant }
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
	className: PropTypes.any,
};

export { Wizard };
