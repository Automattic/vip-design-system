/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import { forwardRef, Ref, useState, useEffect, useRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';
import { BiLockAlt, BiLogoWordpress } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import { Box, Spinner } from '..';

export interface ScreenshotProps {
	/** Height of the screenshot in pixels */
	height?: number;
	/** Width of the screenshot in pixels */
	width?: number;
	/** URL to take a screenshot of */
	url?: string;
	/** Show empty state placeholder */
	showEmpty?: boolean;
	/** Show no permission state with lock icon */
	showNoPermission?: boolean;
	/** Show loading state while screenshot is being generated */
	loading?: boolean;
	/** Additional CSS classes */
	className?: Argument;
	/** Custom styles */
	sx?: ThemeUIStyleObject;
	/** Alt text for the screenshot image */
	alt?: string;
}

export const Screenshot = forwardRef< HTMLElement, ScreenshotProps >(
	(
		{
			height = 78,
			width = 108,
			url,
			showEmpty = false,
			showNoPermission = false,
			loading: externalLoading = false,
			className,
			sx = {},
			alt = '',
			...rest
		}: ScreenshotProps,
		ref: Ref< HTMLElement >
	) => {
		const [ internalLoading, setInternalLoading ] = useState( Boolean( url ) );
		const timeoutRef = useRef< NodeJS.Timeout | null >( null );
		const isLoading = externalLoading || ( url && internalLoading );

		// Reset internal loading when URL changes
		useEffect( () => {
			if ( url ) {
				setInternalLoading( true );
				
				// Clear any existing timeout
				if ( timeoutRef.current ) {
					clearTimeout( timeoutRef.current );
				}
				
				// Fallback timeout in case image never loads (useful for Storybook/development)
				timeoutRef.current = setTimeout( () => {
					setInternalLoading( false );
					timeoutRef.current = null;
				}, 10000 ); // 10 second timeout
				
				return () => {
					if ( timeoutRef.current ) {
						clearTimeout( timeoutRef.current );
						timeoutRef.current = null;
					}
				};
			} else {
				setInternalLoading( false );
				if ( timeoutRef.current ) {
					clearTimeout( timeoutRef.current );
					timeoutRef.current = null;
				}
			}
		}, [ url ] );

		const handleImageLoad = () => {
			setInternalLoading( false );
			if ( timeoutRef.current ) {
				clearTimeout( timeoutRef.current );
				timeoutRef.current = null;
			}
		};

		// Calculate responsive icon size based on container dimensions
		const calculateIconSize = () => {
			const minDimension = Math.min( width, height );
			// Use 20% of the smaller dimension, with min 12px and max 32px
			const calculatedSize = Math.max( 16, Math.min( 32, Math.round( minDimension * 0.25 ) ) );
			return calculatedSize;
		};

		const iconSize = calculateIconSize();

		const imageStyles: ThemeUIStyleObject = {
			borderRadius: 1,
			border: '1px solid',
			borderColor: 'borders.1',
			boxShadow: 'low',
			height: `${ height }px`,
			width: `${ width }px`,
			backgroundColor: 'layer.inverse',
			color: 'texts.inverse',
		};

		// Show no permission state
		if ( showNoPermission ) {
			return (
				<Box
					ref={ ref }
					sx={ {
						...imageStyles,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						...sx,
					} }
					className={ classNames( 'vip-screenshot-component', 'vip-screenshot-placeholder', className ) }
					{ ...rest }
				>
					<BiLockAlt size={ iconSize }/>
				</Box>
			);
		}

		// Show empty state
		if ( showEmpty ) {
			return (
				<Box
					ref={ ref }
					sx={ {
						...imageStyles,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						...sx,
					} }
					className={ classNames( 'vip-screenshot-component', 'vip-screenshot-placeholder', className ) }
					{ ...rest }
				>
					<BiLogoWordpress size={ iconSize }/>
				</Box>
			);
		}

		// Show loading state
		if ( isLoading ) {
			return (
				<Box
					ref={ ref }
					sx={ {
						...imageStyles,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						...sx,
					} }
					className={ classNames( 'vip-screenshot-component', 'vip-screenshot-loading', className ) }
					aria-busy="true"
					{ ...rest }
				>
					<Spinner size={ iconSize } color="currentColor"/>
				</Box>
			);
		}

		// Show screenshot
		return (
			<Box
				ref={ ref }
				sx={ {
					...imageStyles,
					display: 'block',
					overflow: 'hidden',
					...sx,
				} }
				className={ classNames( 'vip-screenshot-component', 'vip-screenshot-image', className ) }
				{ ...rest }
			>
				<img
					src={ `//s0.wp.com/mshots/v1/${ url }?w=${ width }` }
					alt={ alt || `Screenshot of ${ url }` }
					onLoad={ handleImageLoad }
					onError={ handleImageLoad }
					style={ {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						display: 'block',
					} }
				/>
			</Box>
		);
	}
);

Screenshot.displayName = 'Screenshot'; 