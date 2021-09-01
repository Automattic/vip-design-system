/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Progress as ThemeProgress } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Spinner } from '../Spinner';
import { Box, Heading, Text, Flex } from '../';

const Progress = ( { steps, activeStep, sx, ...props } ) => (
	<Box>
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
				<Spinner size={ 24 } />
				<Heading variant="h4" sx={ { ml: 2, mb: 0 } }>
					{ `${ activeStep + 1 } of ${ steps.length }` }:{ ' ' }
					<Text as="span" sx={ { color: 'muted' } }>{ steps[ activeStep ] }</Text>
				</Heading>
			</Flex>
		) }
	</Box>
);

Progress.propTypes = {
	steps: PropTypes.array,
	activeStep: PropTypes.number,
	sx: PropTypes.object,
};

export { Progress };
