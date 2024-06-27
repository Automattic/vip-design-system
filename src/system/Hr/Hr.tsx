/** @jsxImportSource theme-ui */

import { ThemeUIStyleObject } from 'theme-ui';

export type HrProps = {
	sx?: ThemeUIStyleObject;
};

export const Hr = ( { sx, ...rest }: HrProps ) => (
	<hr sx={ { my: 4, border: 0, height: '1px', backgroundColor: 'borders.2', ...sx } } { ...rest } />
);
