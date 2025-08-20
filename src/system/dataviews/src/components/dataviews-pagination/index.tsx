/**
 * Adapter dependencies
 */
import { Button, HStack } from '../../adapter/components';
import { createElement as createInterpolateElement, memo, useContext } from '../../adapter/element';
import { sprintf, __, _x, isRTL } from '../../adapter/i18n';
import { getIcon } from '../../adapter/icons';
import { Input } from '../../../Form';

/**
 * Internal dependencies
 */
import DataViewsContext from '../dataviews-context';

export function DataViewsPagination() {
	const {
		view,
		onChangeView,
		paginationInfo: { totalItems = 0, totalPages },
	} = useContext( DataViewsContext );

	if ( ! totalItems || ! totalPages || view.infiniteScrollEnabled ) {
		return null;
	}

	const currentPage = view.page ?? 1;
	const pageSelectOptions = Array.from( Array( totalPages ) ).map(
		( _, i ) => {
			const page = i + 1;
			return {
				value: page.toString(),
				label: page.toString(),
				'aria-label':
					currentPage === page
						? sprintf(
								// translators: 1: current page number. 2: total number of pages.
								__( 'Page %1$d of %2$d' ),
								currentPage,
								totalPages
						  )
						: page.toString(),
			};
		}
	);

	return (
		!! totalItems &&
		totalPages !== 1 && (
			<HStack
				expanded={ false }
				className="dataviews-pagination"
				justify="end"
				spacing={ 6 }
			>
				<HStack
					justify="flex-start"
					expanded={ false }
					spacing={ 1 }
					className="dataviews-pagination__page-select"
				>
					{ createInterpolateElement(
						sprintf(
							// translators: 1: Current page number, 2: Total number of pages.
							_x(
								'<div>Page</div>%1$s<div>of %2$d</div>',
								'paging'
							),
							'<CurrentPage />',
							totalPages
						),
						{
							div: <div aria-hidden />,
							CurrentPage: (
								<Input
									aria-label={ __( 'Current page' ) }
									value={ currentPage.toString() }
									onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
										const newValue = e.target.value;
										onChangeView( { ...view, page: +newValue } );
									} }
								/>
							),
						}
					) }
				</HStack>
				<HStack expanded={ false } spacing={ 1 }>
					<Button
						onClick={ () =>
							onChangeView( {
								...view,
								page: currentPage - 1,
							} )
						}
						disabled={ currentPage === 1 }
						accessibleWhenDisabled
						label={ __( 'Previous page' ) }
						icon={ isRTL() ? getIcon('arrowRight') : getIcon('arrowLeft') }
						showTooltip
						size="compact"
						tooltipPosition="top"
					/>
					<Button
						onClick={ () =>
							onChangeView( { ...view, page: currentPage + 1 } )
						}
						disabled={ currentPage >= totalPages }
						accessibleWhenDisabled
						label={ __( 'Next page' ) }
						icon={ isRTL() ? getIcon('arrowLeft') : getIcon('arrowRight') }
						showTooltip
						size="compact"
						tooltipPosition="top"
					/>
				</HStack>
			</HStack>
		)
	);
}

export default memo( DataViewsPagination );
