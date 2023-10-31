/**
 * External dependencies
 */
import React from 'react';

import { ButtonSubmit } from '..';

import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */

export default {
	title: 'ButtonSubmit',
	component: ButtonSubmit,
};

type Story = StoryObj< typeof ButtonSubmit >;

export const Primary: Story = {
	render: () => <ButtonSubmit label="Primary" variant="primary" sx={ { ml: 2 } } />,
};

export const Secondary: Story = {
	render: () => <ButtonSubmit label="Secondary" variant="secondary" sx={ { ml: 2 } } />,
};

export const Loading: Story = {
	render: () => (
		<ButtonSubmit label="Loading" loading={ true } variant="primary" sx={ { ml: 2 } } />
	),
};
