/** @jsxImportSource theme-ui */

import { forwardRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Flex } from 'theme-ui';

import { PaginationLayout, PaginationLayoutProps } from './PaginationLayout';
import { navigationStyles, arrowButtonStyles } from './styles';
import { Box } from '../Box';
import { Button } from '../Button';

/** A navigation parameter for SimplePagination. */
export interface SimpleNavigationParam {
	/** The query parameter name (e.g., 'after', 'before'). */
	param: string;
	/** The parameter token value. */
	value: string;
}

export interface SimplePaginationProps extends PaginationLayoutProps {
	/** Whether there is a next page available. */
	hasNextPage?: boolean;
	/** Whether there is a previous page available. */
	hasPreviousPage?: boolean;
	/** Navigation parameter for the next page. */
	nextParam?: SimpleNavigationParam;
	/** Navigation parameter for the previous page. */
	previousParam?: SimpleNavigationParam;
	/** Callback fired when the user navigates. Receives the param name and value. */
	onNavigate: ( param: string, value: string ) => void;
}

/**
 * A pagination control with only previous/next arrow buttons.
 * Designed for cursor-based pagination APIs with custom param names (e.g., `after`/`before`).
 */
export const SimplePagination = forwardRef< HTMLElement, SimplePaginationProps >(
	(
		{
			hasNextPage,
			hasPreviousPage,
			nextParam,
			previousParam,
			onNavigate,
			displayItemsPerPageSelector,
			itemsPerPage,
			pageSizeOptions,
			onItemsPerPageChange,
			className,
			sx,
			children,
			...rest
		},
		ref
	) => {
		const isPrevDisabled = ! hasPreviousPage || ! previousParam?.value;
		const isNextDisabled = ! hasNextPage || ! nextParam?.value;

		return (
			<PaginationLayout
				ref={ ref }
				displayItemsPerPageSelector={ displayItemsPerPageSelector }
				itemsPerPage={ itemsPerPage }
				pageSizeOptions={ pageSizeOptions }
				onItemsPerPageChange={ onItemsPerPageChange }
				className={ className }
				sx={ sx }
				{ ...rest }
			>
				<Box sx={ { flex: 1 } }>{ children }</Box>
				<Flex sx={ navigationStyles }>
					<Button
						aria-label="Previous page"
						disabled={ isPrevDisabled }
						onClick={ () =>
							previousParam && onNavigate( previousParam.param, previousParam.value )
						}
						sx={ arrowButtonStyles }
					>
						<MdChevronLeft size={ 20 } />
					</Button>

					<Button
						aria-label="Next page"
						disabled={ isNextDisabled }
						onClick={ () => nextParam && onNavigate( nextParam.param, nextParam.value ) }
						sx={ arrowButtonStyles }
					>
						<MdChevronRight size={ 20 } />
					</Button>
				</Flex>
			</PaginationLayout>
		);
	}
);

SimplePagination.displayName = 'SimplePagination';
