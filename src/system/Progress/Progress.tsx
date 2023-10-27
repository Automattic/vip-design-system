/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { ProgressProps, Progress as ThemeProgress } from 'theme-ui';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Spinner } from '../Spinner';
import { MdCheck } from '@react-icons/all-files/md/MdCheck';
import { Box, Text, Flex } from '..';

const prefix = 'vip-progress-component';
const uniqueID = () => Math.random().toString( 36 ).substring( 7 );

export interface ThemeProgressProps extends ProgressProps {
	steps: string[];
	activeStep: number;
	forLabel?: string;
	className?: string;
}

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
