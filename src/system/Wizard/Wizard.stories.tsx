/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { BsPencil } from 'react-icons/bs';

/**
 * Internal dependencies
 */
import { WizardStepProps } from './WizardStep';
import { Wizard, Box, Label, Input, Button, Checkbox, Flex, Text } from '..';

import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'Navigation/Wizard',
	component: Wizard,
};

type Story = StoryObj< typeof Wizard >;

export const Default: Story = {
	render: () => {
		const steps: WizardStepProps[] = [
			{
				title: 'Choose Domain',
				titleVariant: 'h2',
				subTitle: 'You can bring a domain name you already own, or buy a new one.',
				children: (
					<Box>
						<Label>Domain</Label>
						<Input placeholder="yourdomain.com" />
						<Button sx={ { mt: 3 } }>Continue</Button>
					</Box>
				),
			},
			{
				title: 'Configure DNS',
				titleVariant: 'h2',
				summaryTitle: 'Summary of Configure DNS',
			},
			{
				title: 'Configure Certificate',
				titleVariant: 'h2',
			},
			{
				title: 'Verify Domain',
				titleVariant: 'h2',
			},
		];
		return (
			<React.Fragment>
				<Box mt={ 4 }>
					<Wizard
						activeStep={ 0 }
						steps={ steps }
						completed={ [ 1 ] }
						summaryAs="dl"
						className="vip-wizard-xyz"
					/>
				</Box>
			</React.Fragment>
		);
	},
};

export const WithTitleAutoFocus: Story = {
	render: () => {
		const [ activeStep, setActiveStep ] = React.useState( 0 );
		const [ autoFocus, setAutoFocus ] = React.useState( true );
		const steps: WizardStepProps[] = [
			{
				title: 'Choose Domain',
				titleVariant: 'h2',
				summary: [
					{
						label: 'Demo Label',
						value: 'Demo value',
					},
				],
				onChange: () => setActiveStep( 0 ),
				children: (
					<Box>
						<Label>Domain</Label>
						<Input placeholder="yourdomain.com" />
						<Button sx={ { mt: 3 } } onClick={ () => setActiveStep( 1 ) }>
							Continue
						</Button>
					</Box>
				),
			},
			{
				title: 'Configure DNS',
				titleVariant: 'h2',
				onChange: () => setActiveStep( 1 ),
				actionLabel: 'Edit',
				actionDisabled: true,
				actionIcon: <BsPencil />,
				children: (
					<Box>
						<Label>DNS</Label>
						<Button sx={ { mt: 3 } } onClick={ () => setActiveStep( 0 ) }>
							back
						</Button>
					</Box>
				),
			},

			{
				title: 'Certificate',
				titleVariant: 'h2',
				summary: [
					{
						label: 'Certificate status',
						value: 'Not found',
					},
				],
				onChange: () => setActiveStep( 2 ),
				children: (
					<Box>
						<Label>Certificate validation</Label>
						<Button sx={ { mt: 3 } }>Check certificate</Button>
					</Box>
				),
			},
		];
		return (
			<React.Fragment>
				<Box mt={ 4 }>
					<Wizard
						summaryAs="dl"
						completed={ [ 0, 1 ] }
						skipped={ [ 2 ] }
						activeStep={ activeStep }
						steps={ steps }
						titleAutofocus={ autoFocus }
						className="vip-wizard-xyz"
					/>
				</Box>
				<Box mt={ 4 }>
					<Flex sx={ { alignItems: 'center' } }>
						<Checkbox
							id="wizard-autofocus"
							checked={ autoFocus }
							aria-labelledby="label-check1"
							onCheckedChange={ e => {
								setAutoFocus( e === true );
							} }
						/>
						<Label sx={ { m: 0, ml: 2 } } htmlFor="wizard-autofocus" id="label-check1">
							Autofocus enabled?
						</Label>
					</Flex>
				</Box>
			</React.Fragment>
		);
	},
};

export const HideStepText: Story = {
	render: () => {
		const [ activeStep, setActiveStep ] = React.useState< number | undefined >( undefined );

		const steps: WizardStepProps[] = [
			{
				title: 'Included Logs',
				titleVariant: 'h2',
				subTitle: '',
				children: <Text sx={ { mb: 0 } }>Error Logs</Text>,
				onChange: () => {
					setActiveStep( 0 );
				},
				actionLabel: 'Edit',
				actionIcon: <BsPencil />,
			},
		];

		return (
			<React.Fragment>
				<Box mt={ 4 }>
					<Wizard
						showStepText={ false }
						activeStep={ activeStep }
						steps={ steps }
						completed={ [ 0 ] }
						className="vip-wizard-xyz"
					/>
				</Box>
			</React.Fragment>
		);
	},
};
