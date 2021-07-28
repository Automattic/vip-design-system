/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const Toggle = ( { name = 'toggle', ...props } ) => (
	<CheckBoxWrapper>
		<CheckBox name={name} id={name} type="checkbox" {...props} />
		<CheckBoxLabel htmlFor={name} />
	</CheckBoxWrapper>
);

Toggle.propTypes = {
	name: PropTypes.string,
};

export { Toggle };

const CheckBoxWrapper = props => (
	<div sx={{ position: 'relative' }} {...props} />
);

const CheckBoxLabel = props => (
	<label
		sx={{
			position: 'absolute',
			top: '0',
			left: '0',
			width: '42px',
			height: '24px',
			borderRadius: '15px',
			backgroundColor: 'muted',
			cursor: 'pointer',
			'&::after': {
				content: "''",
				display: 'block',
				borderRadius: '50%',
				width: '18px',
				height: '18px',
				margin: '3px',
				backgroundColor: 'card',
				boxShadow: 'low',
				transition: '0.2s',
			},
		}}
		{...props}
	/>
);

const CheckBox = ( { sx, ...props } ) => (
	<input
		sx={{
			opacity: '0',
			zIndex: '1',
			borderRadius: '15px',
			width: '42px',
			height: '24px',
			padding: 0,
			margin: 0,
			display: 'block',
			'&:checked + label': {
				backgroundColor: 'green.50',
				'&::after': {
					content: "''",
					display: 'block',
					borderRadius: '50%',
					width: '18px',
					height: '18px',
					marginLeft: '21px',
					transition: '0.2s',
				},
			},
		}}
		{...props}
	/>
);

CheckBox.propTypes = {
	sx: PropTypes.object,
};