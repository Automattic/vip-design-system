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

const WizardStepHorizontal = ( { title, active, order, titleVariant = 'h4' } ) => {
	return (
		<Heading
			variant={ titleVariant }
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
	active: PropTypes.bool,
	order: PropTypes.number.isRequired,
	subTitle: PropTypes.node,
	title: PropTypes.node,
	titleVariant: PropTypes.string,
};

export { WizardStepHorizontal };
