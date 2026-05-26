/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdClose } from 'react-icons/md';

const FormAutocompleteMultiselectInlineChip = ( {
	index,
	option,
	unselectValue,
}: {
	index: number;
	option: string;
	unselectValue: ( option: string, index: number ) => void;
} ) => {
	return (
		<span
			sx={ {
				display: 'inline-flex',
				alignItems: 'center',
				gap: 1,
				px: 2,
				py: '2px',
				m: '2px',
				bg: 'layer.1',
				borderRadius: 1,
				fontSize: 1,
				lineHeight: '20px',
				whiteSpace: 'nowrap',
				maxWidth: '100%',
			} }
		>
			<span
				sx={ {
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				} }
			>
				{ option }
			</span>
			<button
				type="button"
				aria-label={ `Remove ${ option }` }
				onClick={ e => {
					e.preventDefault();
					e.stopPropagation();
					unselectValue( option, index );
				} }
				sx={ {
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					p: 0,
					border: 'none',
					bg: 'transparent',
					cursor: 'pointer',
					color: 'text',
					lineHeight: 0,
					'&:hover': {
						opacity: 0.7,
					},
				} }
			>
				<MdClose size={ 14 } />
			</button>
		</span>
	);
};

export { FormAutocompleteMultiselectInlineChip };
