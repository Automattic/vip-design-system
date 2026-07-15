/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdClose } from 'react-icons/md';

import { Button } from '../Button/Button';

const FormAutocompleteMultiselectButton = ( {
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
			<Button
				variant="tertiary"
				onClick={ e => {
					e.preventDefault();
					unselectValue( option, index );
				} }
				sx={ {
					mt: 1,
					fontSize: 1,
					maxWidth: '100%',
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
				<MdClose sx={ { ml: 2 } } />
			</Button>
		</div>
	);
};

export { FormAutocompleteMultiselectButton };
