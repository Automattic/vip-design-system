/**
 * Adapter dependencies
 */
import { __ } from '../../adapter/i18n';
import { useEffect, useRef, memo, useContext } from '../../adapter/element';
import { Input } from '../../../Form';

/**
 * Internal dependencies
 */
import DataViewsContext from '../dataviews-context';

interface SearchProps {
	label?: string;
}

const DataViewsSearch = memo( function Search( { label }: SearchProps ) {
	const { view, onChangeView } = useContext( DataViewsContext );
	const search = view.search ?? '';
	const onChange = ( next: string ) => {
		onChangeView( { ...view, page: 1, search: next } );
	};
	const onChangeViewRef = useRef( onChangeView );
	const viewRef = useRef( view );
	useEffect( () => {
		onChangeViewRef.current = onChangeView;
		viewRef.current = view;
	}, [ onChangeView, view ] );
	const searchLabel = label || __( 'Search' );
	return (
		<Input
			className="dataviews-search"
			value={ search }
			onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) =>
				onChange( e.target.value )
			}
			aria-label={ searchLabel }
			placeholder={ searchLabel }
		/>
	);
} );

export default DataViewsSearch;
