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
import { Badge, Box, Grid, Heading, Text, Link } from '..';
import classNames from 'classnames';

const disabledStyles = {
	border: '1px solid',
	borderColor: 'optionRow.border',
	background: 'none',
	boxShadow: 'none',
	color: 'optionRow.text',
};

const gridInlineStyle = {
	py: 2,
	px: 2,
};

const regularGridStyle = () => ( {
	py: 3,
	px: 3,
	borderBottom: '1px solid',
	borderColor: 'optionRow.border',
} );

const OptionRow = React.forwardRef(
	(
		{
			image,
			badge,
			label,
			inline = false,
			subTitle,
			body,
			meta,
			small = false,
			disabled = false,
			order = null,
			className = null,
			titleVariant = 'h3',
			variant = 'default',
			...rest
		},
		forwardRef
	) => {
		const mergedCard = disabled ? disabledStyles : {};
		const inlineStyles = inline ? gridInlineStyle : regularGridStyle( small );

		return (
			<Grid
				columns={ [ 1, 1, 'auto 1fr auto' ] }
				gap={ [ 3, 3, `${ small ? 3 : 4 }` ] }
				data-order={ order || undefined }
				className={ classNames( 'vip-option-row-component', className ) }
				ref={ forwardRef }
				sx={ {
					position: 'relative',
					alignItems: 'center',
					'&:hover': ! disabled && {
						backgroundColor: 'optionRow.hover',
					},
					...inlineStyles,
				} }
			>
				<Box>
					{ !! image && (
						<Box
							sx={ {
								display: [ 'inline-block', 'inline-block', 'block' ],
								p: small ? 3 : 7,
								flex: '0 0 auto',
								bg: `optionRow.${ variant }.background`,
								color: `optionRow.${ variant }.icon`,
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
					) }
				</Box>

				<Box sx={ { flex: '1 1 auto' } }>
					<Heading
						variant={ titleVariant }
						sx={ { mb: subTitle || body ? 1 : 0, fontSize: 2, fontWeight: 'bold' } }
					>
						<Link
							as={ 'a' }
							sx={ {
								cursor: disabled ? 'auto' : 'pointer',
								color: disabled ? 'optionRow.text' : 'optionRow.textAccent',
								'&:after': {
									content: '""',
									position: 'absolute',
									top: 0,
									right: 0,
									bottom: 0,
									left: 0,
								},
							} }
							{ ...rest }
						>
							{ label }
							{ badge && <Badge sx={ { marginLeft: 2 } }>{ badge }</Badge> }
						</Link>
					</Heading>
					{ subTitle && <Text sx={ { mb: 1, color: 'optionRow.text' } }>{ subTitle }</Text> }
					{ body && <Text sx={ { mb: 0 } }>{ body }</Text> }
				</Box>
				{ false !== meta && '' !== meta && (
					<Box data-testid="meta">
						{ meta ? (
							meta
						) : (
							<MdArrowForward size={ 24 } sx={ { color: 'optionRow.text' } } aria-hidden="true" />
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
	badge: PropTypes.string,
	label: PropTypes.node,
	inline: PropTypes.bool,
	subTitle: PropTypes.node,
	body: PropTypes.node,
	meta: PropTypes.node,
	small: PropTypes.bool,
	disabled: PropTypes.bool,
	order: PropTypes.number,
	className: PropTypes.any,
	titleVariant: PropTypes.string,
	variant: PropTypes.oneOf( [ 'default', 'alt' ] ),
};

export { OptionRow };
