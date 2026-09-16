/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import React, { ReactNode, createRef, useState } from 'react';
import { MdContentCopy } from 'react-icons/md';

export type CodeProps = React.ComponentPropsWithoutRef< 'code' > & {
	/**
	 * Display a shell-style `$` prompt before the code content.
	 * @default false
	 */
	prompt?: boolean;
	/**
	 * Show a copy-to-clipboard button alongside the code.
	 * @default false
	 */
	showCopy?: boolean;
	/** Callback fired after the code text has been copied to the clipboard. */
	onCopy?: () => void;
	/** Additional CSS class name(s) appended to the root element. */
	className?: Argument;
	/** Content rendered inside the code block. */
	children?: ReactNode;
	/** Ref forwarded to the wrapping element. */
	ref?: React.Ref< HTMLDivElement >;
};

/** Styled code block with optional shell prompt and copy-to-clipboard support. */
const Code = ( {
	prompt = false,
	showCopy = false,
	onCopy,
	className,
	ref: forwardedRef,
	...props
}: CodeProps ) => {
	const ref = createRef< HTMLElement >();

	const codeDom = (
		<code
			ref={ ref }
			sx={ {
				fontSize: 1,
				display: 'block',
				bg: 'logs.background',
				color: 'logs.text.primary',
				borderRadius: 1,
				py: 2,
				px: 3,
				verticalAlign: 'middle',
				fontFamily: 'monospace',
				time: {
					fontFamily: 'inherit',
					color: 'logs.text.secondary',
				},
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

	const [ copied, setCopied ] = useState( false );

	if ( ! showCopy ) {
		return codeDom;
	}

	const onClickCopy = () => {
		window.navigator.clipboard
			.writeText( ref.current?.innerText ?? '' )
			.then( () => {
				setCopied( true );

				if ( onCopy ) {
					onCopy();
				}
			} )
			.catch( () => {} );
	};

	return (
		<div
			sx={ {
				position: 'relative',
			} }
			ref={ forwardedRef }
		>
			{ codeDom }
			{
				<button
					type="button"
					aria-label="Copy code"
					sx={ {
						bg: 'notice.background.warning',
						borderTopRightRadius: 1,
						borderWidth: 0,
						color: 'notice.text.warning',
						paddingBottom: 1,
						paddingLeft: 2,
						paddingRight: 2,
						paddingTop: 1,
						position: 'absolute',
						right: 0,
						top: 0,
						'&:hover': {
							opacity: 1,
							cursor: 'pointer',
						},
					} }
					onClick={ onClickCopy }
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
};

Code.displayName = 'Code';

export { Code };
