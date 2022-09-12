/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Heading, Flex } from '..';

const WizardStepHorizontal = ( { title, active, order } ) => {
	const color = active ? 'heading' : 'muted';

	return typeof title === 'string' ? (
		<Heading
			variant="h4"
			sx={ {
				mb: 0,
				display: 'flex',
				alignItems: 'center',
				color,
			} }
			data-step={ order }
			data-active={ active || undefined }
		>
			<MdCheckCircle sx={ { mr: 2 } } />
			{ title }
		</Heading>
	) : (
		<Flex sx={ { alignItems: 'center', color } }>
			<MdCheckCircle sx={ { mr: 2 } } />
			{ title }
		</Flex>
	);
};

WizardStepHorizontal.propTypes = {
	active: PropTypes.bool,
	order: PropTypes.number.isRequired,
	subTitle: PropTypes.node,
	title: PropTypes.node,
};

export { WizardStepHorizontal };
