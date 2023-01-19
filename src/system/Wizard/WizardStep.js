/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Card, Heading, Text, Flex } from '..';

const WizardStep = React.forwardRef(
	(
		{ title, subTitle, complete = false, children, active, order, titleVariant = 'h3' },
		forwardRef
	) => {
		let borderLeftColor = 'border';

		if ( complete ) {
			borderLeftColor = 'success';
		} else if ( active ) {
			borderLeftColor = 'primary';
		}

		let color = 'text';

		if ( complete ) {
			color = 'success';
		} else if ( active ) {
			color = 'heading';
		}

		return (
			<Card
				as="section"
				sx={ {
					boxShadow: active ? 'low' : 'none',
					borderLeft: '2px solid',
					p: 4,
					backgroundColor: active ? 'background' : 'transparent',
					borderRadius: 0,
					borderBottom: active ? 'none' : '1px solid',
					'&:first-of-type': {
						borderTopWidth: '1px',
						borderTopStyle: 'solid',
						borderTopColor: 'borders.2',
					},
					borderColor: active ? 'primary' : 'borders.2',
					borderLeftColor: borderLeftColor,
					overflow: 'inherit',
				} }
				data-step={ order }
				data-active={ active || undefined }
				ref={ forwardRef }
			>
				{ typeof title === 'string' ? (
					<Heading
						variant={ titleVariant }
						sx={ {
							mb: 0,
							display: 'flex',
							alignItems: 'center',
							color,
							fontSize: 2,
							fontWeight: active ? 'bold' : 'normal',
						} }
					>
						<MdCheckCircle
							aria-hidden="true"
							sx={ { mr: 2, color: active ? 'icon.primary' : 'icon.disabled' } }
						/>
						{ title }
					</Heading>
				) : (
					<Flex sx={ { alignItems: 'center', color } }>
						<MdCheckCircle
							aria-hidden="true"
							sx={ { mr: 2, color: active ? 'icon.primary' : 'icon.disabled' } }
						/>
						{ title }
					</Flex>
				) }

				{ subTitle && active && <Text sx={ { mb: 3 } }>{ subTitle }</Text> }

				{ active && children }
			</Card>
		);
	}
);

WizardStep.displayName = 'WizardStep';

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
