/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useLayoutEffect } from 'react';
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Card, Heading, Text, Flex } from '..';

const WizardStep = React.forwardRef(
	(
		{
			title,
			subTitle,
			complete = false,
			children,
			active,
			order,
			shouldFocusTitle,
			titleVariant = 'h3',
		},
		forwardRef
	) => {
		const titleRef = React.useRef( null );

		let borderLeftColor = 'border';

		if ( complete ) {
			borderLeftColor = 'success';
		} else if ( active ) {
			borderLeftColor = 'primary';
		}

		let color = 'text'; // TODO match the color with the correct inactive color.

		if ( complete ) {
			color = 'success';
		} else if ( active ) {
			color = 'heading';
		}

		const StatusIcon = complete ? BsFillCheckCircleFill : BsCircleFill;
		const statusIconColor = borderLeftColor; // TODO we will need to update this to use support.icon.color
		useLayoutEffect( () => {
			if ( active && titleRef?.current && shouldFocusTitle ) {
				titleRef.current.focus();
			}
		}, [ active, shouldFocusTitle ] );
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
							fontWeight: '500',
						} }
						ref={ titleRef }
						tabIndex={ shouldFocusTitle ? -1 : undefined }
					>
						<StatusIcon aria-hidden="true" sx={ { mr: 3, color: statusIconColor } } />
						{ title }
					</Heading>
				) : (
					<Flex sx={ { alignItems: 'center', color } }>
						<StatusIcon aria-hidden="true" sx={ { mr: 3, color: statusIconColor } } />
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
	shouldFocusTitle: PropTypes.bool,
};

export { WizardStep };
