/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { Box as ThemeBox } from 'theme-ui';

const Box = forwardRef( ( props, ref ) => <ThemeBox ref={ref} className={ classNames( 'vip-box-component', props.className ) } {...props} /> );

Box.displayName = 'Box';
Box.propTypes = {
	className: PropTypes.any,
};

export { Box };
