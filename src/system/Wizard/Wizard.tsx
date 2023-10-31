/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { useLayoutEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import { WizardStepProps } from './WizardStep';
import { Box, WizardStep } from '..';

export interface WizardProps {
	steps: WizardStepProps[];
	activeStep?: number;
	completed?: number[];
	skipped?: number[];
	className?: string;
	titleAutofocus?: boolean;
}
export const Wizard = React.forwardRef< HTMLDivElement, WizardProps >(
	(
		{ steps, activeStep, completed = [], skipped = [], className = null, titleAutofocus = false },
		forwardRef
	) => {
		const [ didMount, setDidMount ] = useState( false );
		const [ initialStep ] = useState( activeStep );
		// didMount helps us to track the initial render, so we can focus the title only subsequent renders
		// to avoid stealing the focus from the page we're in.
		useLayoutEffect( () => {
			if ( ! didMount && activeStep !== initialStep ) {
				setDidMount( true );
			}
		}, [ initialStep, activeStep, didMount, setDidMount ] );
		return (
			<Box className={ classNames( 'vip-wizard-component', className ) } ref={ forwardRef }>
				{ steps.map( ( { title, subTitle, children, titleVariant, summary, onChange }, index ) => (
					<WizardStep
						active={ index === activeStep }
						complete={ completed.includes( index ) }
						skipped={ skipped.includes( index ) }
						key={ index }
						order={ index + 1 }
						totalSteps={ steps.length }
						subTitle={ subTitle }
						title={ title }
						titleVariant={ titleVariant }
						summary={ summary }
						onChange={ onChange }
						shouldFocusTitle={ titleAutofocus && didMount }
					>
						{ children }
					</WizardStep>
				) ) }
			</Box>
		);
	}
);

Wizard.displayName = 'Wizard';
