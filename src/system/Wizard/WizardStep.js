/** @jsx jsx */
/**
 * External dependencies
 */
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Card, Heading, Text } from '..';

const WizardStep = ( { title, subTitle, complete = false, children, active } ) => {
	let borderLeftColor = 'border';

	if ( complete ) {
		borderLeftColor = 'green.60';
	} else if ( active ) {
		borderLeftColor = 'primary';
	}

	let color = 'muted';

	if ( complete ) {
		color = 'green.60';
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
				'&:first-child': {
					borderTopWidth: active ? 'none' : '1px',
					borderTopStyle: active ? 'none' : 'solid',
				},
				borderColor: active ? 'primary' : 'border',
				borderLeftColor: borderLeftColor,
			} }
		>
			<Heading
				variant="h4"
				sx={ {
					mb: 0,
					display: 'flex',
					alignItems: 'center',
					color: color,
				} }
			>
				{ complete ? (
					<MdCheckCircle sx={ { mr: 2 } } />
				) : (
					<MdRadioButtonUnchecked sx={ { mr: 2 } } />
				) }
				{ title }
			</Heading>
			{ subTitle && active && <Text sx={ { mb: 3 } }>{ subTitle }</Text> }

			{ active && children }
		</Card>
	);
};

WizardStep.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	complete: PropTypes.bool,
	active: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export { WizardStep };
