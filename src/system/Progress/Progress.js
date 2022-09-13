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

const Progress = React.forwardRef(
	( { steps, activeStep, sx, className, ...props }, forwardRef ) => {
		const isDone = activeStep === steps.length - 1;

		return (
			<Box
				className={ classNames( 'vip-progress-component', className ) }
				aria-live="polite"
				aria-atomic="true"
				aria-busy={ ! isDone }
				ref={ forwardRef }
			>
				<ThemeProgress
					{ ...props }
					sx={ {
						color: 'primary',
						...sx,
					} }
					max={ steps.length }
					value={ activeStep + 1 }
				/>

				{ steps && (
					<Flex sx={ { alignItems: 'center', mt: 2 } }>
						{ ! isDone && <Spinner size={ 24 } aria-hidden="true" /> }
						{ isDone && <MdCheck size={ 24 } aria-hidden="true" /> }

						<Text variant="h4" sx={ { ml: 2, mb: 0 } }>
							<strong>{ `${ activeStep + 1 } of ${ steps.length }` }: </strong>
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
