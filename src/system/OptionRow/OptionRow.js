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

const disabledStyles = {
	border: '1px solid',
	borderColor: 'borders.2',
	background: 'background',
	boxShadow: 'none',
	color: 'text',
};

const gridInlineStyle = {
	py: 2,
	px: 2,
};

const regularGridStyle = () => ( {
	py: 3,
	px: 3,
	borderBottom: '1px solid',
	borderColor: 'borders.2',
} );

const OptionRow = React.forwardRef(
	(
		{
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
			variant = 'h3',
			...props
		},
		forwardRef
	) => {
		const mergedCard = disabled ? disabledStyles : {};
		const inlineStyles = inline ? gridInlineStyle : regularGridStyle( small );

		return (
			<Grid
				to={ to }
				columns={ [ 1, 1, 'auto 1fr auto' ] }
				gap={ [ 3, 3, `${ small ? 3 : 4 }` ] }
				data-order={ order || undefined }
				className={ classNames( 'vip-option-row-component', className ) }
				ref={ forwardRef }
				{ ...props }
				sx={ {
					alignItems: 'center',
					cursor: disabled ? 'auto' : 'pointer',
					textDecoration: 'none',
					color: 'text',
					'&:hover': ! disabled && {
						backgroundColor: 'hover',
					},
					...inlineStyles,
				} }
			>
				<Box>
					{ image ? (
						<Box
							sx={ {
								display: [ 'inline-block', 'inline-block', 'block' ],
								p: small ? 12 : 20,
								flex: '0 0 auto',
								bg: 'brand.70',
								color: 'brand.10',
								borderRadius: 1,
								...mergedCard,
							} }
						>
							{ React.isValidElement( image ) ? (
								image
							) : (
								<img src={ image } width={ small ? 32 : 48 } sx={ { display: 'block' } } alt="" />
							) }
						</Box>
					) : (
						icon && icon
					) }
				</Box>

				<Box sx={ { flex: '1 1 auto' } }>
					<Heading variant={ variant } sx={ { mb: subTitle || body ? 1 : 0, fontSize: 2 } }>
						{ label }
						{ badge && <Badge sx={ { marginLeft: 2 } }>{ badge }</Badge> }
					</Heading>
					{ subTitle && <Text sx={ { mb: 1, color: 'text' } }>{ subTitle }</Text> }
					{ body && <Text sx={ { mb: 0 } }>{ body }</Text> }
				</Box>
				{ false !== meta && '' !== meta && (
					<Box data-testid="meta">
						{ meta ? (
							meta
						) : (
							<MdArrowForward size={ 24 } sx={ { color: 'text' } } aria-hidden="true" />
						) }
					</Box>
				) }
			</Grid>
		);
	}
);

OptionRow.displayName = 'OptionRow';

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
	variant: PropTypes.string,
};

export { OptionRow };
