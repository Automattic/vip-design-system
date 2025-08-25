/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdClose } from 'react-icons/md';

import { Badge } from '..';

const FormAutocompleteMultiselectBadge = ( {
	index,
	option,
	unselectValue,
}: {
	index: number;
	option: string;
	unselectValue: ( option: string, index: number ) => void;
} ) => {
	return (
		<div key={ index } sx={ { mr: 1, maxWidth: '100%' } }>
			<Badge
				variant="gray"
				sx={ {
					mt: 1,
					fontSize: 1,
					maxWidth: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				} }
			>
				<div
					sx={ {
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					} }
				>
					{ option }
				</div>
				<MdClose
					sx={ { ml: 2, cursor: 'pointer' } }
					onClick={ e => {
						e.preventDefault();
						unselectValue( option, index );
					} }
				/>
			</Badge>
		</div>
	);
};

export { FormAutocompleteMultiselectBadge };
