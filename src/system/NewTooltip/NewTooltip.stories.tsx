/**
 * Internal dependencies
 */
import { NewTooltip, Button, Heading, Text, Grid } from '..';

export default {
	title: 'NewTooltip',
	component: NewTooltip,
	parameters: {
		docs: {
			description: {
				component: `
A Radix-based tooltip component that supports rich content (ReactNode), including HTML elements
like \`<strong>\` and \`<br />\`. Built on \`@radix-ui/react-tooltip\` for full accessibility support.

## Component Properties
`,
			},
		},
	},
};

export const Basic = () => (
	<>
		<Heading variant="h2">Basic Usage</Heading>
		<Text sx={ { mb: 4 } }>A simple tooltip with plain text content on each position.</Text>
		<Grid
			columns={ [ 'auto auto' ] }
			gap={ '100px 160px' }
			sx={ { justifyContent: 'center', pt: '50px' } }
		>
			<NewTooltip content="At the top" position="top">
				<Button>Top</Button>
			</NewTooltip>

			<NewTooltip content="At the bottom" position="bottom">
				<Button>Bottom</Button>
			</NewTooltip>

			<NewTooltip content="On the left" position="left">
				<Button>Left</Button>
			</NewTooltip>

			<NewTooltip content="On the right" position="right">
				<Button>Right</Button>
			</NewTooltip>
		</Grid>
	</>
);

export const WithArrow = () => (
	<>
		<Heading variant="h2">With Arrow</Heading>
		<Text sx={ { mb: 4 } }>Enable the arrow indicator pointing to the trigger element.</Text>
		<Grid
			columns={ [ 'auto auto' ] }
			gap={ '100px 160px' }
			sx={ { justifyContent: 'center', pt: '50px' } }
		>
			<NewTooltip content="At the top with arrow" position="top" arrow>
				<Button>Top</Button>
			</NewTooltip>

			<NewTooltip content="At the bottom with arrow" position="bottom" arrow>
				<Button>Bottom</Button>
			</NewTooltip>

			<NewTooltip content="On the left with arrow" position="left" arrow>
				<Button>Left</Button>
			</NewTooltip>

			<NewTooltip content="On the right with arrow" position="right" arrow>
				<Button>Right</Button>
			</NewTooltip>
		</Grid>
	</>
);

export const RichContent = () => (
	<>
		<Heading variant="h2">Rich Content</Heading>
		<Text sx={ { mb: 4 } }>
			NewTooltip supports ReactNode content, including HTML elements like{ ' ' }
			<code>&lt;strong&gt;</code> and <code>&lt;br /&gt;</code>.
		</Text>
		<Grid
			columns={ [ 'auto auto' ] }
			gap={ '100px 160px' }
			sx={ { justifyContent: 'center', pt: '50px' } }
		>
			<NewTooltip
				content={
					<>
						Press <strong>Enter</strong>
						<br />
						to confirm
					</>
				}
				arrow
			>
				<Button>With bold and line break</Button>
			</NewTooltip>

			<NewTooltip
				content={
					<>
						<strong>Tip:</strong> Use keyboard shortcuts for faster navigation
					</>
				}
				arrow
			>
				<Button>With bold label</Button>
			</NewTooltip>
		</Grid>
	</>
);

export const AllPositions = () => (
	<>
		<Heading variant="h2">All Positions</Heading>
		<Text sx={ { mb: 4 } }>All four positions with and without arrows.</Text>
		<Grid
			columns={ [ 'auto auto' ] }
			gap={ '100px 160px' }
			sx={ { justifyContent: 'center', pt: '50px' } }
		>
			<NewTooltip content="At the top" position="top">
				<Button>Top</Button>
			</NewTooltip>

			<NewTooltip content="At the top with arrow" position="top" arrow>
				<Button>Top with Arrow</Button>
			</NewTooltip>

			<NewTooltip content="At the bottom" position="bottom">
				<Button>Bottom</Button>
			</NewTooltip>

			<NewTooltip content="At the bottom with arrow" position="bottom" arrow>
				<Button>Bottom with Arrow</Button>
			</NewTooltip>

			<NewTooltip content="On the left" position="left">
				<Button>Left</Button>
			</NewTooltip>

			<NewTooltip content="On the left with arrow" position="left" arrow>
				<Button>Left with Arrow</Button>
			</NewTooltip>

			<NewTooltip content="On the right" position="right">
				<Button>Right</Button>
			</NewTooltip>

			<NewTooltip content="On the right with arrow" position="right" arrow>
				<Button>Right with Arrow</Button>
			</NewTooltip>
		</Grid>
	</>
);
