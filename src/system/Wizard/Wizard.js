/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Box, WizardStep, WizardHorizontal } from '..';

const Wizard = ( { steps, activeStep, variant, completed = [], className = null, ...props } ) => (
	<Box className={ classNames( 'vip-wizard-component', className ) }>
		{ variant === 'horizontal' ? (
			<WizardHorizontal steps={ steps } activeStep={ activeStep } { ...props } />
		) : (
			steps.map( ( { title, subTitle, children }, index ) => (
				<WizardStep
					active={ index === activeStep }
					aria-current={ index === activeStep || undefined }
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

Wizard.propTypes = {
	steps: PropTypes.array,
	activeStep: PropTypes.number,
	variant: PropTypes.string,
	completed: PropTypes.array,
	className: PropTypes.any,
};

export { Wizard };
