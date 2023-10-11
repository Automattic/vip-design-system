/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';
import { IconType } from 'react-icons/lib';

const errorColor = 'texts.error';
const helperColor = 'texts.helper';

interface ValidationProps {
	children?: React.ReactNode;
	isValid?: boolean;
	describedId?: string;
}

export const Validation = ( { children, isValid, describedId, ...props }: ValidationProps ) => {
	const Icon: IconType = isValid ? MdCheckCircle : MdErrorOutline;

	return (
		<p
			sx={ {
				color: isValid ? helperColor : errorColor,
				display: 'flex',
				alignItems: 'center',
				m: 0,
				fontSize: 1,
			} }
			id={ describedId ? `describe-${ describedId }-validation` : undefined }
			{ ...props }
		>
			<Icon sx={ { mr: 1 } } aria-hidden="true" />
			{ children }
		</p>
	);
};
