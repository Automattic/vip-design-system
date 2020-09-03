/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Text as ThemeText } from 'theme-ui';

const Text = ( { ...props } ) => (
	<ThemeText
		as="p"
		sx={{
			lineHeight: 1.5,
			marginBottom: 2,
		}}
		{...props}
	/>
);

export { Text };
