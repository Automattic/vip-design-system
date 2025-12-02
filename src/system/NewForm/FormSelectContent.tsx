/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { inlineStyles } from './FormSelectInline';

/**
 * Internal dependencies
 */

const defaultStyles: ThemeUIStyleObject = {
	position: 'relative',
	width: '100%',
	display: 'inline-flex',
	flexDirection: 'row',
	alignItems: 'center',
};

interface FormSelectContentProps {
	isInline?: boolean;
	label?: React.ReactNode;
	children?: React.ReactNode;
	hasError?: boolean;
	size?: string;
}

const FormSelectContent = React.forwardRef< HTMLDivElement, FormSelectContentProps >(
	( { isInline, label, children, hasError, size }, forwardRef ) => {
		const inlineStylesWithError = isInline ? {
			...inlineStyles,
			borderColor: hasError ? 'input.border.error' : inlineStyles.borderColor,
		} : {};
		
		return (
			<div sx={ inlineStylesWithError } className="vip-select-component" ref={ forwardRef }>
				{ isInline && label }

				<div sx={ defaultStyles }>{ children }</div>
			</div>
		);
	}
);

FormSelectContent.displayName = 'FormSelectContent';

export { FormSelectContent };
export type { FormSelectContentProps };
