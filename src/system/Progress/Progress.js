/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Progress as ThemeProgress } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Spinner } from '../Spinner';
import { Box, Heading, Flex } from '../';

const Progress = ( { steps, activeStep, ...props } ) => (
	<Box>
		<ThemeProgress
			{ ...props }
			sx={ {
				color: 'primary',
			} }
			max={ steps.length }
			value={ activeStep + 1 }
		/>
		{ steps && (
			<Flex sx={ { alignItems: 'center', mt: 2 } }>
				<Spinner size={ 24 } />
				<Heading variant="h4" sx={ { ml: 2, mb: 0 } }>
					{ `${ activeStep + 1 } of ${ steps.length }` }:{ ' ' }
					<span sx={ { color: 'muted' } }>{ steps[ activeStep ] }</span>
				</Heading>
			</Flex>
		) }
	</Box>
);

Progress.propTypes = {
	steps: PropTypes.array,
	activeStep: PropTypes.number,
};

export { Progress };
