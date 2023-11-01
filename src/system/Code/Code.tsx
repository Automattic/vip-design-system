/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { ReactNode, createRef, useState } from 'react';
import classNames, { Argument } from 'classnames';
import { MdContentCopy } from 'react-icons/md';

export interface CodeProps {
	prompt?: boolean;
	showCopy?: boolean;
	onCopy?: () => void;
	className?: Argument;
	children?: ReactNode;
}

const Code = React.forwardRef< HTMLDivElement, CodeProps >(
	( { prompt = false, showCopy = false, onCopy, className, ...props }: CodeProps, forwardRef ) => {
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
					px: 4,
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
				ref={ forwardRef }
			>
				{ codeDom }
				{
					<button
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
	}
);

Code.displayName = 'Code';

export { Code };
