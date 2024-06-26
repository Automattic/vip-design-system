/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import React, { useState } from 'react';
import { MdCheck, MdKeyboardArrowDown } from 'react-icons/md';

import { Button } from '../Button';
import * as Dropdown from '../Dropdown';
import { DropdownCheckboxItemProps } from '../Dropdown/DropdownItem';
import ScreenReaderText from '../ScreenReaderText';

export type FilterDropdownCheckItemProps = DropdownCheckboxItemProps & {
	checked: boolean;
	item: {
		label: string;
		size?: number | string;
	};
	onClick: () => void;
};

const FilterDropdownCheckItem = ( { checked, item, onClick }: FilterDropdownCheckItemProps ) => (
	<Dropdown.CheckboxItem checked={ checked } onClick={ onClick }>
		<Dropdown.ItemIndicator>
			<MdCheck size={ 14 } sx={ { mr: 2 } } fill="brand" />
		</Dropdown.ItemIndicator>
		{ item.label } { item?.size ? `(${ item?.size })` : null }
	</Dropdown.CheckboxItem>
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
};

export const FilterDropdown = ( {
	className,
	filters,
	label,
	onSelect,
	defaultValue = null,
}: FilterDropdownProps ) => {
	const translate = useTranslate();
	const filterKeys = Object.keys( filters );
	const firstFilter = filterKeys[ 0 ];
	const [ filter, setFilter ] = useState( defaultValue || firstFilter );

	return (
		<Dropdown.Root
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
			{ filterKeys.map( key => (
				<FilterDropdownCheckItem
					key={ key }
					checked={ filter === key }
					onClick={ () => {
						setFilter( key );
						onSelect( filters[ key ], key );
					} }
					item={ filters[ key ] }
				/>
			) ) }
		</Dropdown.Root>
	);
};
