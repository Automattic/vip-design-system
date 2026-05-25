/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdClose } from 'react-icons/md';

const FormAutocompleteMultiselectChip = ( {
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
			key={ index }
			sx={ {
				display: 'inline-flex',
				alignItems: 'center',
				backgroundColor: 'input.background.secondary',
				borderRadius: '12px',
				px: 2,
				py: '2px',
				m: '2px',
				fontSize: 1,
				lineHeight: 'normal',
				maxWidth: '100%',
				whiteSpace: 'nowrap',
			} }
		>
			<span
				sx={ {
					overflow: 'hidden',
					textOverflow: 'ellipsis',
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
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					p: 0,
					ml: 1,
					color: 'inherit',
					'&:hover': { opacity: 0.7 },
				} }
			>
				<MdClose size={ 14 } />
			</button>
		</span>
	);
};

export { FormAutocompleteMultiselectChip };
