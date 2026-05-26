/**
 * External dependencies
 */
import { type CSSProperties, forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Table, TableRow, TableCell, Grid, Box, Text } from '..';

export interface DescriptionListProps {
	/** The array of label-value pairs to display. */
	list: {
		label?: string | React.ReactNode;
		value?: string | React.ReactNode;
	}[];
	/** Additional CSS class name for the list container. */
	className?: string;
	/** Custom Theme UI styles for the list container. */
	sx?: ThemeUIStyleObject;
	/**
	 * The width of the label column when rendered as a description list.
	 * @default '100px'
	 */
	labelWidth?: string;
	/** An optional title displayed above the list. */
	title?: string;
	/**
	 * The HTML element type used to render the list.
	 * @default 'dl'
	 */
	as?: 'table' | 'dl';
	/**
	 * The font weight applied to values in the list.
	 * @default 'bold'
	 */
	fontWeight?: CSSProperties[ 'fontWeight' ];
}

const TableComponent = ( {
	list,
	className,
	sx,
	title,
	fontWeight = 'bold',
}: DescriptionListProps ) => (
	<Table
		caption={ `Summary of ${ title?.toString() }` }
		className={ className }
		sx={ {
			width: 'auto',
			minWidth: 'auto',
			'> tbody > tr': {
				'> td, > th': {
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
					<TableCell sx={ { color: 'text', fontWeight } }>{ item.value }</TableCell>
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
	fontWeight,
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
					color: 'texts.helper',
					...( fontWeight ? { '& > dd': { fontWeight } } : {} ),
				} }
			>
				<dt>{ item.label }:</dt>
				<dd>{ item.value }</dd>
			</Grid>
		) ) }
	</Box>
);

/**
 * A component that renders a list of label-value pairs as either a description list or a table.
 */
const DescriptionList = forwardRef< HTMLDivElement, DescriptionListProps >(
	(
		{
			sx,
			className,
			list,
			labelWidth = '100px',
			as = 'dl',
			title,
			fontWeight,
		}: DescriptionListProps,
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
					fontWeight={ fontWeight }
				/>
			</Box>
		);
	}
);

DescriptionList.displayName = 'DescriptionList';

export { DescriptionList };
