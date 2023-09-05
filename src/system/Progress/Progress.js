/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Progress as ThemeProgress } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Spinner } from '../Spinner';
import { MdCheck } from 'react-icons/md';
import { Box, Text, Flex } from '../';

const prefix = 'vip-progress-component';
const uniqueID = () => Math.random().toString( 36 ).substring( 7 );

const Progress = React.forwardRef(
	( { steps, activeStep, sx, forLabel = '', className, ...props }, forwardRef ) => {
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
					ref={ forwardRef }
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

Progress.propTypes = {
	steps: PropTypes.array,
	activeStep: PropTypes.number,
	forLabel: PropTypes.node,
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Progress };
