/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import { forwardRef, Ref } from 'react';
import { Image, ImageProps, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box, Text } from '..';

export interface AvatarProps {
	/**
	 * The width and height of the avatar in pixels.
	 * @default 32
	 */
	size?: number;
	/** Image URL for the avatar. When provided, renders an image instead of initials. */
	src?: string;
	/** The full name of the user; the first character is used as the fallback initial. */
	name?: string;
	/** Custom abbreviation text displayed when no image is provided, overrides the initial from `name`. */
	abbr?: string;
	/** Additional CSS class names. */
	className?: Argument;
	/** Additional Theme UI styles applied to the avatar container. */
	sx?: ThemeUIStyleObject;
}

type AvatarImageProps = AvatarProps & ImageProps;

/**
 * A circular avatar component that displays a user image or falls back to an initial/abbreviation.
 */
export const Avatar = forwardRef< HTMLElement, AvatarImageProps >(
	(
		{ name, size = 32, src, className, sx = {}, abbr, ...props }: AvatarImageProps,
		ref: Ref< HTMLElement >
	) => {
		const displayName = name && ! abbr ? name.charAt( 0 ) : abbr;

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
				{ src ? (
					<Image
						src={ src }
						alt={ `Avatar image from ${ name }` }
						sx={ {
							borderRadius: '100%',
							width: '100%',
							display: 'block',
						} }
					/>
				) : (
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
				) }
			</Box>
		);
	}
);

Avatar.displayName = 'Avatar';
