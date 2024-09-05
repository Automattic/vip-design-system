/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { Link } from '../Link';
import ScreenReaderText from '../ScreenReaderText';

import type { LinkProps } from '../Link/Link';

// Screen reader announcements
const DEFAULT_EXTERNAL_LINK_TEXT = translate( ', external link' );
const NEW_TAB_TEXT = translate( ', opens in a new tab' );

export type LinkExternalProps = LinkProps & {
	/**
	 * Element to be linked.
	 **/
	children?: React.ReactNode;
	/**
	 * Additional text to include after `defaultScreenReaderText` if enabled.
	 **/
	screenReaderText?: string | number;
	/**
	 * Optional arrow icon.
	 *
	 * @default true
	 **/
	showExternalIcon?: boolean;
	/**
	 * Include default text which reads as: `link, <link text>, external link`
	 * or if `newTab` is `true`, reads as: `link, <link text>, external link, opens in a new tab`
	 **/
	defaultScreenReaderText?: boolean;
	/**
	 * If link should open in a new tab.
	 *
	 * @default false
	 **/
	newTab?: boolean;
};

export const LinkExternal = ( {
	children = null,
	screenReaderText = '',
	showExternalIcon = true,
	newTab = false,
	...rest
}: LinkExternalProps ) => (
	<Link
		as="a"
		target={ newTab ? '_blank' : '_self' }
		rel={ newTab ? 'noopener noreferrer' : '' }
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
