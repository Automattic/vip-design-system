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
	/** The array of step configurations to render. */
	steps: WizardStepProps[];
	/** The zero-based index of the currently active step. */
	activeStep?: number;
	/**
	 * Array of zero-based indices for steps that have been completed.
	 * @default []
	 */
	completed?: number[];
	/**
	 * Array of zero-based indices for steps that have been skipped.
	 * @default []
	 */
	skipped?: number[];
	/** Additional CSS class name for the wizard container. */
	className?: string;
	/**
	 * Whether to automatically focus the step title when the active step changes.
	 * @default false
	 */
	titleAutofocus?: boolean;
	/**
	 * Whether to display the "STEP X OF Y" text above each step title.
	 * @default true
	 */
	showStepText?: boolean;
	/**
	 * The HTML element type used to render step summaries.
	 * @default 'table'
	 */
	summaryAs?: 'table' | 'dl';
	/**
	 * The font weight applied to summary values in all steps.
	 * @default 'bold'
	 */
	summaryFontWeight?: React.CSSProperties[ 'fontWeight' ];
	/**
	 * The CSS overflow property for each step container.
	 * @default 'inherit'
	 */
	overflow?: React.CSSProperties[ 'overflow' ];
}

/**
 * A multi-step wizard component that displays a sequence of steps with progress tracking.
 * Supports completed, skipped, and active step states with optional summaries.
 */
export const Wizard = React.forwardRef< HTMLDivElement, WizardProps >(
	(
		{
			steps,
			activeStep,
			completed = [],
			skipped = [],
			className = null,
			titleAutofocus = false,
			showStepText = true,
			summaryAs = 'table',
			summaryFontWeight,
			overflow,
		},
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
				{ steps.map(
					(
						{
							title,
							subTitle,
							children,
							titleVariant,
							summary,
							onChange,
							actionLabel,
							actionIcon,
							actionDisabled,
							summaryTitle,
							summaryFontWeight: stepSummaryFontWeight,
							overflow: stepOverflow,
						},
						index
					) => (
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
							actionLabel={ actionLabel }
							actionIcon={ actionIcon }
							showStepText={ showStepText }
							summaryAs={ summaryAs }
							summaryTitle={ summaryTitle }
							actionDisabled={ actionDisabled }
							summaryFontWeight={ stepSummaryFontWeight || summaryFontWeight }
							overflow={ stepOverflow || overflow }
						>
							{ children }
						</WizardStep>
					)
				) }
			</Box>
		);
	}
);

Wizard.displayName = 'Wizard';
