/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { Toggle, Label } from '..';

export default {
	title: 'Toggle',
	component: Toggle,
	argTypes: {
		checked: {
			options: [ true, false ],
			default: true,
			control: { type: 'radio' },
		},
	},
};

const Default = args => (
	<form>
		<Toggle
			checked={ args.checked }
			defaultChecked
			color={ args.color }
			aria-label="Feature flag"
		/>

		<br />
		<br />

		<Toggle checked={ args.checked } defaultChecked={ false } aria-label="Feature flag 2" />
	</form>
);

const WithLabel = args => (
	<form>
		<Label htmlFor="custom-label-input">Custom Label here</Label>

		<Toggle
			id="custom-label-input"
			defaultChecked
			checked={ args.checked }
			aria-label="Feature flag"
		/>
	</form>
);

const CustomStyling = args => (
	<form>
		<Label htmlFor="custom-label-input">Custom Styling</Label>

		<div>
			<Toggle
				id="custom-label-input"
				defaultChecked
				checked={ args.checked }
				aria-label="Feature flag"
				variant="primary"
			/>{ ' ' }
			<Toggle
				id="custom-label-input-error"
				defaultChecked
				checked={ args.checked }
				aria-label="Error flag"
				variant="error"
			/>{ ' ' }
			<Toggle
				id="custom-label-input-warning"
				defaultChecked
				checked={ args.checked }
				aria-label="Warning flag"
				variant="warning"
			/>
		</div>
	</form>
);

export const Primary = Default.bind( { checked: true } );
export const ExternalLabel = WithLabel.bind( { checked: true } );
export const CustomStyle = CustomStyling.bind( { checked: true } );
