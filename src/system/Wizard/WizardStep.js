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
import { Card, Heading, Text, Flex, Table, TableRow, TableCell, Button } from '..';
import { ScreenReaderText } from '../ScreenReaderText';

const WizardStep = React.forwardRef(
	(
		{
			title,
			subTitle,
			skipped = false,
			complete = false,
			children,
			active,
			order,
			totalSteps,
			shouldFocusTitle,
			titleVariant = 'h3',
			summary,
			onChange,
		},
		forwardRef
	) => {
		const titleRef = React.useRef( null );
		let status = 'inactive';
		let statusText = 'Step not completed';
		if ( active ) {
			status = 'active';
			statusText = 'Current step';
		} else if ( complete ) {
			status = 'complete';
			statusText = 'Step completed';
		} else if ( skipped ) {
			status = 'skipped';
			statusText = 'Step skipped';
		}
		statusText = `Status: ${ statusText }`;
		const stepText = `Step ${ order } of ${ totalSteps }`;

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
					},
					borderColor: 'wizard.step.border.default',
					borderLeftColor: borderLeftColor,
					overflow: 'inherit',
				} }
				data-step={ order }
				data-active={ active || undefined }
				ref={ forwardRef }
				// aria-current={ active ? 'step' : undefined }
			>
				<Flex sx={ { alignItems: 'flex-end', mb: 2 } }>
					<Heading
						variant={ titleVariant }
						sx={ {
							mb: 1,
							color: headingColor,
							fontSize: 2,
							fontWeight: '500',
							flexGrow: 1,
						} }
						ref={ titleRef }
						tabIndex={ shouldFocusTitle ? -1 : undefined }
					>
						<Heading variant="caps" sx={ { mb: 0, display: 'block' } } aria-hidden="true">
							{ stepText }
						</Heading>

						<Flex as="span" sx={ { mt: 3, alignItems: 'center' } } aria-hidden="true">
							<StatusIcon
								sx={ {
									mr: 3,
									mt: 0,
									color: statusIconColor,
								} }
							/>
							{ title }
						</Flex>

						<ScreenReaderText>{
							/**
							 * we are adding the composed title here so that it's announced correctly by the voiceover
							 * Using tags inside the heading would make the voiceover read the heading in multiple parts
							 **/
							`${ stepText }: ${ title }. ${ statusText }`
						}</ScreenReaderText>
					</Heading>

					{ ! active && ( complete || skipped ) && onChange && (
						<Button
							variant="text"
							onClick={ onChange }
							sx={ { height: 'auto', alignSelf: 'flex-end' } }
						>
							Change <ScreenReaderText>the { title } step</ScreenReaderText>
						</Button>
					) }
				</Flex>
				{ ! active && ( complete || skipped ) && summary?.length > 0 && (
					<Table
						caption={ `Summary of ${ title }` }
						sx={ {
							width: 'auto',
							minWidth: 'auto',
							'> tbody > tr': {
								'> td, > th': {
									fontWeight: '500',
									border: 'none',
									pl: 0,
									'&:first-of-type': { pl: 0 },
								},
							},
						} }
					>
						<tbody>
							{ summary.map( ( item, index ) => (
								<TableRow key={ `summary_tb_${ index }` }>
									<TableCell
										as="th"
										scope="row"
										sx={ { color: 'gray', whiteSpace: 'nowrap', pr: 1 } }
									>
										{ item.label }
										{ item.value ? ':' : '' }
									</TableCell>
									<TableCell sx={ { color: 'text' } }>
										<strong>{ item.value }</strong>
									</TableCell>
								</TableRow>
							) ) }
						</tbody>
					</Table>
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
	totalSteps: PropTypes.number.isRequired,
	subTitle: PropTypes.node,
	title: PropTypes.string,
	titleVariant: PropTypes.string,
	skipped: PropTypes.bool,
	onChange: PropTypes.func,
	summary: PropTypes.arrayOf(
		PropTypes.shape( {
			label: PropTypes.node,
			value: PropTypes.node,
		} )
	),
	shouldFocusTitle: PropTypes.bool,
};

export { WizardStep };
