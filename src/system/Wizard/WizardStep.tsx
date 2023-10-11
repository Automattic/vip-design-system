/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useLayoutEffect } from 'react';
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

/**
 * Internal dependencies
 */
import { Card, Heading, Text, Flex, Table, TableRow, TableCell, Button } from '..';
import { ScreenReaderText } from '../ScreenReaderText';
import { HeadingProps } from '../Heading/Heading';

export interface WizardStepSummary {
	label?: React.ReactNode;
	value?: React.ReactNode;
}
export interface WizardStepProps {
	active?: boolean;
	complete?: boolean;
	order?: number;
	totalSteps?: number;
	title?: React.ReactNode | string;
	titleVariant?: HeadingProps[ 'variant' ];
	subTitle?: React.ReactNode | string;
	children?: React.ReactNode;
	skipped?: boolean;
	onChange?: () => void;
	summary?: WizardStepSummary[];
	shouldFocusTitle?: boolean;
}

export const WizardStep = React.forwardRef< HTMLDivElement, WizardStepProps >(
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
		const titleRef = React.useRef< HTMLHeadingElement >( null );
		let status = 'inactive';
		let statusText = 'Step not completed';
		if ( active ) {
			status = 'active';
			statusText = ''; // not adding the status text for active step since it's announced by aria-current
		} else if ( complete ) {
			status = 'complete';
			statusText = 'Step completed';
		} else if ( skipped ) {
			status = 'skipped';
			statusText = 'Step skipped';
		}
		if ( statusText !== '' ) {
			statusText = `Status: ${ statusText }`;
		}
		const stepText = `Step ${ order } of ${ totalSteps }`;

		const borderLeftColor = `wizard.step.border.${ status }`;
		const statusIconColor = `wizard.step.icon.${ status }`;
		const statusIconStyles = {
			mr: 3,
			mt: 0,
			color: statusIconColor,
		};
		const headingColor = `wizard.step.heading.${ status }`;

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
					borderLeftColor,
					overflow: 'inherit',
				} }
				data-step={ order }
				data-active={ active || undefined }
				ref={ forwardRef }
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
						aria-current={ active ? 'step' : undefined }
					>
						<Text sx={ { color: 'wizard.step.number.color' } } aria-hidden="true">
							{ stepText }
						</Text>

						<Flex as="span" sx={ { mt: 3, alignItems: 'center' } } aria-hidden="true">
							{ complete ? (
								<BsFillCheckCircleFill sx={ statusIconStyles } />
							) : (
								<BsCircleFill sx={ statusIconStyles } />
							) }
							{ title }
						</Flex>

						<ScreenReaderText>{
							/**
							 * we are adding the composed title here so that it's announced correctly by the voiceover
							 * Using tags inside the heading would make the voiceover read the heading in multiple parts
							 **/
							`${ stepText }: ${ title?.toString() }. ${ statusText }`
						}</ScreenReaderText>
					</Heading>

					{ ! active && ( complete || skipped ) && onChange && (
						<Button
							variant="text"
							onClick={ onChange }
							sx={ { height: 'auto', alignSelf: 'flex-end' } }
						>
							Change <ScreenReaderText>{ `the ${ title?.toString() } step` }</ScreenReaderText>
						</Button>
					) }
				</Flex>
				{ ! active && ( complete || skipped ) && summary && summary.length > 0 && (
					<Table
						caption={ `Summary of ${ title?.toString() }` }
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
