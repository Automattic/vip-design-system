/**
 * External dependencies
 */
import { forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Grid } from '../Grid';

interface Props {
	list: {
		label: string;
		value: string;
	}[];
	className?: string;
	sx?: ThemeUIStyleObject;
	labelWidth?: string;
}

export const DescriptionList = forwardRef< HTMLDivElement, Props >(
	( { sx, className, list, labelWidth = '100px' }: Props ) => (
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

export default DescriptionList;
