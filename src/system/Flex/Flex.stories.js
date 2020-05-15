/**
 * External dependencies
 */
import React from 'react';

import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import { Flex } from '..';

export default {
	title: 'Flex',
	component: Flex,
};

export const Default = () => <Flex>Hello</Flex>;
