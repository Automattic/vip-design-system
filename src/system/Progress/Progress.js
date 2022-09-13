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
import { Box, Text, Flex, Label } from '../';

const prefix = 'vip-progress-component';
const uniqueID = Math.random().toString( 36 ).substring( 7 );

const Progress = React.forwardRef(
	( { steps, activeStep, sx, className, forLabel = '', ...props }, forwardRef ) => {
		const isDone = activeStep === steps.length - 1;
		const instance = uniqueID();
		const htmlFor = `${ prefix }-${ instance }`;

		return (
			<Box className={ classNames( prefix, className ) } ref={ forwardRef }>
				<Label htmlFor={ htmlFor }>{ forLabel }</Label>

				<div aria-live="polite" aria-atomic="true" aria-busy={ ! isDone }>
					<ThemeProgress
						{ ...props }
						sx={ {
							color: 'primary',
							...sx,
						} }
						max={ steps.length }
						value={ activeStep + 1 }
						id={ htmlFor }
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
				</div>
			</Box>
		);
	}
);

Progress.displayName = 'Progress';

Progress.propTypes = {
	steps: PropTypes.array,
	forLabel: PropTypes.node,
	activeStep: PropTypes.number,
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Progress };
