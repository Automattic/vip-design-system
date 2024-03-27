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
	size?: number;
	src?: string;
	name?: string;
	className?: Argument;
	sx?: ThemeUIStyleObject;
}

type AvatarImageProps = AvatarProps & ImageProps;

export const Avatar = forwardRef< HTMLElement, AvatarImageProps >(
	(
		{ name, size = 32, src, className, sx = {}, ...props }: AvatarImageProps,
		ref: Ref< HTMLElement >
	) => (
		<Box
			sx={ {
				borderRadius: '100%',
				height: size,
				width: size,
				overflow: 'hidden',
				border: 'none',
				backgroundColor: 'icon.primary',
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
					{ name ? name.charAt( 0 ) : null }
				</Text>
			) }
		</Box>
	)
);

Avatar.displayName = 'Avatar';
