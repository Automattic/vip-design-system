/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MdContentCopy } from 'react-icons/md';

const Code = React.forwardRef(
	( { prompt = false, showCopy = false, onCopy = null, className, ...props }, forwardRef ) => {
		const ref = useRef();

		const codeDom = (
			<code
				ref={ ref }
				sx={ {
					fontSize: 1,
					display: 'block',
					bg: 'layer.inverse',
					color: 'texts.inverse',
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
				className={ classNames( 'vip-code-component', className ) }
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
				ref={ forwardRef }
			>
				{ codeDom }
				{
					<button
						aria-label="Copy code"
						sx={ {
							bg: 'layer.accent',
							borderTopRightRadius: 1,
							borderWidth: 0,
							color: 'texts.inverse',
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
						{ copied ? (
							<span role="alert">Code copied to clipboard</span>
						) : (
							<MdContentCopy aria-hidden="true" />
						) }
					</button>
				}
			</div>
		);
	}
);

Code.displayName = 'Code';

Code.propTypes = {
	prompt: PropTypes.bool,
	showCopy: PropTypes.bool,
	onCopy: PropTypes.func,
	className: PropTypes.any,
};

export { Code };
