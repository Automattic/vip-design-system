/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Image, ImageProps } from 'theme-ui';
import classNames, { Argument } from 'classnames';

/**
 * Internal dependencies
 */
import { Box, Text } from '..';

interface AvatarProps {
	isVIP?: boolean;
	size?: number;
	src?: string;
	name?: string;
	className?: Argument;
}

type AvatarImageProps = AvatarProps & ImageProps;

export const Avatar = forwardRef< HTMLElement, AvatarImageProps >(
	(
		{ isVIP = false, name, size = 32, src, className, ...props }: AvatarImageProps,
		ref: Ref< HTMLElement >
	) => (
		<Box
			sx={ {
				borderRadius: 9999,
				height: size + 2, // +2 to compensate padding on both sides
				width: size + 2, // +2 to compensate padding on both sides
				border: '2px solid',
				borderColor: isVIP ? 'primary' : 'transparent',
				overflow: 'hidden',
				backgroundColor: 'primary',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'white',
				padding: '1px',
				textAlign: 'center',
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
						borderRadius: 9999,
						width: '100%',
						display: 'block',
					} }
				/>
			) : (
				<Text
					as="span"
					sx={ {
						color: 'white',
						mb: 0,
						fontWeight: 'bold',
						fontSize: 0,
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
