/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { Box } from '../Box';

export interface SkeletonProps {
	variant?: string;
	width?: number | string;
	height?: number | string;
	borderRadius?: number;
}

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
					animation: 'pulse 1.5s ease-in-out infinite',
					'@keyframes pulse': {
						'0%': {
							opacity: 0.1,
						},
						'50%': {
							opacity: 0.2,
						},
						'100%': {
							opacity: 0.1,
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
