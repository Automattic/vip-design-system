/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports
import * as Ariakit from '@ariakit/react';
import removeAccents from 'remove-accents';
import clsx from 'clsx';

/**
 * Adapter/DS dependencies
 */
import { useInstanceId } from '../../adapter/compose';
import { __, sprintf } from '../../adapter/i18n';
import { useState, useMemo, useDeferredValue } from '../../adapter/element';

/**
 * Internal dependencies
 */
import { getCurrentValue } from './utils';
import type { Filter, NormalizedFilter, View, Option } from '../../types';

interface SearchWidgetProps {
	view: View;
	filter: NormalizedFilter & {
		elements: Option[];
	};
	onChangeView: ( view: View ) => void;
}

function normalizeSearchInput( input = '' ) {
	return removeAccents( input.trim().toLowerCase() );
}

const getNewValue = (
	filterDefinition: NormalizedFilter,
	currentFilter: Filter | undefined,
	value: any
) => {
	if ( filterDefinition.singleSelection ) {
		return value;
	}

	if ( Array.isArray( currentFilter?.value ) ) {
		return currentFilter.value.includes( value )
			? currentFilter.value.filter( ( v ) => v !== value )
			: [ ...currentFilter.value, value ];
	}

	return [ value ];
};

function generateFilterElementCompositeItemId(
	prefix: string,
	filterElementValue: string
) {
	return `${ prefix }-${ filterElementValue }`;
}

const MultiSelectionOption = ( { selected }: { selected: boolean } ) => {
	return (
		<span
			className={ clsx(
				'dataviews-filters__search-widget-listitem-multi-selection',
				{ 'is-selected': selected }
			) }
		>
			{ selected && <span aria-hidden>✓</span> }
		</span>
	);
};

const SingleSelectionOption = ( { selected }: { selected: boolean } ) => {
	return (
		<span
			className={ clsx(
				'dataviews-filters__search-widget-listitem-single-selection',
				{ 'is-selected': selected }
			) }
		/>
	);
};

function ListBox( { view, filter, onChangeView }: SearchWidgetProps ) {
	const baseId = useInstanceId( 'dataviews-filter-list-box' );

	const [ activeCompositeId, setActiveCompositeId ] = useState<
		string | null | undefined
	>(
		// When there are one or less operators, the first item is set as active
		// (by setting the initial `activeId` to `undefined`).
		// With 2 or more operators, the focus is moved on the operators control
		// (by setting the initial `activeId` to `null`), meaning that there won't
		// be an active item initially. Focus is then managed via the
		// `onFocusVisible` callback.
		filter.operators?.length === 1 ? undefined : null
	);
	const currentFilter = view.filters?.find(
		( f ) => f.field === filter.field
	);
	const currentValue = getCurrentValue( filter, currentFilter );
	return (
		<Ariakit.Composite
			virtualFocus
			focusLoop
			activeId={ activeCompositeId as any }
			setActiveId={ setActiveCompositeId as any }
			role="listbox"
			className="dataviews-filters__search-widget-listbox"
			aria-label={ sprintf(
				/* translators: List of items for a filter. 1: Filter name. e.g.: "List of: Author". */
				__( 'List of: %1$s' ),
				filter.name
			) }
			onFocusVisible={ () => {
				// `onFocusVisible` needs the `Composite` component to be focusable,
				// which is implicitly achieved via the `virtualFocus` prop.
				if ( ! activeCompositeId && filter.elements.length ) {
					setActiveCompositeId(
						generateFilterElementCompositeItemId(
							baseId,
							filter.elements[ 0 ].value
						)
					);
				}
			} }
			render={ <Ariakit.CompositeTypeahead /> }
		>
			{ filter.elements.map( ( element ) => (
				<Ariakit.CompositeHover
					key={ element.value }
					render={
						<Ariakit.CompositeItem
							id={ generateFilterElementCompositeItemId(
								baseId,
								element.value
							) }
							render={
								<div
									className="dataviews-filters__search-widget-listbox-item"
									role="option"
									aria-selected={ currentValue.includes(
										element.value
									) }
									onClick={ () =>
										onChangeView( {
											...view,
											page: 1,
											filters: [
												...( view.filters ?? [] ).filter(
													( f ) => f.field !== filter.field
												),
												{
													field: filter.field,
													operator: filter.operators[ 0 ],
													value: getNewValue(
														filter,
														currentFilter,
														element.value
													),
												},
											],
										} )
									}
								>
									{ filter.singleSelection ? (
										<SingleSelectionOption
											selected={ currentValue.includes(
												element.value
											) }
										/>
									) : (
										<MultiSelectionOption
											selected={ currentValue.includes(
												element.value
											) }
										/>
									) }
									<span>{ element.label }</span>
								</div>
							}
						/>
					}
				/>
			) ) }
		</Ariakit.Composite>
	);
}

export default function SearchWidget( props: SearchWidgetProps ) {
	const { view, filter, onChangeView } = props;
	const [ query, setQuery ] = useState( '' );
	const deferredQuery = useDeferredValue( query );
	const elements = filter.elements ?? [];

	const filteredElements = useMemo( () => {
		return elements.filter( ( { label } ) => {
			return normalizeSearchInput( label ).includes(
				normalizeSearchInput( deferredQuery )
			);
		} );
	}, [ elements, deferredQuery ] );

	return (
		<div className="dataviews-filters__search-widget">
			<div className="dataviews-filters__search-widget-search">
				<input
					type="search"
					placeholder={ sprintf( __( 'Search %1$s' ), filter.name ) }
					value={ query }
					onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) =>
						setQuery( e.target.value )
					}
				/>
			</div>
			<ListBox { ...props } />
		</div>
	);
}
