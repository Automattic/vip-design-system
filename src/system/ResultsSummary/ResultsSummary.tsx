/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { MdFormatListBulleted } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Box } from '../Box';
import { Text } from '../Text/Text';

import type { TextProps } from '../Text/Text';

type ResultsSummaryElement = 'div' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type ControlledResultsSummaryProps =
	| 'aria-atomic'
	| 'aria-live'
	| 'as'
	| 'children'
	| 'role';

export type ResultsSummaryProps< E extends ResultsSummaryElement = 'p' > = Omit<
	TextProps< E >,
	ControlledResultsSummaryProps
> & {
	/** The complete, localized result summary. */
	children: React.ReactNode;
	/** The non-interactive text element used for the summary. */
	as?: E;
};

type ResultsSummaryComponent = {
	< E extends ResultsSummaryElement = 'p' >(
		props: ResultsSummaryProps< E >
	): React.ReactElement | null;
	displayName?: string;
};

const TextComponent = Text as React.ElementType;

/**
 * Displays a localized summary of a result set and politely announces updates.
 * Consumers remain responsible for count, range, entity, pluralization, and translation logic.
 */
const ResultsSummary = ( < E extends ResultsSummaryElement = 'p' >( {
	children,
	className,
	sx,
	...props
}: ResultsSummaryProps< E > ) => (
	<TextComponent
		{ ...props }
		aria-atomic="true"
		aria-live="polite"
		className={ classNames( 'vip-results-summary-component', className ) }
		sx={ {
			alignItems: 'center',
			display: 'flex',
			fontSize: 2,
			fontWeight: 'bold',
			mb: 0,
			...sx,
		} }
	>
		<Box
			as="span"
			aria-hidden="true"
			sx={ {
				alignItems: 'center',
				display: 'inline-flex',
				flexShrink: 0,
				justifyContent: 'center',
				lineHeight: 1,
				mr: 2,
			} }
		>
			<MdFormatListBulleted size={ 18 } />
		</Box>
		{ children }
	</TextComponent>
) ) as ResultsSummaryComponent;

ResultsSummary.displayName = 'ResultsSummary';

export { ResultsSummary };
