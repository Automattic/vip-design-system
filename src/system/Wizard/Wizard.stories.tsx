/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Wizard, Box, Label, Input, Button, Form } from '..';
import { WizardStepProps } from './WizardStep';

export default {
	title: 'Wizard',
	component: Wizard,
};

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
	{ value: 'coffee', label: 'Coffee' },
];

export const Default = () => {
	const steps: WizardStepProps[] = [
		{
			title: 'Choose Domain',
			titleVariant: 'h2',
			subTitle: 'You can bring a domain name you already own, or buy a new one.',
			children: (
				<Box>
					<Label>Domain</Label>
					<Input autoFocus placeholder="yourdomain.com" />
					<Form.Autocomplete label="Autocomplete" options={ options } />
					<Button sx={ { mt: 3 } }>Continue</Button>
				</Box>
			),
		},
		{
			title: 'Configure DNS',
			titleVariant: 'h2',
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
				<Wizard activeStep={ 0 } steps={ steps } completed={ [ 1 ] } className="vip-wizard-xyz" />
			</Box>
		</React.Fragment>
	);
};

export const WithTitleAutoFocus = () => {
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
					completed={ [ 0, 1 ] }
					skipped={ [ 2 ] }
					activeStep={ activeStep }
					steps={ steps }
					titleAutofocus={ autoFocus }
					className="vip-wizard-xyz"
				/>
			</Box>
			<Box mt={ 4 }>
				<Form.Select
					id="wizard-autofocus"
					forLabel="wizard-autofocus"
					label="Autofocus status"
					value={ autoFocus }
					onChange={ e => setAutoFocus( e.value ) }
					options={ [
						{ value: true, label: 'On' },
						{ value: false, label: 'Off' },
					] }
				/>
			</Box>
		</React.Fragment>
	);
};
