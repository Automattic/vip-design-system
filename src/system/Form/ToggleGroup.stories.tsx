/** @jsxImportSource theme-ui */

import { useState } from 'react';

import { ToggleGroup } from './ToggleGroup';

export default {
	title: 'Toggle Group',
	component: ToggleGroup,
};

export const Default = () => {
	const [ value, setValue ] = useState( 'chart' );

	return (
		<form>
			<ToggleGroup
				onChange={ setValue }
				value={ value }
				options={ [
					{
						label: 'Chart',
						value: 'chart',
					},
					{
						label: 'Table',
						value: 'table',
					},
					{
						label: 'Grid',
						value: 'grid',
					},
				] }
			/>
		</form>
	);
};
