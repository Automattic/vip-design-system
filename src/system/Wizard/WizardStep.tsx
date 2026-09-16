/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useLayoutEffect } from 'react';
import { BsCircleFill, BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { DescriptionList } from '../DescriptionList/DescriptionList';
import { Flex } from '../Flex/Flex';
import { Heading, HeadingProps } from '../Heading/Heading';
import { ScreenReaderText } from '../ScreenReaderText';
import { Text } from '../Text/Text';

export interface WizardStepSummary {
	/** The label for the summary item. */
	label?: React.ReactNode;
	/** The value for the summary item. */
	value?: React.ReactNode;
}

export interface WizardStepProps {
	/** Whether this step is the currently active step. */
	active?: boolean;
	/**
	 * Whether this step has been completed.
	 * @default false
	 */
	complete?: boolean;
	/** The 1-based order number of this step. */
	order?: number;
	/** The total number of steps in the wizard. */
	totalSteps?: number;
	/** The title content displayed in the step header. */
	title: React.ReactNode;
	/**
	 * The heading variant used for the step title. Controls the typographic style.
	 * @default 'h3'
	 */
	titleVariant?: HeadingProps[ 'variant' ];
	/**
	 * The HTML heading element used to render the step title, independent of its
	 * visual style. Use this to keep a correct document outline (e.g. render an
	 * `h2` while keeping `h3` styling). Defaults to the value of `titleVariant`.
	 */
	titleAs?: HeadingProps[ 'variant' ];
	/** A subtitle displayed below the title when the step is active. */
	subTitle?: React.ReactNode;
	/** The content rendered inside the step when it is active. */
	children?: React.ReactNode;
	/**
	 * Whether this step was skipped.
	 * @default false
	 */
	skipped?: boolean;
	/**
	 * Whether this step is in an error state. Takes visual precedence over the
	 * active/complete/skipped status: renders a red error icon, title, and left
	 * border. The subtitle is hidden so the step shows only its error content
	 * (children); children continue to render for the active step.
	 * @default false
	 */
	error?: boolean;
	/** Callback invoked when the user clicks the change action on a completed or skipped step. */
	onChange?: () => void;
	/** An array of label-value pairs displayed as a summary when the step is completed or skipped. */
	summary?: WizardStepSummary[];
	/** A title displayed above the summary list. */
	summaryTitle?: string;
	/**
	 * The HTML element type used to render the summary.
	 * @default 'table'
	 */
	summaryAs?: 'table' | 'dl';
	/** Whether to focus the step title when the step becomes active. */
	shouldFocusTitle?: boolean;
	/**
	 * The label for the action button on completed or skipped steps.
	 * @default 'Change'
	 */
	actionLabel?: string;
	/** An optional icon displayed next to the action label. */
	actionIcon?: React.ReactNode;
	/**
	 * Whether the action button is disabled.
	 * @default false
	 */
	actionDisabled?: boolean;
	/**
	 * Whether to display the "STEP X OF Y" text above the title.
	 * @default true
	 */
	showStepText?: boolean;
	/** Ref forwarded to the step container element. */
	ref?: React.Ref< HTMLElement >;
}

/**
 * An individual step within a Wizard component.
 * Displays a title, status indicator, optional summary, and content area.
 */
export const WizardStep = ( {
	title,
	subTitle,
	skipped = false,
	complete = false,
	error = false,
	children,
	active,
	order,
	totalSteps,
	shouldFocusTitle,
	titleVariant = 'h3',
	titleAs,
	summary,
	summaryTitle,
	summaryAs = 'table',
	onChange,
	actionLabel = 'Change',
	actionIcon,
	actionDisabled = false,
	showStepText = true,
	ref,
}: WizardStepProps ) => {
	const titleRef = React.useRef< HTMLHeadingElement >( null );
	let status = 'inactive';
	let statusText = 'Step not completed';
	if ( error ) {
		// Error takes visual precedence over every other status.
		status = 'error';
		statusText = 'Step has an error';
	} else if ( active && ! ( complete && totalSteps === 1 ) ) {
		// if the step is active but is an unique step, we don't want to show as active status
		status = 'active';
		statusText = ''; // not adding the status text for active step since it's announced by aria-current
	} else if ( complete ) {
		status = 'complete';
		statusText = 'Step completed';
	} else if ( skipped ) {
		status = 'skipped';
		statusText = 'Step skipped';
	}
	if ( statusText !== '' ) {
		statusText = `Status: ${ statusText }`;
	}
	const stepText = `STEP ${ order } OF ${ totalSteps }`;

	let StatusIcon = BsCircleFill;
	if ( error ) {
		StatusIcon = BsXCircleFill;
	} else if ( complete ) {
		StatusIcon = BsFillCheckCircleFill;
	}

	const borderLeftColor = `wizard.step.border.${ status }`;
	const statusIconColor = `wizard.step.icon.${ status }`;
	const statusIconStyles = {
		mr: 3,
		mt: 0,
		color: statusIconColor,
	};
	const headingColor = `wizard.step.heading.${ status }`;

	useLayoutEffect( () => {
		if ( active && titleRef?.current && shouldFocusTitle ) {
			titleRef.current.focus();
		}
	}, [ active, shouldFocusTitle ] );
	return (
		<Card
			as="section"
			sx={ {
				boxShadow: active ? 'low' : 'none',
				borderLeft: '2px solid',
				backgroundColor: active ? 'background' : 'transparent',
				borderRadius: 0,
				borderBottom: active ? 'none' : '1px solid',
				borderRight: '1px solid',
				'&:first-of-type': {
					borderTopWidth: '1px',
					borderTopStyle: 'solid',
				},
				borderColor: 'wizard.step.border.default',
				borderLeftColor,
				overflow: 'inherit',
				py: 1,
			} }
			data-step={ order }
			data-active={ active || undefined }
			className={ `wizard-step-${ status }` }
			ref={ ref }
		>
			<Flex sx={ { alignItems: 'center' } }>
				<Heading
					variant={ titleVariant }
					as={ titleAs ?? titleVariant }
					sx={ {
						mb: 0,
						color: headingColor,
						flexGrow: 1,
					} }
					ref={ titleRef }
					tabIndex={ shouldFocusTitle ? -1 : undefined }
					aria-current={ active ? 'step' : undefined }
				>
					{ showStepText && (
						<Text
							sx={ { fontSize: 1, color: 'wizard.step.number.color', pb: 1 } }
							aria-hidden="true"
						>
							{ stepText }
						</Text>
					) }

					<Flex as="span" sx={ { alignItems: 'center' } } aria-hidden="true">
						<StatusIcon sx={ statusIconStyles } />
						{ title }
					</Flex>

					<ScreenReaderText>{
						/**
						 * we are adding the composed title here so that it's announced correctly by the voiceover
						 * Using tags inside the heading would make the voiceover read the heading in multiple parts
						 **/
						`${ stepText }: ${ title?.toString() }. ${ statusText }`
					}</ScreenReaderText>
				</Heading>

				{ ! active && ( complete || skipped ) && onChange && (
					<Button
						variant="text"
						disabled={ actionDisabled }
						onClick={ onChange }
						sx={ { height: 'auto', alignSelf: 'flex-end' } }
					>
						{ actionLabel }{ ' ' }
						<ScreenReaderText>{ `the ${ title?.toString() } step` }</ScreenReaderText>
						{ Boolean( actionIcon ) && <Box sx={ { ml: 2 } }>{ actionIcon }</Box> }
					</Button>
				) }
			</Flex>
			{ ! active && ( complete || skipped ) && ( summary || summaryTitle ) && (
				<DescriptionList
					as={ summaryAs }
					list={ summary || [] }
					title={ summaryTitle }
					sx={ { mt: 2 } }
				/>
			) }

			{ subTitle && active && ! error && <Text sx={ { my: 3 } }>{ subTitle }</Text> }

			{ active && Boolean( children ) && (
				// In the error state there's no subtitle, so the content sits directly
				// under the heading and needs a bit more breathing room (12px vs 8px).
				<Box sx={ { pt: error ? 3 : 2 } }>{ children }</Box>
			) }
		</Card>
	);
};

WizardStep.displayName = 'WizardStep';
