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
	ref?: React.Ref< HTMLDivElement >;
}

const FormSelectContent = ( { isInline, label, children, ref }: FormSelectContentProps ) => (
	<div sx={ isInline ? inlineStyles : {} } className="vip-select-component" ref={ ref }>
		{ isInline && label }

		<div sx={ defaultStyles }>{ children }</div>
	</div>
);

FormSelectContent.displayName = 'FormSelectContent';

export { FormSelectContent };
export type { FormSelectContentProps };
