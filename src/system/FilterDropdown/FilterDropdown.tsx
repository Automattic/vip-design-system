/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Button } from '../Button';
import * as Dropdown from '../Dropdown';
import { DropdownContentProps } from '../Dropdown/DropdownContent';
import ScreenReaderText from '../ScreenReaderText';

export type FilterDropdownRadioItemProps = {
	value: string;
	item: {
		label: string;
		size?: number | string;
	};
};

const FilterDropdownRadioItem = ( { value, item }: FilterDropdownRadioItemProps ) => (
	<Dropdown.RadioItem value={ value }>
		{ item.label } { item?.size ? `(${ item?.size })` : null }
	</Dropdown.RadioItem>
);
export type FilterDropDownFilterProp = {
	label: string;
	size?: number | string;
	value?: number | string;
};

export interface FilterDropdownFiltersProp {
	[ key: string ]: FilterDropDownFilterProp;
}

export type FilterDropdownProps = {
	className?: string;
	filters: FilterDropdownFiltersProp;
	label?: React.ReactNode | string;
	onSelect: ( filter: FilterDropDownFilterProp, key: string ) => void;
	defaultValue?: string | null;
	contentProps?: DropdownContentProps;
};

export const FilterDropdown = ( {
	className,
	filters,
	label,
	onSelect,
	defaultValue = null,
	contentProps = {},
}: FilterDropdownProps ) => {
	const translate = useTranslate();
	const filterKeys = Object.keys( filters );
	const firstFilter = filterKeys[ 0 ];
	const [ filter, setFilter ] = useState( defaultValue || firstFilter );

	return (
		<Dropdown.Root
			contentProps={ contentProps }
			trigger={
				<Button
					className={ classNames( 'vip-filter-dropdown-trigger', className ) }
					variant="secondary"
				>
					<ScreenReaderText>{ translate( 'Filter:' ) } </ScreenReaderText>

					{ label }

					<strong sx={ { mx: 2 } }> { filters[ filter ].label } </strong>

					<ScreenReaderText>{ translate( 'checked' ) }</ScreenReaderText>

					<MdKeyboardArrowDown />
				</Button>
			}
		>
			<Dropdown.RadioGroup
				value={ filter }
				onValueChange={ newValue => {
					setFilter( newValue );
					onSelect( filters[ newValue ], newValue );
				} }
			>
				{ filterKeys.map( key => (
					<FilterDropdownRadioItem key={ key } value={ key } item={ filters[ key ] } />
				) ) }
			</Dropdown.RadioGroup>
		</Dropdown.Root>
	);
};
