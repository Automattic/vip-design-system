/**
 * External dependencies
 */
import clsx from 'clsx';
import type { RefObject } from 'react';

/**
 * Adapter dependencies
 */
import { HStack, VStack, Button } from '../../adapter/components';
import { __ } from '../../adapter/i18n';
import { useRef } from '../../adapter/element';
import { getIcon } from '../../adapter/icons';

const ENTER = 'Enter';
const SPACE = ' ';

/**
 * Internal dependencies
 */
import SearchWidget from './search-widget';
import InputWidget from './input-widget';
import {
	OPERATORS,
	OPERATOR_IS,
	OPERATOR_IS_NOT,
	OPERATOR_IS_ANY,
	OPERATOR_IS_NONE,
	OPERATOR_IS_ALL,
	OPERATOR_IS_NOT_ALL,
	OPERATOR_LESS_THAN,
	OPERATOR_GREATER_THAN,
	OPERATOR_LESS_THAN_OR_EQUAL,
	OPERATOR_GREATER_THAN_OR_EQUAL,
	OPERATOR_CONTAINS,
	OPERATOR_NOT_CONTAINS,
	OPERATOR_STARTS_WITH,
	OPERATOR_BEFORE,
	OPERATOR_AFTER,
	OPERATOR_BEFORE_INC,
	OPERATOR_AFTER_INC,
	OPERATOR_BETWEEN,
	OPERATOR_ON,
	OPERATOR_NOT_ON,
	OPERATOR_IN_THE_PAST,
	OPERATOR_OVER,
} from '../../constants';
import type {
	Filter,
	NormalizedFilter,
	Operator,
	Option,
	View,
	NormalizedField,
} from '../../types';

interface FilterTextProps {
	activeElements: Option[];
	filterInView?: Filter;
	filter: NormalizedFilter;
}

interface OperatorSelectorProps {
	filter: NormalizedFilter;
	view: View;
	onChangeView: ( view: View ) => void;
}

interface FilterProps extends OperatorSelectorProps {
	addFilterRef: RefObject< HTMLButtonElement >;
	openedFilter: string | null;
	fields: NormalizedField< any >[];
}

const FilterText = ( {
	activeElements,
	filterInView,
	filter,
}: FilterTextProps ) => {
	if ( activeElements === undefined || activeElements.length === 0 ) {
		return filter.name;
	}

	const filterTextWrappers = {
		Name: <span className="dataviews-filters__summary-filter-text-name" />,
		Value: (
			<span className="dataviews-filters__summary-filter-text-value" />
		),
	};

	if ( filterInView?.operator === OPERATOR_IS_ANY ) {
		return `${filter.name} is any: ${activeElements.map( ( element ) => element.label ).join( ', ' )}`;
	}

	if ( filterInView?.operator === OPERATOR_IS_NONE ) {
		return `${filter.name} is none: ${activeElements.map( ( element ) => element.label ).join( ', ' )}`;
	}

	if ( filterInView?.operator === OPERATOR_IS_ALL ) {
		return `${filter.name} is all: ${activeElements.map( ( element ) => element.label ).join( ', ' )}`;
	}

	if ( filterInView?.operator === OPERATOR_IS_NOT_ALL ) {
		return `${filter.name} is not all: ${activeElements.map( ( element ) => element.label ).join( ', ' )}`;
	}

	if ( filterInView?.operator === OPERATOR_IS ) {
		return `${filter.name} is: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_IS_NOT ) {
		return `${filter.name} is not: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_LESS_THAN ) {
		return `${filter.name} is less than: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_GREATER_THAN ) {
		return `${filter.name} is greater than: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_LESS_THAN_OR_EQUAL ) {
		return `${filter.name} is less than or equal to: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_GREATER_THAN_OR_EQUAL ) {
		return `${filter.name} is greater than or equal to: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_CONTAINS ) {
		return `${filter.name} contains: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_NOT_CONTAINS ) {
		return `${filter.name} doesn't contain: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_STARTS_WITH ) {
		return `${filter.name} starts with: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_BEFORE ) {
		return `${filter.name} is before: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_AFTER ) {
		return `${filter.name} is after: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_BEFORE_INC ) {
		return `${filter.name} is on or before: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_AFTER_INC ) {
		return `${filter.name} is on or after: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_BETWEEN ) {
		const { label } = activeElements[ 0 ];

		return `${filter.name} between (inc): ${label[ 0 ]} and ${label[ 1 ]}`;
	}

	if ( filterInView?.operator === OPERATOR_ON ) {
		return `${filter.name} is: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_NOT_ON ) {
		return `${filter.name} is not: ${activeElements[ 0 ].label}`;
	}

	if ( filterInView?.operator === OPERATOR_IN_THE_PAST ) {
		return `${filter.name} is in the past: ${activeElements[ 0 ].value.value} ${activeElements[ 0 ].value.unit}`;
	}

	if ( filterInView?.operator === OPERATOR_OVER ) {
		return `${filter.name} is over: ${activeElements[ 0 ].value.value} ${activeElements[ 0 ].value.unit} ago`;
	}
	return `${filter.name}`;
};

