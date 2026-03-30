/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { Box } from '../Box';

export interface SkeletonProps {
	/**
	 * The shape variant of the skeleton. Use `'circle'` for a circular shape.
	 * @default 'text'
	 */
	variant?: string;
	/**
	 * The width of the skeleton element.
	 * @default '100%'
	 */
	width?: number | string;
	/**
	 * The height of the skeleton element.
	 * @default '30px'
	 */
	height?: number | string;
	/**
	 * Border radius applied to the skeleton (ignored when variant is `'circle'`).
	 * @default 1
	 */
	borderRadius?: number;
}

/**
 * A placeholder loading indicator that mimics the shape of content with a pulsing animation.
 */
export const Skeleton = ( {
	variant = 'text',
	width = '100%',
	height = '30px',
	borderRadius = 1,
	times = 1,
	...props
} ) => (
	<>
		{ Array.from( { length: times } ).map( ( i, index ) => (
			<Box
				key={ index }
				sx={ {
					borderRadius: variant === 'circle' ? '50%' : borderRadius,
					width,
					height,
					backgroundColor: 'skeleton.background',
					animation: 'pulse 1.5s ease-in-out 3',
					opacity: 0.125,
					'@keyframes pulse': {
						'0%': {
							opacity: 0.125,
						},
						'50%': {
							opacity: 0.2,
						},
						'100%': {
							opacity: 0.125,
						},
					},
					mb: index === times - 1 ? 0 : 4,
				} }
				aria-hidden
				{ ...props }
			></Box>
		) ) }
	</>
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
