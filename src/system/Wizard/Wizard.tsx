/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { useLayoutEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import { WizardStep, WizardStepProps } from './WizardStep';
import { Box } from '../Box/Box';
import { HeadingProps } from '../Heading/Heading';

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
	/**
	 * Array of zero-based indices for steps that are in an error state. An errored
	 * step shows a red error icon, title, and left border (see WizardStep `error`).
	 * @default []
	 */
	errored?: number[];
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
	 * The heading variant (typographic style) applied to every step title. A step
	 * can override this with its own `titleVariant`.
	 * @default 'h3'
	 */
	titleVariant?: HeadingProps[ 'variant' ];
	/**
	 * The HTML heading element used for every step title, independent of its
	 * visual style — useful for keeping a correct document outline. A step can
	 * override this with its own `titleAs`. Defaults to the value of `titleVariant`.
	 */
	titleAs?: HeadingProps[ 'variant' ];
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
			errored = [],
			className = null,
			titleAutofocus = false,
			showStepText = true,
			summaryAs = 'table',
			titleVariant,
			titleAs,
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
							titleVariant: stepTitleVariant,
							titleAs: stepTitleAs,
							summary,
							onChange,
							actionLabel,
							actionIcon,
							actionDisabled,
							summaryTitle,
						},
						index
					) => (
						<WizardStep
							active={ index === activeStep }
							complete={ completed.includes( index ) }
							skipped={ skipped.includes( index ) }
							error={ errored.includes( index ) }
							key={ index }
							order={ index + 1 }
							totalSteps={ steps.length }
							subTitle={ subTitle }
							title={ title }
							titleVariant={ stepTitleVariant ?? titleVariant }
							titleAs={ stepTitleAs ?? titleAs }
							summary={ summary }
							onChange={ onChange }
							shouldFocusTitle={ titleAutofocus && didMount }
							actionLabel={ actionLabel }
							actionIcon={ actionIcon }
							showStepText={ showStepText }
							summaryAs={ summaryAs }
							summaryTitle={ summaryTitle }
							actionDisabled={ actionDisabled }
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