function OperatorSelector( {
	filter,
	view,
	onChangeView,
}: OperatorSelectorProps ) {
	const operatorOptions = filter.operators?.map( ( operator ) => ( {
		value: operator,
		label: OPERATORS[ operator ]?.label,
	} ) );
	const currentFilter = view.filters?.find(
		( _filter ) => _filter.field === filter.field
	);
	const value = currentFilter?.operator || filter.operators[ 0 ];
	return (
		operatorOptions.length > 1 && (
			<HStack
				spacing={ 2 }
				justify="flex-start"
				className="dataviews-filters__summary-operators-container"
			>
				<span className="dataviews-filters__summary-operators-filter-name">
					{ filter.name }
				</span>

				<select
					className="dataviews-filters__summary-operators-filter-select"
					aria-label={ __( 'Conditions' ) }
					value={ value as any }
					onChange={ ( e: React.ChangeEvent<HTMLSelectElement> ) => {
						const operator = e.target.value as Operator;
						const currentOperator = currentFilter?.operator;
						const newFilters = currentFilter
							? [
									...( view.filters ?? [] ).map( ( _filter ) => {
										if ( _filter.field === filter.field ) {
											// Reset the value only when switching between operators that have different value types.
											const OPERATORS_SHOULD_RESET_VALUE = [
												OPERATOR_BETWEEN,
												OPERATOR_IN_THE_PAST,
												OPERATOR_OVER,
											];
											const shouldResetValue =
												currentOperator &&
												(
													OPERATORS_SHOULD_RESET_VALUE.includes( currentOperator ) ||
													OPERATORS_SHOULD_RESET_VALUE.includes( operator )
												)
											);

											return {
												..._filter,
												value: shouldResetValue ? undefined : _filter.value,
												operator,
											};
										}
										return _filter;
									} ),
							  ]
							: [
									...( view.filters ?? [] ),
									{
										field: filter.field,
										operator,
										value: undefined,
									},
							  ];
						onChangeView( {
							...view,
							page: 1,
							filters: newFilters,
						} );
					} }
				/>
			</HStack>
		)
	);
}

export default function Filter( {
	addFilterRef,
	openedFilter,
	fields,
	...commonProps
}: FilterProps ) {
	const toggleRef = useRef< HTMLDivElement >( null );
	const { filter, view, onChangeView } = commonProps;
	const filterInView = view.filters?.find(
		( f ) => f.field === filter.field
	);

	let activeElements: Option[] = [];

	if ( filter.elements.length > 0 ) {
		activeElements = filter.elements.filter( ( element ) => {
			if ( filter.singleSelection ) {
				return element.value === filterInView?.value;
			}
			return filterInView?.value?.includes( element.value );
		} );
	} else if ( filterInView?.value !== undefined ) {
		activeElements = [
			{
				value: filterInView.value,
				label: filterInView.value,
			},
		];
	}

	const isPrimary = filter.isPrimary;
	const isLocked = filterInView?.isLocked;
	const hasValues = ! isLocked && filterInView?.value !== undefined;
	const canResetOrRemove = ! isLocked && ( ! isPrimary || hasValues );
	return (
		<div className={ clsx( 'dataviews-filters__filter', { 'is-open': openedFilter === filter.field } ) }>
			{/* Header */}
			<HStack className="dataviews-filters__summary" spacing={ 2 }>
				<Button
					className="dataviews-filters__summary-toggle"
					label={ __( 'Toggle filter' ) }
					icon={ getIcon('chevronDown') }
					aria-expanded={ openedFilter === filter.field }
					onClick={ () => {
						onChangeView( {
							...view,
							filters: view.filters?.map( ( f ) => ( {
								...f,
								isOpen:
									f.field === filter.field ? ! f.isOpen : f.isOpen,
							} ) ),
						} );
					} }
				/>
				<div className="dataviews-filters__summary-text">
					<FilterText
						activeElements={ activeElements }
						filterInView={ filterInView }
						filter={ filter }
					/>
				</div>
			</HStack>

			{/* Body */}
			{ openedFilter === filter.field && (
				<VStack className="dataviews-filters__content" spacing={ 3 }>
					<OperatorSelector
						filter={ filter }
						view={ view }
						onChangeView={ onChangeView }
					/>
					{ filter.elements.length > 0 ? (
						<SearchWidget { ...commonProps } />
					) : (
						<InputWidget { ...commonProps } />
					) }
				</VStack>
			) }
		</div>
	);
}
