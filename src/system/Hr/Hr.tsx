/** @jsxImportSource theme-ui */

import { ThemeUIStyleObject } from 'theme-ui';

export type HrProps = {
	/** Theme UI style overrides applied to the horizontal rule. */
	sx?: ThemeUIStyleObject;
};

/** Themed horizontal rule used as a visual separator. */
export const Hr = ( { sx, ...rest }: HrProps ) => (
	<hr sx={ { my: 4, border: 0, height: '1px', backgroundColor: 'borders.2', ...sx } } { ...rest } />
);
