/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

/**
 * Internal dependencies
 */
import { Text } from '..';

export default {
	title: 'Text',
	component: Text,
};

export const Default = () => (
	<>
		<Text>
			Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and
			the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to
			the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car
			seemed to float in the middle of an immense dark sphere, whose upper half was strewn with
			silver.{ ' ' }
		</Text>

		<Text sx={ { color: 'texts.accent' } }>Text Accent</Text>

		<Text sx={ { color: 'texts.helper' } }>Text Helper</Text>

		<Text sx={ { color: 'texts.helper', fontWeight: 'body' } }>Text Helper</Text>
		<Text sx={ { color: 'texts.helper', fontWeight: 'heading' } }>Text Helper</Text>
		<Text sx={ { color: 'texts.helper', fontWeight: 'regular' } }>Text Helper</Text>
		<Text sx={ { color: 'texts.helper', fontWeight: 'medium' } }>Text Helper</Text>
		<Text sx={ { color: 'texts.helper', fontWeight: 'bold' } }>Text Helper</Text>
		<Text sx={ { color: 'texts.helper', fontWeight: 'light' } }>Text Helper</Text>

		<Text sx={ { color: 'texts.secondary' } }>Text Secondary</Text>

		<Text sx={ { color: 'texts.primary' } }>Text Primary</Text>

		<Text sx={ { color: 'texts.placeholder' } }>Text placeholder</Text>

		<Text sx={ { color: 'texts.disabled' } }>Text disabled</Text>

		<div sx={ { bg: 'layer.inverse' } }>
			<Text sx={ { color: 'texts.inverse' } }>Text inverse</Text>
		</div>
	</>
);
