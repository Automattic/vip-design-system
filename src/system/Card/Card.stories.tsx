/**
 * Internal dependencies
 */
import { Card } from '..';

export default {
	title: 'Card',
	component: Card,
};

export const Default = () => <Card>Hello</Card>;

export const WithHeader = () => <Card header="Header">This is a card with a header.</Card>;

export const DefaultSecondary = () => <Card variant="secondary">Hello</Card>;

export const WithHeaderSecondary = () => (
	<Card header="Header" variant="secondary">
		This is a card with a header.
	</Card>
);
