/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Toggle } from './Toggle';
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { Text } from '../Text/Text';

export interface ToggleRowProps extends Omit< React.ComponentProps< typeof Toggle >, 'title' > {
	/** Image URL shown in a card to the left of the row. */
	image?: string;
	/** Badge content rendered next to the title. */
	badge?: React.ReactNode;
	/** The row title. */
	title?: React.ReactNode;
	/** Secondary text shown below the title. */
	subTitle?: React.ReactNode;
	/** Body text shown below the subtitle. */
	body?: React.ReactNode;
	/** Additional meta content rendered below the body. */
	meta?: React.ReactNode;
	/** Style overrides applied to the row container. */
	sx?: ThemeUIStyleObject;
}

const ToggleRow = ( {
	image,
	badge,
	title,
	subTitle,
	body,
	meta,
	sx,
	...props
}: ToggleRowProps ) => (
	<Flex
		sx={ {
			alignItems: 'center',
			py: 3,
			borderBottom: '1px solid',
			textDecoration: 'none',
			color: 'inherit',
			'&:first-of-type': {
				borderTop: '1px solid',
				borderColor: 'border',
			},
			borderColor: 'border',
			...sx,
		} }
	>
		{ image && (
			<Box sx={ { mr: 3 } }>
				<Card
					sx={ {
						p: 3,
						m: 0,
						boxShadow: 'low',
						flex: '0 0 auto',
					} }
				>
					<img
						src={ image }
						width={ 32 }
						sx={ { display: 'block' } }
						alt="Icon representing a toggle"
					/>
				</Card>
			</Box>
		) }

		<Box sx={ { flex: '1 1 auto', mr: 3 } }>
			<Heading variant="h4" sx={ { mb: subTitle || body ? 1 : 0 } }>
				{ title }
				{ badge && <Badge sx={ { marginLeft: 2 } }>{ badge }</Badge> }
			</Heading>
			{ subTitle && <Text sx={ { mb: 1, color: 'muted' } }>{ subTitle }</Text> }
			{ body && <Text sx={ { mb: 0 } }>{ body }</Text> }
			{ meta && meta }
		</Box>
		<Box>
			<Toggle { ...props } />
		</Box>
	</Flex>
);

export { ToggleRow };
