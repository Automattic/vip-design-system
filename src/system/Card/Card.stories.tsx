/** @jsxImportSource theme-ui */

import { Box, Card } from '..';

export default {
	title: 'Card',
	component: Card,
};

export const Default = () => <Card>Hello</Card>;

export const WithHeader = () => <Card title="Header">This is a card with a header.</Card>;

export const WithCustomHeader = () => (
	<Box sx={ { maxWidth: 500 } }>
		<Card
			title="Screenshot of a website"
			renderHeader={ title => (
				<img
					src={ `https://s0.wp.com/mshots/v1/https://google.com/` }
					sx={ { width: '100%' } }
					alt={ title }
				/>
			) }
		>
			This is a card with a customized header content.
		</Card>
	</Box>
);

export const DefaultSecondary = () => <Card variant="secondary">Hello</Card>;

export const WithHeaderSecondary = () => (
	<Card title="Header" variant="secondary">
		This is a card with a header.
	</Card>
);

export const DefaultIndent = () => <Card variant="indent">Hello</Card>;
export const StyledBody = () => (
	<Card variant="indent" title="Hello world" bodyStyles={ { p: 6, backgroundColor: 'layer.2' } }>
		Hello styled body.
	</Card>
);
