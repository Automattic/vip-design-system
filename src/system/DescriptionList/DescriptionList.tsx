/**
 * External dependencies
 */
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Grid } from '../Grid/Grid';
import { Table } from '../Table/Table';
import { TableCell } from '../Table/TableCell';
import { TableRow } from '../Table/TableRow';
import { Text } from '../Text/Text';

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
	/** Forwarded ref to the underlying container element. */
	ref?: React.Ref< HTMLDivElement >;
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
					color: 'texts.helper',
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
const DescriptionList = ( {
	sx,
	className,
	list,
	labelWidth = '100px',
	as = 'dl',
	title,
	ref,
}: DescriptionListProps ) => {
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
};

DescriptionList.displayName = 'DescriptionList';

export { DescriptionList };
