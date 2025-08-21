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
}

const FormSelectContent = React.forwardRef< HTMLDivElement, FormSelectContentProps >(
	( { isInline, label, children }, forwardRef ) => (
		<div sx={ isInline ? inlineStyles : {} } className="vip-select-component" ref={ forwardRef }>
			{ isInline && label }

			<div sx={ defaultStyles }>{ children }</div>
		</div>
	)
);

FormSelectContent.displayName = 'FormSelectContent';

export { FormSelectContent };
export type { FormSelectContentProps };
