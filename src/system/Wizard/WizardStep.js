/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Card, Heading, Text } from '..';

const WizardStep = ( {
	title,
	subTitle,
	complete = false,
	children,
	active,
	order,
	titleVariant = 'h4',
} ) => {
	let borderLeftColor = 'border';

	if ( complete ) {
		borderLeftColor = 'success';
	} else if ( active ) {
		borderLeftColor = 'primary';
	}

	let color = 'muted';

	if ( complete ) {
		color = 'success';
	} else if ( active ) {
		color = 'heading';
	}

	return (
		<Card
			sx={ {
				boxShadow: active ? 'low' : 'none',
				borderLeft: '2px solid',
				p: 4,
				backgroundColor: active ? 'card' : 'transparent',
				borderRadius: 0,
				borderBottom: active ? 'none' : '1px solid',
				'&:first-of-type': {
					borderTopWidth: active ? 'none' : '1px',
					borderTopStyle: active ? 'none' : 'solid',
				},
				borderColor: active ? 'primary' : 'border',
				borderLeftColor: borderLeftColor,
			} }
			data-step={ order }
			data-active={ active || undefined }
		>
			<Heading
				variant={ titleVariant }
				sx={ {
					mb: 0,
					display: 'flex',
					alignItems: 'center',
					color: color,
				} }
			>
				<MdCheckCircle sx={ { mr: 2 } } />
				{ title }
			</Heading>
			{ subTitle && active && <Text sx={ { mb: 3 } }>{ subTitle }</Text> }

			{ active && children }
		</Card>
	);
};

WizardStep.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,
	complete: PropTypes.bool,
	order: PropTypes.number.isRequired,
	subTitle: PropTypes.node,
	title: PropTypes.node,
	titleVariant: PropTypes.string,
};

export { WizardStep };
