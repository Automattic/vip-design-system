/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import classNames, { Argument } from 'classnames';
import React, { useRef, useState } from 'react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { ScreenReaderText } from '../ScreenReaderText/ScreenReaderText';

interface ThemeProps extends Theme {
	outline?: Record< string, string >;
}

export type ToggleGroupVariant =
	| 'blue'
	| 'gold'
	| 'gray'
	| 'green'
	| 'orange'
	| 'pink'
	| 'red'
	| 'salmon'
	| 'yellow';

interface ToggleGroupOptionBase {
	/** Unique value reported through `onValueChange` when this option is selected. */
	value: string;
	/**
	 * The option's text label. Always its accessible name, so it is required even when the
	 * option shows only an icon.
	 */
	label: string;
	/**
	 * The color the option takes while it is selected.
	 * @default 'gray'
	 */
	variant?: ToggleGroupVariant;
	/**
	 * Whether this option is disabled and cannot be selected.
	 * @default false
	 */
	disabled?: boolean;
}

interface ToggleGroupLabelledOption extends ToggleGroupOptionBase {
	/** An optional icon rendered before the label. */
	icon?: React.ReactNode;
	hideLabel?: false;
}

interface ToggleGroupIconOnlyOption extends ToggleGroupOptionBase {
	/** The icon shown in place of the label. Required when `hideLabel` is set. */
	icon: React.ReactNode;
	/** Show only the icon, leaving `label` visually hidden but still read by screen readers. */
	hideLabel: true;
}

/**
 * A single option. `label` is always required and always the accessible name, so an option can
 * never end up unnamed; hiding it visually requires an icon to take its place.
 */
export type ToggleGroupOption = ToggleGroupLabelledOption | ToggleGroupIconOnlyOption;

export interface ToggleGroupProps {
	/** The selectable options, rendered left to right. */
	options: ToggleGroupOption[];
	/** Accessible name for the group. Required, as the control has no visible label. */
	'aria-label': string;
	/** The option selected on first render. Omit to start with nothing selected. */
	defaultValue?: string;
	/** The controlled selected value. Use together with `onValueChange`. */
	value?: string;
	/** Callback invoked when the selection changes. Never fires with an empty value. */
	onValueChange?: ( value: string ) => void;
	/**
	 * Whether the whole group is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/** Additional CSS class name(s) to apply to the root element. */
	className?: Argument;
	/** Theme UI style overrides for the root element. */
	sx?: ThemeUIStyleObject;
	/** Forwarded ref to the underlying root element. */
	ref?: React.Ref< HTMLDivElement >;
}

const rootStyles: ThemeUIStyleObject = {
	display: 'inline-flex',
	alignItems: 'center',
	padding: '2px',
	backgroundColor: 'layer.1',
	border: '1px solid',
	borderColor: 'border',
	borderRadius: 4,
};

const itemStyles = ( variant: ToggleGroupVariant ): ThemeUIStyleObject => ( {
	appearance: 'none',
	border: 'none',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: 0,
	fontWeight: 'medium',
	letterSpacing: '0.01em',
	lineHeight: 1,
	px: 3,
	py: 2,
	borderRadius: 4,
	backgroundColor: 'transparent',
	color: 'texts.secondary',
	whiteSpace: 'nowrap',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 2,
	svg: {
		display: 'block',
		fill: 'currentColor',
		width: '1rem',
		height: '1rem',
	},
	transition: 'background-color 0.1s ease-in-out, color 0.1s ease-in-out',
	'&[data-state="on"]': {
		backgroundColor: `tag.${ variant }.background`,
		color: `tag.${ variant }.text`,
	},
	'&:hover:not(:disabled):not([data-state="on"])': {
		backgroundColor: 'hover',
		color: 'heading',
	},
	'&:disabled': {
		cursor: 'not-allowed',
		color: 'muted',
	},
	'&:focus-visible': ( theme: ThemeProps ) => theme.outline,
} );

/**
 * ToggleGroup — A set of mutually exclusive options rendered as a single segmented control.
 * Each option carries its own color while selected, so the control can double as a status
 * indicator. Once an option is selected the group always keeps exactly one active.
 */
export const ToggleGroup = ( {
	options,
	defaultValue = undefined,
	value = undefined,
	onValueChange = undefined,
	disabled = false,
	className = null,
	sx,
	ref,
	...props
}: ToggleGroupProps ) => {
	const [ internalValue, setInternalValue ] = useState( defaultValue );
	const selectedValue = value ?? internalValue;
	const isArrowNavigating = useRef( false );

	const handleValueChange = ( nextValue: string ) => {
		// Radix clears the selection when the active option is clicked again. The group is
		// sticky once chosen, so an empty value is dropped rather than reported.
		if ( ! nextValue ) {
			return;
		}

		setInternalValue( nextValue );
		onValueChange?.( nextValue );
	};

	// Radix moves focus on arrow keys without selecting, but it renders the options as
	// `role="radio"`, where the radio group pattern expects selection to follow focus.
	// Tabbing in must not select, so only a focus that an arrow key caused counts.
	const handleItemKeyDown = ( event: React.KeyboardEvent ) => {
		isArrowNavigating.current = event.key.startsWith( 'Arrow' );
	};

	const handleItemFocus = ( optionValue: string ) => () => {
		if ( ! isArrowNavigating.current ) {
			return;
		}

		isArrowNavigating.current = false;
		handleValueChange( optionValue );
	};

	return (
		<ToggleGroupPrimitive.Root
			type="single"
			value={ selectedValue ?? '' }
			onValueChange={ handleValueChange }
			disabled={ disabled }
			className={ classNames( 'vip-toggle-group-component', className ) }
			sx={ { ...rootStyles, ...sx } }
			ref={ ref }
			{ ...props }
		>
			{ options.map(
				( {
					value: optionValue,
					label,
					icon,
					hideLabel,
					variant = 'gray',
					disabled: optionDisabled = false,
				} ) => (
					<ToggleGroupPrimitive.Item
						key={ optionValue }
						value={ optionValue }
						disabled={ optionDisabled }
						onKeyDown={ handleItemKeyDown }
						onFocus={ handleItemFocus( optionValue ) }
						className={ classNames(
							'vip-toggle-group-item',
							`vip-toggle-group-item-${ optionValue }`
						) }
						sx={ itemStyles( variant ) }
					>
						{ icon }
						{ hideLabel ? <ScreenReaderText>{ label }</ScreenReaderText> : label }
					</ToggleGroupPrimitive.Item>
				)
			) }
		</ToggleGroupPrimitive.Root>
	);
};

ToggleGroup.displayName = 'ToggleGroup';
