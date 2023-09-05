/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Input } from './Input';

const Textarea = React.forwardRef( ( props, ref ) => (
	<Input ref={ ref } as="textarea" { ...props } />
) );

Textarea.displayName = 'Textarea';

export { Textarea };
