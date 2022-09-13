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
	( { steps, activeStep, sx, className, ...props }, forwardRef ) => {
		const stepsTotal = steps.length;
		const isDone = activeStep === stepsTotal - 1;
		const instance = uniqueID();
		const htmlFor = `${ prefix }-${ instance }`;

		return (
			<Box
				className={ classNames( prefix, className ) }
				ref={ forwardRef }
				aria-live="polite"
				aria-atomic="true"
			>
				<ThemeProgress
					sx={ {
						color: 'primary',
						...sx,
					} }
					max={ stepsTotal }
					value={ activeStep + 1 }
					id={ htmlFor }
					{ ...props }
				/>

				{ steps && (
					<Flex
						sx={ { alignItems: 'center', mt: 2 } }
						aria-busy={ ! isDone }
						aria-describedby={ htmlFor }
					>
						{ ! isDone && <Spinner size={ 24 } aria-hidden="true" /> }
						{ isDone && <MdCheck size={ 24 } aria-hidden="true" /> }

						<Text sx={ { ml: 2, mb: 0 } }>
							<strong>{ `${ activeStep + 1 } of ${ stepsTotal }` }: </strong>
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
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Progress };
