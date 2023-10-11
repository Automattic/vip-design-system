/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

/**
 * External dependencies
 */

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
	children: ReactNode;
}

export const ScreenReaderText = forwardRef< HTMLSpanElement, ScreenReaderTextProps >(
	( props: ScreenReaderTextProps, ref: Ref< HTMLSpanElement > ) => (
		<span className="screen-reader-text" sx={ screenReaderTextClass } { ...props } ref={ ref }>
			{ props.children }
		</span>
	)
);

ScreenReaderText.displayName = 'ScreenReaderText';
