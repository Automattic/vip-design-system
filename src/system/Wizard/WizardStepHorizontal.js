/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import MdCheckCircle from '~icons/mdi/check-circle';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Heading, Flex } from '..';

const WizardStepHorizontal = React.forwardRef(
	( { title, active, order, titleVariant = 'h3' }, forwardRef ) => {
		const color = active ? 'heading' : 'muted';

		return typeof title === 'string' ? (
			<Heading
				variant={ titleVariant }
				sx={ {
					mb: 0,
					display: 'flex',
					alignItems: 'center',
					fontSize: 2,
					color,
				} }
				data-step={ order }
				data-active={ active || undefined }
				ref={ forwardRef }
			>
				<MdCheckCircle aria-hidden="true" sx={ { mr: 2 } } />
				{ title }
			</Heading>
		) : (
			<Flex sx={ { alignItems: 'center', color } }>
				<MdCheckCircle aria-hidden="true" sx={ { mr: 2 } } />
				{ title }
			</Flex>
		);
	}
);

WizardStepHorizontal.displayName = 'WizardStepHorizontal';

WizardStepHorizontal.propTypes = {
	active: PropTypes.bool,
	order: PropTypes.number.isRequired,
	subTitle: PropTypes.node,
	title: PropTypes.node,
	titleVariant: PropTypes.string,
};

export { WizardStepHorizontal };
