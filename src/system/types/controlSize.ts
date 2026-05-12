/**
 * Shared type definitions for control sizing across the design system.
 *
 * All interactive form controls (buttons, inputs, selects, etc.) should
 * support these two size variants for consistency.
 */

/**
 * Control size options
 * - small: 32px height - for compact/dense UIs
 * - large: 40px height - default, better for touch and accessibility
 */
export type ControlSize = 'small' | 'large';

/**
 * Interface for components that support size prop
 */
export interface WithControlSize {
	/**
	 * Size of the control
	 * @default 'large'
	 */
	size?: ControlSize;
}

/**
 * Helper to get minHeight value from size
 * Returns content height (accounts for 1px borders on top and bottom)
 * Total heights: Small = 30px + 2px border = 32px, Large = 38px + 2px border = 40px
 */
export const getControlHeight = ( size: ControlSize = 'large' ): string => {
	return size === 'small' ? '30px' : '38px';
};

/**
 * Helper to get consistent padding for control sizes
 */
export const getControlPaddingX = ( size: ControlSize = 'large' ): number => {
	return size === 'small' ? 3 : 5;
};

/**
 * Complete style object for a given control size
 * Note: minHeight values account for 1px borders (top + bottom = 2px total)
 * - Small: 30px content + 2px border = 32px total height
 * - Large: 38px content + 2px border = 40px total height
 */
export const controlSizeStyles = {
	small: {
		minHeight: '30px',
		lineHeight: '30px',
		px: 3,
		py: 0,
		fontSize: 2, // 14px - consistent across all sizes
	},
	large: {
		minHeight: '38px',
		lineHeight: '38px',
		px: 5,
		py: 0,
		fontSize: 2, // 14px - consistent across all sizes
	},
} as const;
