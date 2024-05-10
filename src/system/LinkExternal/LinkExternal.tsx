/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { Link } from '../Link';
import ScreenReaderText from '../ScreenReaderText';

// Screen reader announcements
const DEFAULT_EXTERNAL_LINK_TEXT = translate( ', external link' ); // reads as: link, <link text>, external link
const NEW_TAB_TEXT = translate( ', opens in a new tab' ); // reads as: link, <link text>, external link, opens in a new tab

type Props = {
	children?: React.ReactNode;
	screenReaderText?: string | number;
	href: string;
	showExternalIcon?: boolean;
	defaultScreenReaderText?: boolean;
	newTab?: boolean;
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
