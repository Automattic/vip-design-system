/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Input } from './Input';

const Textarea = ( { ref, ...props } ) => <Input ref={ ref } as="textarea" { ...props } />;

Textarea.displayName = 'Textarea';

export { Textarea };
