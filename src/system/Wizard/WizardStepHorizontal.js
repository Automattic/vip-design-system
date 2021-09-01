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

const WizardStepHorizontal = ({ title, active }) => {
	return (
		<Heading
			variant="h4"
			sx={{
				mb: 0,
				display: 'flex',
				alignItems: 'center',
				color: active ? 'heading' : 'muted',
			}}
		>
			<MdCheckCircle sx={{ mr: 2 }} />
			{title}
		</Heading>
	);
};

WizardStepHorizontal.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	active: PropTypes.bool,
};

export { WizardStepHorizontal };
