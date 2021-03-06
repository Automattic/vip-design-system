/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Heading } from '..';

const WizardStepHorizontal = ( { title, active, order } ) => {
	return (
		<Heading
			variant="h4"
			sx={ {
				mb: 0,
				display: 'flex',
				alignItems: 'center',
				color: active ? 'heading' : 'muted',
			} }
			data-step={ order }
			data-active={ active || undefined }
		>
			<MdCheckCircle sx={ { mr: 2 } } />
			{ title }
		</Heading>
	);
};

WizardStepHorizontal.propTypes = {
	title: PropTypes.node,
	subTitle: PropTypes.node,
	active: PropTypes.bool,
	order: PropTypes.number.isRequired,
};

export { WizardStepHorizontal };
