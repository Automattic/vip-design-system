/**
 * External dependencies
 */

import React from 'react';

import { Link } from '../Link';
/**
 * Internal dependencies
 */
import ScreenReaderText from '../ScreenReaderText';

// Screen reader announcements
const DEFAULT_EXTERNAL_LINK_TEXT = ', external link'; // reads as: link, <link text>, external link
const NEW_TAB_TEXT = ', opens in a new tab'; // reads as: link, <link text>, external link, opens in a new tab

type Props = {
	children?: React.ReactNode;
	screenReaderText?: string | number | ReactChild;
	href: string;
	showExternalIcon?: boolean;
	defaultScreenReaderText?: boolean;
	newTab?: boolean;
	[ rest: string ]: any;
};

export const LinkExternal: React.FC< Props > = ( {
	children = null,
	screenReaderText = '',
	href,
	showExternalIcon = true,
	newTab = false,
	...rest
} ) => (
	<Link
		as="a"
		target={ newTab ? '_blank' : '_self' }
		rel={ newTab ? 'noopener noreferrer' : '' }
		href={ href }
		{ ...rest }
	>
		{ children }
		<ScreenReaderText>
			{ screenReaderText }
			{ DEFAULT_EXTERNAL_LINK_TEXT }
			{ newTab ? NEW_TAB_TEXT : '' }
		</ScreenReaderText>
		{ showExternalIcon && <span aria-hidden="true">&nbsp;↗</span> }
	</Link>
);

export default LinkExternal;
