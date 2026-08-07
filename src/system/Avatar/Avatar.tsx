/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import { Ref, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { Image, ImageProps, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export interface AvatarProps {
	/**
	 * The width and height of the avatar in pixels.
	 * @default 32
	 */
	size?: number;
	/**
	 * Image URL for the avatar. When it is omitted or fails to load, the avatar
	 * falls back to the initial from `name`/`abbr`, and then to a generic user icon.
	 */
	src?: string;
	/** The full name of the user; the first character is used as the fallback initial. */
	name?: string;
	/** Custom abbreviation text displayed when no image is available, overrides the initial from `name`. */
	abbr?: string;
	/**
	 * What to render when no image is available. `initials` uses `abbr` or the first
	 * character of `name`, falling back to the icon when neither is set. `icon` always
	 * renders the generic user icon, even when a `name` is provided.
	 * @default 'initials'
	 */
	fallback?: 'initials' | 'icon';
	/** Additional CSS class names. */
	className?: Argument;
	/** Additional Theme UI styles applied to the avatar container. */
	sx?: ThemeUIStyleObject;
	/** Forwarded ref to the underlying container element. */
	ref?: Ref< HTMLElement >;
}

type AvatarImageProps = AvatarProps & ImageProps;

/**
 * A circular avatar component that displays a user image, falling back to an
 * initial or abbreviation, and finally to a generic user icon.
 */
export const Avatar = ( {
	name,
	size = 32,
	src,
	className,
	sx = {},
	abbr,
	fallback = 'initials',
	ref,
	...props
}: AvatarImageProps ) => {
	// Track the URL that failed rather than a boolean, so the state resets on its
	// own as soon as `src` changes and a recycled avatar is never stuck broken.
	const [ failedSrc, setFailedSrc ] = useState< string | null >( null );

	const displayName = name && ! abbr ? name.charAt( 0 ) : abbr;
	const showImage = Boolean( src ) && failedSrc !== src;

	const handleImageRef = ( image: HTMLImageElement | null ) => {
		// A server-rendered image can finish failing before hydration attaches
		// `onError`, which would leave the broken image on screen. Catch it on mount.
		if ( image?.complete && image.naturalWidth === 0 ) {
			setFailedSrc( image.getAttribute( 'src' ) );
		}
	};

	const showInitials = fallback === 'initials' && Boolean( displayName );

	const renderFallback = () =>
		showInitials ? (
			<Text
				as="span"
				sx={ {
					color: 'icon.inverse',
					mb: 0,
					fontWeight: 'bold',
					fontSize: 2,
					textTransform: 'uppercase',
				} }
			>
				{ displayName }
			</Text>
		) : (
			<Box
				as="span"
				sx={ { color: 'icon.inverse', display: 'inline-flex' } }
				data-testid="avatar-fallback-icon"
			>
				<MdPerson size={ Math.round( size * 0.625 ) } aria-hidden="true" />
			</Box>
		);

	return (
		<Box
			sx={ {
				borderRadius: '100%',
				height: size,
				width: size,
				overflow: 'hidden',
				border: 'none',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'inverse',
				textAlign: 'center',
				...sx,
			} }
			className={ classNames( 'vip-avatar-component', className ) }
			aria-hidden="true"
			ref={ ref }
			{ ...props }
		>
			{ showImage ? (
				<Image
					src={ src }
					alt={ name ? `Avatar image from ${ name }` : '' }
					ref={ handleImageRef }
					onError={ () => setFailedSrc( src ?? null ) }
					sx={ {
						borderRadius: '100%',
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						display: 'block',
					} }
				/>
			) : (
				renderFallback()
			) }
		</Box>
	);
};

Avatar.displayName = 'Avatar';
