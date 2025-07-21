/**
 * External dependencies
 */
import { forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Grid } from '../Grid';

export interface DescriptionListProps {
	list: {
		label: string;
		value: string;
	}[];
	className?: string;
	sx?: ThemeUIStyleObject;
	labelWidth?: string;
}

const DescriptionList = forwardRef< HTMLDivElement, DescriptionListProps >(
	( { sx, className, list, labelWidth = '100px' }: DescriptionListProps ) => (
		<>
			{ list.map( item => (
				<Grid
					className={ className }
					as="dl"
					key={ item.label }
					columns={ [ `${ labelWidth } auto` ] }
					sx={ {
						fontSize: 2,
						gap: 2,
						alignItems: 'flex-start',
						...sx,
					} }
				>
					<dt>{ item.label }</dt>
					<dd>{ item.value }</dd>
				</Grid>
			) ) }
		</>
	)
);

DescriptionList.displayName = 'DescriptionList';

export { DescriptionList };
