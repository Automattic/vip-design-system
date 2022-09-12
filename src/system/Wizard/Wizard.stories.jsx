/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Wizard, Flex, Box, Heading, Label, Input, Button } from '..';

export default {
	title: 'Wizard',
	component: Wizard,
};

export const Default = () => {
	const steps = [
		{
			title: 'Choose Domain',
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
		},
		{
			title: 'Configure Certificate',
		},
		{
			title: 'Verify Domain',
		},
	];
	return (
		<React.Fragment>
			<Flex sx={ { alignItems: 'center' } }>
				<Box sx={ { flex: '1 1 auto' } }>
					<Heading variant="h1" sx={ { display: 'flex', alignItems: 'center', mb: 1 } }>
						Add Domain: <span sx={ { color: 'muted', ml: 2 } }>Production</span>
					</Heading>
				</Box>
			</Flex>
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
