/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

/**
 * External dependencies
 */

import classNames from 'classnames';
import { forwardRef, ReactNode, Ref } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */

export const screenReaderTextClass: ThemeUIStyleObject = {
	border: 'none',
	clip: 'rect(1px, 1px, 1px, 1px)',
	clipPath: 'inset(50%)',
	height: '1px',
	margin: '-1px',
	overflow: 'hidden',
	padding: '0',
	position: 'absolute',
	width: '1px',
	wordWrap: 'normal !important' as 'normal',
};

export interface ScreenReaderTextProps {
	/** The content to be read by screen readers. */
	children: ReactNode;
}

/**
 * A utility component that visually hides content while keeping it accessible to screen readers.
 */
export const ScreenReaderText = forwardRef< HTMLSpanElement, ScreenReaderTextProps >(
	(
		{ className, ...props }: ScreenReaderTextProps & { className?: string },
		ref: Ref< HTMLSpanElement >
	) => (
		<span
			className={ classNames( 'screen-reader-text', className ) }
			sx={ screenReaderTextClass }
			{ ...props }
			ref={ ref }
		>
			{ props.children }
		</span>
	)
);
