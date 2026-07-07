/**
 * External dependencies
 */
import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import { MdCheck } from 'react-icons/md';
import { ProgressProps, Progress as ThemeProgress } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Spinner } from '../Spinner/Spinner';
import { Text } from '../Text/Text';

const prefix = 'vip-progress-component';
const uniqueID = () => Math.random().toString( 36 ).substring( 7 );

export interface ThemeProgressProps extends ProgressProps {
	/** Array of step labels describing each stage of the progress. */
	steps: string[];
	/** Zero-based index of the currently active step. */
	activeStep: number;
	/** Accessible label for the progress bar element. */
	forLabel?: string;
	/** Additional CSS class name. */
	className?: string;
}

/**
 * A step-based progress bar that displays the current step label and a completion indicator.
 */
export const Progress = forwardRef< HTMLProgressElement, ThemeProgressProps >(
	(
		{ steps, activeStep, sx, forLabel = '', className, ...props }: ThemeProgressProps,
		ref: Ref< HTMLProgressElement >
	) => {
		const stepsTotal = steps.length;
		const isDone = activeStep === stepsTotal - 1;
		const instance = uniqueID();
		const htmlFor = `${ prefix }-${ instance }`;
		const currentValue = activeStep + 1;

		return (
			<Box className={ classNames( prefix, className ) }>
				<ThemeProgress
					sx={ {
						color: 'primary',
						backgroundColor: 'background',
						...sx,
					} }
					max={ stepsTotal }
					value={ currentValue }
					id={ htmlFor }
					aria-label={ forLabel }
					ref={ ref }
					{ ...props }
				/>

				{ steps && (
					<Flex
						sx={ { alignItems: 'center', mt: 2 } }
						aria-live="polite"
						aria-atomic="true"
						aria-describedby={ htmlFor }
					>
						{ ! isDone && <Spinner size={ 24 } aria-hidden="true" /> }
						{ isDone && <MdCheck size={ 24 } aria-hidden="true" /> }

						<Text sx={ { ml: 2, mb: 0 } }>
							<strong>{ `${ currentValue } of ${ stepsTotal }` }: </strong>
							<Text as="span" sx={ { color: 'muted' } }>
								{ steps[ activeStep ] }
							</Text>
						</Text>
					</Flex>
				) }
			</Box>
		);
	}
);

Progress.displayName = 'Progress';
