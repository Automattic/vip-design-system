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
		let status = 'inactive';
		if ( complete ) {
			status = 'complete';
		} else if ( active ) {
			status = 'active';
		}
		const borderLeftColor = `wizard.step.border.${ status }`;
		const statusIconColor = `wizard.step.icon.${ status }`;
		const headingColor = `wizard.step.heading.${ status }`;

		const StatusIcon = complete ? BsFillCheckCircleFill : BsCircleFill;

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
						borderTopColor: 'wizard.step.border.default',
					},
					borderColor: 'wizard.step.border.default',
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
							color: headingColor,
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
					<Flex sx={ { alignItems: 'center' } }>
						<StatusIcon aria-hidden="true" sx={ { mr: 3, color: statusIconColor } } />
						{ title }
					</Flex>
				) }

				{ subTitle && active && <Text sx={ { mb: 3, mt: 2 } }>{ subTitle }</Text> }

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
