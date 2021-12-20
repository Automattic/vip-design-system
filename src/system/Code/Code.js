/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { MdContentCopy } from 'react-icons/md';

const Code = ( { prompt = false, showCopy = false, onCopy = null, ...props } ) => {
	const ref = useRef();

	const codeDom = (
		<code
			ref={ ref }
			sx={ {
				fontSize: 1,
				display: 'block',
				bg: 'grey.90',
				color: 'grey.10',
				borderRadius: 1,
				py: 2,
				px: 3,
				verticalAlign: 'middle',
				fontFamily: 'monospace',
				'&:before': {
					content: prompt ? '"$"' : 'none',
					marginRight: 2,
					userSelect: 'none',
				},
			} }
			{ ...props }
		/>
	);

	if ( ! showCopy ) {
		return codeDom;
	}

	const [ copied, setCopied ] = useState( false );

	return (
		<div
			sx={ {
				position: 'relative',
			} }
		>
			{ codeDom }
			{
				<button
					aria-label="Copy"
					sx={ {
						bg: 'grey.10',
						borderTopRightRadius: 1,
						borderWidth: 0,
						color: 'muted',
						opacity: 0.8,
						paddingBottom: 1,
						paddingLeft: 2,
						paddingRight: 2,
						paddingTop: 1,
						position: 'absolute',
						right: 0,
						top: '-1px',
						'&:hover': {
							opacity: 1,
							cursor: 'pointer',
						},
					} }
					onClick={ () => {
						window.navigator.clipboard.writeText( ref.current?.innerText );

						setCopied( true );

						if ( onCopy ) {
							onCopy();
						}
					} }
				>
					{ copied ? 'Copied!' : <MdContentCopy /> }
				</button>
			}
		</div>
	);
};

Code.propTypes = {
	prompt: PropTypes.bool,
	showCopy: PropTypes.bool,
	onCopy: PropTypes.func,
};

export { Code };
