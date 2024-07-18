/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Flex } from '../Flex';
import { LinkExternal, LinkExternalProps } from '../LinkExternal/LinkExternal';
import { navItemStyles } from '../Nav/styles';
import { Text } from '../Text';

type FooterProps = {
	/**
	 * Add an additional separator after the last element.
	 *
	 * @default false
	 **/
	hasTrailingSeparator?: boolean;
	/**
	 * An array of LinkExternal components as objects.
	 **/
	links: LinkExternalProps[];
	/**
	 * A logo to display in the right footer area. Displays Automattic logo by default.
	 **/
	customLogo?: React.ReactNode;
	/**
	 * The maxiumum width of the footer.
	 *
	 * @default 100%
	 **/
	maxWidth?: string | number;
};

const a8cLogo = (
	<Text as="span" sx={ { display: 'inline-flex', alignItems: 'center', gap: 2, mb: 0 } }>
		{ translate( 'An' ) }
		<LinkExternal
			href="https://automattic.com"
			showExternalIcon={ false }
			screenReaderText={ translate( 'Automattic' ) }
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 15.4" style={ { minWidth: 100 } }>
				<path
					d="M72.5 15.4c-5.1 0-8.4-3.7-8.4-7.5v-.4c0-3.9 3.3-7.5 8.4-7.5 5.1 0 8.4 3.6 8.4 7.5V8c0 3.8-3.3 7.4-8.4 7.4zm5.7-7.9c0-2.8-2-5.3-5.7-5.3s-5.7 2.5-5.7 5.3v.3c0 2.8 2 5.3 5.7 5.3s5.7-2.5 5.7-5.3v-.3z"
					fill="#3298CB"
				/>
				<path d="M15 14.9l-1.9-3.6H4.7l-1.8 3.6H0L7.8.5H10l7.9 14.4H15zM8.8 3.3l-3.1 6h6.4l-3.3-6zm21.4 12.1c-5.2 0-7.6-2.8-7.6-6.5V.5h2.7V9c0 2.7 1.7 4.2 5.1 4.2 3.4 0 4.8-1.6 4.8-4.2V.5h2.7v8.4c0 3.6-2.3 6.5-7.7 6.5zM52.9 2.8v12.1h-2.7V2.8h-6.3V.5h15.3v2.2h-6.3zM105 14.9V3.5l-.7 1.3-6 10.1H97L91 4.8l-.7-1.3v11.4h-2.6V.5h3.7l5.7 9.9.7 1.2.7-1.2 5.6-9.9h3.7v14.4H105zm23.1 0l-1.9-3.6h-8.4l-1.8 3.6h-3L120.8.5h2.2l7.9 14.4h-2.8zm-6.2-11.6l-3.1 6h6.4l-3.3-6zm19.9-.5v12.1h-2.7V2.8h-6.3V.5h15.3v2.2h-6.3zm19.8 0v12.1h-2.7V2.8h-6.3V.5h15.3v2.2h-6.3zm12.9 12.1v-13c1.1 0 1.5-.6 1.5-1.4h1.1v14.4h-2.6zm23.8-10.3c-1.3-1.2-3.2-2.3-5.8-2.3-3.8 0-6 2.6-6 5.4V8c0 2.7 2.2 5.3 6.2 5.3 2.4 0 4.4-1.1 5.6-2.3l1.6 1.7c-1.6 1.6-4.3 2.9-7.4 2.9-5.4 0-8.7-3.5-8.7-7.4v-.6c0-3.9 3.6-7.6 8.9-7.6 3 0 5.8 1.3 7.3 2.9l-1.7 1.7zM74.3 5c.5.3.6 1 .3 1.5l-2.5 3.8c-.3.5-1 .6-1.5.3s-.6-1-.3-1.5l2.5-3.8c.4-.5 1-.6 1.5-.3z" />
			</svg>
		</LinkExternal>
		{ translate( 'Creation' ) }
	</Text>
);

export const Footer = ( {
	hasTrailingSeparator = false,
	links,
	customLogo,
	maxWidth = '100%',
}: FooterProps ) => {
	const FooterLinks = ( { children, ...props } ) => {
		return <li { ...props }>{ children }</li>;
	};

	const trailingSeparator = {
		'&:last-of-type::after': {
			display: 'inline-block',
			margin: '0 0.45em 0 1em ',
			transform: 'rotate(15deg)',
			borderRightColor: 'text',
			borderRightStyle: 'solid',
			borderRightWidth: '0.1em',
			height: '0.8em',
			content: '""',
		},
	};

	return (
		<Flex
			sx={ {
				flexDirection: [ 'column', 'column', 'row' ],
				justifyContent: 'space-between',
				gap: 4,
				fontSize: 1,
				mt: 2,
				maxWidth,
				textAlign: 'left',
			} }
		>
			{ links && links?.length >= 0 && (
				<ul
					sx={ {
						display: 'flex',
						alignSelf: 'center',
						gap: 2,
						listStyle: 'none',
						paddingInlineStart: 0,
					} }
				>
					{ links.map( ( linkProps, index ) => {
						return (
							<FooterLinks
								key={ `footer-link_${ index }` }
								sx={
									hasTrailingSeparator
										? {
												...navItemStyles( 'horizontal', 'breadcrumbs' ),
												...trailingSeparator,
										  }
										: { ...navItemStyles( 'horizontal', 'breadcrumbs' ) }
								}
							>
								<LinkExternal { ...linkProps } sx={ { ml: 1 } } />
							</FooterLinks>
						);
					} ) }
				</ul>
			) }
			<Box
				sx={ {
					backgroundColor: [ '#F4F3F2', '#F4F3F2', 'transparent' ],
					py: 2,
					textAlign: [ 'center', 'center', 'right' ],
				} }
			>
				{ customLogo ? customLogo : a8cLogo }
			</Box>
		</Flex>
	);
};
