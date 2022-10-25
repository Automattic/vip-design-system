/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Wizard, Box, Label, Input, Button } from '..';

export default {
	title: 'Wizard',
	component: Wizard,
};

export const Default = () => {
	const steps = [
		{
			title: 'Choose Domain',
			titleVariant: 'h2',
			subTitle: 'You can bring a domain name you already own, or buy a new one.',
			children: (
				<Box>
					<Label>Domain</Label>
					<Input autoFocus placeholder="yourdomain.com" />
					<Button>Continue</Button>
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
				<Wizard activeStep={ 0 } steps={ steps } className="vip-wizard-xyz" />
			</Box>
		</React.Fragment>
	);
};

export const CustomTitle = () => {
	const steps = [
		{
			title: <h3 sx={ { m: 0 } }>Choose Domain</h3>,
			subTitle: <span>You can bring a domain name you already own, or buy a new one.</span>,
		},
		{
			title: <h3 sx={ { m: 0 } }>Configure DNS</h3>,
		},
	];
	return (
		<React.Fragment>
			<Wizard activeStep={ 0 } steps={ steps } className="vip-wizard-xyz" />
		</React.Fragment>
	);
};
