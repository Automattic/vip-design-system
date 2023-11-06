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
	isVIP?: boolean;
	size?: number;
	src?: string;
	name?: string;
	className?: Argument;
	sx?: ThemeUIStyleObject;
}

type AvatarImageProps = AvatarProps & ImageProps;

export const Avatar = forwardRef< HTMLElement, AvatarImageProps >(
	(
		{ isVIP = false, name, size = 32, src, className, sx = {}, ...props }: AvatarImageProps,
		ref: Ref< HTMLElement >
	) => (
		<Box
			sx={ {
				borderRadius: '100%',
				height: size + 2, // +2 to compensate padding on both sides
				width: size + 2, // +2 to compensate padding on both sides
				borderWidth: '2px',
				borderStyle: 'solid',
				borderColor: isVIP || isVIP === undefined ? 'primary' : 'transparent',
				overflow: 'hidden',
				backgroundColor: 'primary',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'white',
				padding: '1px', // this should probably be replaced with a token
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
