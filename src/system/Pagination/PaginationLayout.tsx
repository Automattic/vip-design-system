/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import { forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { containerStyles } from './styles';
import { Box } from '../Box/Box';
import { Select } from '../NewForm';

export interface PaginationLayoutProps {
	/** Whether to show the items-per-page dropdown selector.
	 * @default false
	 */
	displayItemsPerPageSelector?: boolean;
	/** Number of items displayed per page. */
	itemsPerPage?: number;
	/** Available page size options for the items-per-page selector.
	 * @default [20, 50, 100]
	 */
	pageSizeOptions?: number[];
	/** Callback fired when the user changes the items-per-page value. */
	onItemsPerPageChange?: ( itemsPerPage: number ) => void;
	/** Additional CSS class name for the pagination container. */
	className?: string;
	/** Theme UI style overrides. */
	sx?: ThemeUIStyleObject;
	/** Slot for variant-specific content (page numbers, arrows, etc.). */
	children?: React.ReactNode;
}

const ItemsPerPageSelect = ( {
	itemsPerPage,
	pageSizeOptions,
	onItemsPerPageChange,
}: {
	itemsPerPage: number;
	pageSizeOptions: number[];
	onItemsPerPageChange: ( size: number ) => void;
} ) => (
	<Select
		id="items-per-page"
		aria-label="Items per page"
		separator={ false }
		value={ itemsPerPage }
		options={ pageSizeOptions.map( size => ( {
			value: size,
			label: `${ size.toString() } / page`,
		} ) ) }
		onChange={ option => onItemsPerPageChange( Number( option?.value ) ) }
	/>
);

/**
 * Shared layout wrapper for pagination components.
 * Renders the nav landmark, optional items-per-page selector, and variant content.
 */
export const PaginationLayout = forwardRef< HTMLElement, PaginationLayoutProps >(
	(
		{
			displayItemsPerPageSelector = false,
			itemsPerPage,
			pageSizeOptions = [ 20, 50, 100 ],
			onItemsPerPageChange,
			className,
			sx,
			children,
			...rest
		},
		ref
	) => (
		<nav
			ref={ ref }
			aria-label="Pagination"
			className={ classNames( 'vip-pagination-component', className ) }
			sx={ { ...containerStyles, ...sx } }
			{ ...rest }
		>
			<Box>
				{ displayItemsPerPageSelector && itemsPerPage && onItemsPerPageChange && (
					<ItemsPerPageSelect
						itemsPerPage={ itemsPerPage }
						pageSizeOptions={ pageSizeOptions }
						onItemsPerPageChange={ onItemsPerPageChange }
					/>
				) }
			</Box>
			{ children }
		</nav>
	)
);

PaginationLayout.displayName = 'PaginationLayout';
