/**
 * External dependencies
 */
import { forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Table, TableRow, TableCell, Grid, Box, Text } from '..';

export interface DescriptionListProps {
	list: {
		label?: string | React.ReactNode;
		value?: string | React.ReactNode;
	}[];
	className?: string;
	sx?: ThemeUIStyleObject;
	labelWidth?: string;
	title?: string;
	as?: 'table' | 'dl';
}

const TableComponent = ( { list, className, sx, title }: DescriptionListProps ) => (
	<Table
		caption={ `Summary of ${ title?.toString() }` }
		className={ className }
		sx={ {
			width: 'auto',
			minWidth: 'auto',
			'> tbody > tr': {
				'> td, > th': {
					fontWeight: 'heading',
					border: 'none',
					pl: 0,
					'&:first-of-type': { pl: 0 },
				},
			},
			...sx,
		} }
	>
		<tbody>
			{ list.map( ( item, index ) => (
				<TableRow key={ `summary_tb_${ index }` }>
					<TableCell as="th" scope="row" sx={ { color: 'gray', whiteSpace: 'nowrap', pr: 1 } }>
						{ item.label }
						{ item.value ? ':' : '' }
					</TableCell>
					<TableCell sx={ { color: 'text' } }>
						<strong>{ item.value }</strong>
					</TableCell>
				</TableRow>
			) ) }
		</tbody>
	</Table>
);

const DescriptionListComponent = ( {
	list,
	className,
	sx,
	title,
	labelWidth = '100px',
}: DescriptionListProps ) => (
	<Box className={ className } sx={ sx }>
		{ title && <Text sx={ { fontSize: 2 } }>{ title }</Text> }
		{ list.map( ( item, index ) => (
			<Grid
				as="dl"
				key={ `description_list_${ index }` }
				columns={ [ `${ labelWidth } auto` ] }
				sx={ {
					fontSize: 2,
					gap: 2,
					alignItems: 'flex-start',
				} }
			>
				<dt>{ item.label }:</dt>
				<dd>{ item.value }</dd>
			</Grid>
		) ) }
	</Box>
);

const DescriptionList = forwardRef< HTMLDivElement, DescriptionListProps >(
	(
		{ sx, className, list, labelWidth = '100px', as = 'dl', title }: DescriptionListProps,
		ref
	) => {
		const Component = as === 'table' ? TableComponent : DescriptionListComponent;

		return (
			<Box ref={ ref }>
				<Component
					list={ list }
					className={ className }
					sx={ sx }
					labelWidth={ labelWidth }
					title={ title }
				/>
			</Box>
		);
	}
);

DescriptionList.displayName = 'DescriptionList';

export { DescriptionList };
