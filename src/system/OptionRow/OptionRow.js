/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Badge, Box, Grid, Heading, Text } from '..';
import classNames from 'classnames';

const OptionRow = ( {
	image,
	icon,
	badge,
	label,
	inline = false,
	subTitle,
	body,
	meta,
	to,
	small = false,
	disabled = false,
	order = null,
	className = null,
	...props
} ) => {
	const mergedCard = disabled
		? {
			border: '1px solid',
			borderColor: 'border',
			background: 'none',
			boxShadow: 'none',
			color: 'grey.70',
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
			px: [ 3, 3, small ? 3 : 5 ],
			borderBottom: '1px solid',
			borderColor: 'border',
		};
	return (
		<Grid
			to={to}
			columns={[ 1, 1, 'auto 1fr auto' ]}
			gap={[ 3, 3, `${ small ? 3 : 4 }` ]}
			data-order={ order || undefined }
			className={ classNames( 'vip-option-row-component', className ) }
			{...props}
			sx={{
				alignItems: 'center',
				cursor: disabled ? 'auto' : 'pointer',
				textDecoration: 'none',
				color: 'inherit',
				'&:hover': ! disabled && {
					backgroundColor: 'hover',
				},
				...inlineStyles,
			}}
		>
			<Box>
				{image ? (
					<Box
						sx={{
							display: [ 'inline-block', 'inline-block', 'block' ],
							p: small ? 12 : 20,
							flex: '0 0 auto',
							bg: 'brand.70',
							color: 'brand.10',
							borderRadius: 1,
							...mergedCard,
						}}
					>
						{React.isValidElement( image ) ? (
							image
						) : (
							<img
								src={image}
								width={small ? 32 : 48}
								sx={{ display: 'block' }}
								alt="Image representing the list item"
							/>
						)}
					</Box>
				) : (
					icon && icon
				)}
			</Box>

			<Box sx={{ flex: '1 1 auto' }}>
				<Heading variant="h4" sx={{ mb: subTitle || body ? 1 : 0 }}>
					{label}
					{badge && <Badge sx={{ marginLeft: 2 }}>{badge}</Badge>}
				</Heading>
				{subTitle && <Text sx={{ mb: 1, color: 'muted' }}>{subTitle}</Text>}
				{body && <Text sx={{ mb: 0 }}>{body}</Text>}
			</Box>
			<Box>{meta ? meta : ! disabled && <MdArrowForward size={24} />}</Box>
		</Grid>
	);
};

OptionRow.propTypes = {
	image: PropTypes.oneOfType( [ PropTypes.object, PropTypes.string ] ),
	icon: PropTypes.node,
	badge: PropTypes.string,
	label: PropTypes.node,
	inline: PropTypes.bool,
	subTitle: PropTypes.node,
	body: PropTypes.node,
	meta: PropTypes.node,
	to: PropTypes.string,
	small: PropTypes.bool,
	disabled: PropTypes.bool,
	order: PropTypes.number,
	className: PropTypes.any,
};

export { OptionRow };
