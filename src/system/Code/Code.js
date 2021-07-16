/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { MdContentCopy } from 'react-icons/md';

const Code = ( { prompt = false, showCopy = false, ...props } ) => {
	const ref = useRef();

	const codeDom = (
		<code
			ref={ ref }
			sx={ {
				fontSize: 1,
				display: 'block',
				bg: 'modes.dark.card',
				color: 'modes.dark.heading',
				borderRadius: 2,
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
				<span
					sx={ {
						position: 'absolute',
						top: 0,
						bg: 'modes.dark.heading',
						right: 0,
						paddingRight: 2,
						paddingLeft: 2,
						paddingTop: 1,
						paddingBottom: 1,
						borderTopRightRadius: 1,
						opacity: 0.8,
						'&:hover': {
							opacity: 1,
							cursor: 'pointer',
						},
					} }
					onClick={ () => {
						window.navigator.clipboard.writeText( ref.current?.innerText );
						setCopied( true );
					} }
				>
					{ copied ? 'Copied!' : <MdContentCopy /> }
				</span>
			}
		</div>
	);
};

Code.propTypes = {
	prompt: PropTypes.bool,
	showCopy: PropTypes.bool,
};

export { Code };
