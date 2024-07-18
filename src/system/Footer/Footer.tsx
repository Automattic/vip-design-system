/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { LinkExternal, LinkExternalProps } from '../LinkExternal/LinkExternal';
import { navItemStyles } from '../Nav/styles';
import { a8cLogo } from '../assets/logos';

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
		<footer
			sx={ {
				display: 'flex',
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
		</footer>
	);
};
