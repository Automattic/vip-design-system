/**
 * External dependencies
 */
import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Badge, Box, Card, Grid, Heading, Text } from '..';

const OptionRow = ({
	image,
	icon,
	badge,
	title,
	inline = false,
	subTitle,
	body,
	meta,
	to,
	small = false,
	disabled = false,
	...props
}) => {
	const mergedCard = disabled
		? {
				border: '1px solid',
				borderColor: 'border',
				background: 'none',
				boxShadow: 'none',
		  }
		: {};

	const inlineStyles = inline
		? {
				py: 2,
				px: 2,
				mx: -2,
		  }
		: {
				py: 3,
				px: [3, 3, small ? 3 : 5],
				borderBottom: '1px solid',
				borderColor: 'border',
		  };
	return (
		<Grid
			to={to}
			columns={[1, 1, 'auto 1fr auto']}
			gap={[3, 3, `${small ? 3 : 4}`]}
			{...props}
			sx={{
				alignItems: 'center',
				cursor: disabled ? 'auto' : 'pointer',
				textDecoration: 'none',
				color: 'inherit',
				'&:hover': {
					backgroundColor: 'hover',
				},
				...inlineStyles,
			}}
		>
			<Box>
				{image ? (
					<Card
						sx={{
							display: ['inline-block', 'inline-block', 'block'],
							p: small ? 3 : 24,
							boxShadow: 'low',
							flex: '0 0 auto',
							svg: {
								display: 'block',
							},
							...mergedCard,
						}}
					>
						{React.isValidElement(image) ? (
							image
						) : (
							<img src={image} width={small ? 32 : 48} sx={{ display: 'block' }} />
						)}
					</Card>
				) : (
					icon && icon
				)}
			</Box>

			<Box sx={{ flex: '1 1 auto' }}>
				<Heading variant="h4" sx={{ mb: subTitle || body ? 1 : 0 }}>
					{title}
					{badge && <Badge sx={{ marginLeft: 2 }}>{badge}</Badge>}
				</Heading>
				{subTitle && <Text sx={{ mb: 1, color: 'muted' }}>{subTitle}</Text>}
				{body && <Text sx={{ mb: 0 }}>{body}</Text>}
			</Box>
			<Box>{meta ? meta : <MdArrowForward size={24} />}</Box>
		</Grid>
	);
};

OptionRow.propTypes = {
	image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	icon: PropTypes.node,
	badge: PropTypes.string,
	title: PropTypes.string,
	inline: PropTypes.bool,
	subTitle: PropTypes.string,
	body: PropTypes.string,
	meta: PropTypes.node,
	to: PropTypes.string,
	small: PropTypes.bool,
	disabled: PropTypes.bool,
};

export { OptionRow };
