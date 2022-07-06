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
		<Toggle defaultChecked checked={ args.checked } aria-label="Feature flag" />
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

export const Primary = Default.bind( { checked: true } );
export const ExternalLabel = WithLabel.bind( { checked: true } );
